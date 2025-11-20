import json
from google import genai
from google.genai import types
from src.config import settings
from src.utils.logging_utils import log_structured
import base64

client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

def analyze_vehicle_image(image_bytes: bytes) -> dict:
    """Extrae metadatos de un vehículo usando Gemini 2.5 Flash."""
    prompt = """
    Analiza la imagen de este vehículo y extrae la siguiente información en formato JSON estrictamente:
    {
        "vista_perfil": "Ej: Delantera izquierda, Trasera derecha, Frontal, Lateral, Interior",
        "marca": "Marca del vehículo o 'Desconocido'",
        "modelo": "Modelo aproximado o 'Desconocido'",
        "tipo_vehiculo": "Ej: Sedan, SUV, Hatchback, Pick-up, Motocicleta, Camión"
    }
    Solo devuelve el JSON.
    """
    
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                prompt
            ],
            config=types.GenerateContentConfig(response_mime_type="application/json", temperature=0.0)
        )
        return json.loads(response.text)
    except Exception as e:
        log_structured("VisionAnalysisError", error=str(e))
        return {"error": "No se pudo analizar la imagen"}

def annotate_vehicle_damage(image_bytes: bytes) -> bytes:
    """
    Usa Gemini para generar una nueva imagen con los contornos superpuestos.
    NOTA: Esto utiliza la capacidad de generación/edición de imagen.
    """
    prompt = """
    Based on the provided image of the vehicle, generate an identical image with specific annotations overlaid transparently:
    1. Outline ALL major vehicle parts (doors, hood, bumper, windshield, fenders, wheels) with a translucent CYAN color.
    2. Identify any areas with visible accident damage (dents, scratches, broken parts, flat tires) and outline ONLY those damaged areas with a translucent RED color.
    The original image content must remain visible underneath the annotations. Do not alter the vehicle itself, only add the glowing outlines.
    """
    
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID, 
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                prompt
            ],
            config=types.GenerateContentConfig(response_modalities=["IMAGE"]) 
        )
        
        for part in response.parts:
            if part.inline_data:
                log_structured("ImageGenerationSuccess")
                return part.inline_data.data
        
        raise Exception("Gemini no devolvió datos de imagen.")

    except Exception as e:
        log_structured("ImageGenerationError", error=str(e))
        raise e