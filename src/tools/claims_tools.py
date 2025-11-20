import json
from sqlalchemy.sql import text
from src.utils.database_client import get_db_connection
from src.services import storage_service, vision_service
from src.utils.logging_utils import log_structured

def process_claim_file(service_number: str, image_bytes: bytes, original_filename: str) -> dict:
    """
    Procesa CUALQUIER archivo (Auto o Doc), lo clasifica, lo nombra bien y actualiza la DB.
    """
    engine = get_db_connection()
    
    classification = vision_service.classify_image(image_bytes)
    category = classification.get("category", "unknown")
    view_angle = classification.get("view_angle", "unknown")
    
    file_ext = original_filename.split('.')[-1] if '.' in original_filename else "jpg"
    clean_filename = f"{service_number}_{category}_{view_angle}.{file_ext}"
    
    raw_url = storage_service.upload_image_to_gcs(image_bytes, service_number, clean_filename, "raw")
    
    processed_url = None
    ai_details = classification
    
    if category == "vehicle":
        try:
            processed_bytes = vision_service.apply_segmentation_masks(image_bytes)
            processed_filename = f"annotated_{clean_filename}"
            processed_url = storage_service.upload_image_to_gcs(processed_bytes, service_number, processed_filename, "processed")
        except Exception as e:
            log_structured("VehicleProcessingWarn", error=str(e))
            
    elif category == "document":
        ai_details["doc_status"] = "stored_for_review"


    try:
        with engine.begin() as conn:
            existing = conn.execute(
                text("SELECT claim_id, ai_metadata FROM claims_data WHERE service_number = :svc LIMIT 1"),
                {"svc": service_number}
            ).fetchone()
            
            new_entry_key = f"{category}_{view_angle}" 
            
            if existing:

                claim_id, current_json = existing
                if not current_json: current_json = {}
                if isinstance(current_json, str): current_json = json.loads(current_json)
                
                current_json[new_entry_key] = {
                    "raw_url": raw_url,
                    "processed_url": processed_url,
                    "details": ai_details
                }
                
                conn.execute(text("""
                    UPDATE claims_data 
                    SET ai_metadata = :meta 
                    WHERE claim_id = :id
                """), {"meta": json.dumps(current_json), "id": claim_id})
                
                action = "updated"
            else:
                initial_json = {
                    new_entry_key: {
                        "raw_url": raw_url,
                        "processed_url": processed_url,
                        "details": ai_details
                    }
                }
                conn.execute(text("""
                    INSERT INTO claims_data (service_number, image_type, gcs_raw_url, ai_metadata)
                    VALUES (:svc, 'multi_part', :raw, :meta)
                """), {
                    "svc": service_number,
                    "raw": raw_url, 
                    "meta": json.dumps(initial_json)
                })
                action = "created"

        return {
            "filename": clean_filename,
            "category": category,
            "processed": bool(processed_url),
            "db_action": action
        }

    except Exception as e:
        log_structured("DBError", error=str(e))
        raise e