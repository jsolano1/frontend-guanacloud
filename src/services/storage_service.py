import json
import io
import base64
import asyncio
import re
from PIL import Image, ImageDraw
from google import genai
from google.genai import types
from src.config import settings
from src.utils.logging_utils import log_structured
from src.utils.prompt_loader import load_prompt

client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

def clean_json_string(text: str) -> str:
    """Limpia bloques de markdown para evitar errores de parseo."""
    text = re.sub(r'^```json\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'^```\s*', '', text, flags=re.MULTILINE)
    return text.strip()

async def extract_deep_metadata_async(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    return await asyncio.to_thread(extract_deep_metadata_sync, image_bytes, mime_type)

def extract_deep_metadata_sync(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    prompt = load_prompt("extract_deep_metadata.md")
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Part.from_bytes(data=image_bytes, mime_type=mime_type), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json", temperature=0.0
            )
        )
        return json.loads(clean_json_string(response.text))
    except Exception as e:
        log_structured("DeepExtractionError", error=str(e))
        return {"error": "No se pudo extraer metadata"}

async def classify_image_async(image_bytes: bytes) -> dict:
    return await asyncio.to_thread(classify_image_sync, image_bytes)

def classify_image_sync(image_bytes: bytes) -> dict:
    prompt = load_prompt("classify_image_type.md")
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json", temperature=0.0
            )
        )
        return json.loads(clean_json_string(response.text))
    except Exception:
        return {"category": "unknown"}

async def apply_segmentation_masks_async(image_bytes: bytes) -> bytes:
    return await asyncio.to_thread(apply_segmentation_masks_sync, image_bytes)

def apply_segmentation_masks_sync(image_bytes: bytes) -> bytes:
    prompt = load_prompt("segment_vehicle_layers.md")
    original_img = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
    
    try:
        # AUMENTAMOS EL BUDGET Y EL LIMITE DE TOKENS PARA EVITAR "Unterminated string"
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                max_output_tokens=8192, # AUMENTADO
                temperature=0.1
            )
        )
        
        items = json.loads(clean_json_string(response.text))
        
        overlay = Image.new('RGBA', original_img.size, (0, 0, 0, 0))
        width, height = original_img.size

        for item in items:
            try:
                if item.get("type") != "damage": continue # Solo daños

                box = item.get("box_2d")
                if not box: continue
                
                # Normalizar coordenadas (Gemini devuelve 0-1000)
                y0, x0, y1, x1 = int(box[0]/1000*height), int(box[1]/1000*width), int(box[2]/1000*height), int(box[3]/1000*width)
                
                if x1 <= x0 or y1 <= y0: continue

                draw = ImageDraw.Draw(overlay)
                # Rectangulo rojo semitransparente
                draw.rectangle([x0, y0, x1, y1], outline=(255, 0, 0, 200), width=4, fill=(255, 0, 0, 60))
                
                # Etiqueta
                label = item.get("label", "Daño")
                draw.text((x0, y0-10), label, fill=(255, 255, 255, 255))

            except Exception: continue

        combined = Image.alpha_composite(original_img, overlay)
        out = io.BytesIO()
        combined.convert("RGB").save(out, format="JPEG")
        return out.getvalue()

    except Exception as e:
        log_structured("SegmentationError", error=str(e))
        return image_bytes