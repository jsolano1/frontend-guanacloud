from google.cloud import storage
from src.config import settings
from src.utils.logging_utils import log_structured
import asyncio
import os

storage_client = storage.Client(project=settings.GCP_PROJECT_ID)

def upload_image_to_gcs(image_bytes: bytes, service_number: str, filename: str, folder_type: str = "raw") -> str:
    """
    Sube una imagen a GCS siguiendo la estructura: bucket/service_number/folder_type/filename
    Retorna la URL pública (o autenticada) del archivo.
    Bloqueante (Sync).
    """
    try:
        bucket = storage_client.bucket(settings.GCS_CLAIMS_BUCKET)
        destination_blob_name = f"{service_number}/{folder_type}/{filename}"
        blob = bucket.blob(destination_blob_name)

        blob.upload_from_string(image_bytes, content_type="image/jpeg")
        
        log_structured("GCSUploadSuccess", path=destination_blob_name, service=service_number)
        return blob.self_link
        
    except Exception as e:
        log_structured("GCSUploadError", error=str(e), service=service_number)
        raise e

async def upload_image_to_gcs_async(image_bytes: bytes, service_number: str, filename: str, folder_type: str = "raw") -> str:
    """
    Wrapper asíncrono para subir imágenes a GCS sin bloquear el event loop.
    Esencial para procesamiento en batch.
    """
    return await asyncio.to_thread(upload_image_to_gcs, image_bytes, service_number, filename, folder_type)