import uuid
import json
from sqlalchemy.sql import text
from src.utils.database_client import get_db_connection
from src.services import storage_service, vision_service
from src.utils.logging_utils import log_structured

def process_vehicle_claim_image(service_number: str, image_bytes: bytes, filename_orig: str) -> str:
    """
    Orquesta el flujo completo para una imagen de vehículo.
    """
    engine = get_db_connection()
    unique_id = str(uuid.uuid4())[:8]
    filename_base = f"{unique_id}_{filename_orig}"

    try:
        raw_url = storage_service.upload_image_to_gcs(image_bytes, service_number, filename_base, "raw")

        metadata = vision_service.analyze_vehicle_image(image_bytes)

        try:
            processed_image_bytes = vision_service.annotate_vehicle_damage(image_bytes)            
            processed_url = storage_service.upload_image_to_gcs(processed_image_bytes, service_number, f"annotated_{filename_base}", "processed")
        except Exception as e:
            log_structured("AnnotationFailed", error=str(e), service=service_number)
            processed_url = "PROCESSING_FAILED"

        with engine.begin() as conn:
            conn.execute(text("""
                INSERT INTO claims_data (service_number, image_type, gcs_raw_url, gcs_processed_url, ai_metadata)
                VALUES (:svc, 'vehicle', :raw, :proc, :meta)
            """), {
                "svc": service_number,
                "raw": raw_url,
                "proc": processed_url,
                "meta": json.dumps(metadata)
            })
        
        return f"✅ Imagen de vehículo procesada para servicio {service_number}. Marca detectada: {metadata.get('marca')}. Anotación de daños: {'Completada' if processed_url != 'PROCESSING_FAILED' else 'Fallida'}."

    except Exception as e:
        err = f"Error procesando reclamo vehicular: {str(e)}"
        log_structured("ClaimsProcessError", error=err)
        return "❌ Hubo un error interno procesando la imagen del vehículo."