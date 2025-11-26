import json
import asyncio
from sqlalchemy.sql import text
from src.utils.database_client import get_db_connection
from src.services import storage_service, vision_service
from src.utils.logging_utils import log_structured

def _standardize_filename(service_number, category, raw_angle, original_name):
    """
    Genera nombres de archivo deterministas.
    """
    ext = original_name.split('.')[-1] if '.' in original_name else "jpg"
    std_category = "veh" if category == "vehicle" else "doc"
    clean_suffix = str(raw_angle).lower().replace(" ", "_").replace("-", "_")
    return f"{service_number}_{std_category}_{clean_suffix}.{ext}"

async def analyze_claim_image_async(service_number: str, image_bytes: bytes, original_filename: str, mime_type: str = "image/jpeg") -> dict:
    """
    Procesa una sola imagen.
    """
    try:
        # 1. Clasificación
        if "pdf" in mime_type:
            classification = {"category": "document", "specific_type": "archivo_pdf", "view_angle": "general"}
            # Para PDFs, asumimos extracción directa sin gather para evitar complejidad extra por ahora
            deep_metadata = await vision_service.extract_deep_metadata_async(image_bytes, mime_type)
        else:
            classification_task = vision_service.classify_image_async(image_bytes)
            metadata_task = vision_service.extract_deep_metadata_async(image_bytes, mime_type)
            classification, deep_metadata = await asyncio.gather(classification_task, metadata_task)
        
        category = classification.get("category", "unknown")
        view_angle = classification.get("view_angle", "general")
        
        clean_filename = _standardize_filename(service_number, category, view_angle, original_filename)
        json_key = clean_filename.replace(".", "_")

        # 2. Upload Raw
        raw_url = await storage_service.upload_image_to_gcs_async(image_bytes, service_number, clean_filename, "raw")
        processed_url = None
        
        # 3. Segmentación (Solo imágenes de vehículos)
        if category == "vehicle" and "image" in mime_type:
            try:
                processed_bytes = await vision_service.apply_segmentation_masks_async(image_bytes)
                if processed_bytes and processed_bytes != image_bytes:
                    proc_filename = f"annotated_{clean_filename}"
                    processed_url = await storage_service.upload_image_to_gcs_async(processed_bytes, service_number, proc_filename, "processed")
            except Exception as e:
                log_structured("ProcessingWarn", error=str(e), filename=original_filename)
        
        return {
            "key": json_key,
            "data": {
                "raw_url": raw_url,
                "processed_url": processed_url,
                "data": {
                    "technical": classification,
                    "business_data": deep_metadata,
                    "upload_filename": original_filename,
                    "mime_source": mime_type
                }
            }
        }
    except Exception as e:
        log_structured("ImageAnalysisError", error=str(e), filename=original_filename)
        return {"error": str(e), "filename": original_filename}

def save_batch_claim_data(service_number: str, results_list: list) -> dict:
    engine = get_db_connection()
    global_vehicle_info = {}
    optimized_results = {}
    
    global_keys = ["marca", "modelo", "año_aproximado", "color", "placa_visible", "vin", "tipo_carroceria"]

    for res in results_list:
        if "error" in res: continue
        key = res["key"]
        entry = res["data"]
        
        raw_biz_data = entry["data"].get("business_data")
        if isinstance(raw_biz_data, list): biz_data = raw_biz_data[0] if raw_biz_data else {}
        elif isinstance(raw_biz_data, dict): biz_data = raw_biz_data
        else: biz_data = {}
            
        entry["data"]["business_data"] = biz_data
        category = entry["data"]["technical"].get("category")

        if category == "vehicle" and biz_data:
            for k in global_keys:
                val = biz_data.get(k)
                if val:
                    current_val = global_vehicle_info.get(k)
                    if not current_val or len(str(val)) > len(str(current_val)):
                        global_vehicle_info[k] = val
            for k in global_keys:
                if k in biz_data: del biz_data[k]
        
        optimized_results[key] = entry

    final_json_structure = {
        "global_vehicle_details": global_vehicle_info,
        "images": optimized_results
    }

    try:
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM claims_data WHERE service_number = :svc"), {"svc": service_number})
            conn.execute(text("INSERT INTO claims_data (service_number, image_type, gcs_raw_url, ai_metadata) VALUES (:svc, 'batch_mixed', 'N/A', :meta)"),
                             {"svc": service_number, "meta": json.dumps(final_json_structure)})
        return final_json_structure
    except Exception as e:
        log_structured("DBBatchSaveError", error=str(e))
        raise e