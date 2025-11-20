import json
from sqlalchemy.sql import text
from src.utils.database_client import get_db_connection
from src.services import storage_service, vision_service
from src.utils.logging_utils import log_structured

def _standardize_filename(service_number, category, raw_angle, original_name):
    """
    Genera nombres de archivo deterministas y limpios para el sistema de integración.
    Mapas de ejemplo: 'front_left' -> 'fl', 'document_front' -> 'doc_front'.
    """
    ext = original_name.split('.')[-1] if '.' in original_name else "jpg"
    
    std_category = "veh" if category == "vehicle" else "doc"
    
    clean_suffix = raw_angle.lower().replace(" ", "_").replace("-", "_")
    
    return f"{service_number}_{std_category}_{clean_suffix}.{ext}"

def process_claim_file(service_number: str, image_bytes: bytes, original_filename: str) -> dict:
    engine = get_db_connection()
    
    classification = vision_service.classify_image(image_bytes)
    category = classification.get("category", "unknown")
    view_angle = classification.get("view_angle", "general")
    
    deep_metadata = vision_service.extract_deep_metadata(image_bytes)
    
    clean_filename = _standardize_filename(service_number, category, view_angle, original_filename)
    
    raw_url = storage_service.upload_image_to_gcs(image_bytes, service_number, clean_filename, "raw")
    
    processed_url = None
    
    if category == "vehicle":
        try:
            processed_bytes = vision_service.apply_segmentation_masks(image_bytes)
            
            proc_filename = f"annotated_{clean_filename}"
            processed_url = storage_service.upload_image_to_gcs(processed_bytes, service_number, proc_filename, "processed")
        except Exception as e:
            log_structured("ProcessingWarn", error=str(e))
    
    full_details = {
        "technical": classification,
        "business_data": deep_metadata,
        "upload_filename": original_filename
    }

    try:
        with engine.begin() as conn:
            existing = conn.execute(
                text("SELECT claim_id, ai_metadata FROM claims_data WHERE service_number = :svc LIMIT 1"),
                {"svc": service_number}
            ).fetchone()
            
            json_key = clean_filename.replace(".", "_")
            
            new_entry_data = {
                "raw_url": raw_url,
                "processed_url": processed_url,
                "data": full_details
            }
            
            if existing:
                claim_id, current_json = existing
                if not current_json: current_json = {}
                if isinstance(current_json, str): current_json = json.loads(current_json)
                
                current_json[json_key] = new_entry_data
                
                conn.execute(text("UPDATE claims_data SET ai_metadata = :meta, updated_at = NOW() WHERE claim_id = :id"), 
                             {"meta": json.dumps(current_json), "id": claim_id})
                action = "updated"
            else:
                initial_json = {json_key: new_entry_data}
                conn.execute(text("INSERT INTO claims_data (service_number, image_type, gcs_raw_url, ai_metadata) VALUES (:svc, 'mixed', :raw, :meta)"),
                             {"svc": service_number, "raw": raw_url, "meta": json.dumps(initial_json)})
                action = "created"

        return {
            "file_key": json_key,
            "category": category,
            "extracted_info": deep_metadata,
            "processed_url": processed_url
        }

    except Exception as e:
        log_structured("DBError", error=str(e))
        raise e