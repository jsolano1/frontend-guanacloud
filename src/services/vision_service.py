import json
import io
import base64
import numpy as np
from PIL import Image, ImageDraw
from google import genai
from google.genai import types
from src.config import settings
from src.utils.logging_utils import log_structured
from src.utils.prompt_loader import load_prompt

client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

def extract_deep_metadata(image_bytes: bytes) -> dict:
    """Extrae datos profundos (OCR/Características) del vehículo o documento."""
    prompt = load_prompt("extract_deep_metadata.md")
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json", temperature=0.0
            )
        )
        return json.loads(response.text)
    except Exception as e:
        log_structured("DeepExtractionError", error=str(e))
        return {"error": "No se pudo extraer metadata profunda"}

def classify_image(image_bytes: bytes) -> dict:
    """Clasificación ligera para ruteo."""
    prompt = load_prompt("classify_image_type.md")
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json", temperature=0.0
            )
        )
        return json.loads(response.text)
    except Exception:
        return {"category": "unknown"}

def apply_segmentation_masks(image_bytes: bytes) -> bytes:
    """
    Dibuja máscaras con estilo 'Agua/Transparente'.
    """
    prompt = load_prompt("segment_vehicle_layers.md")
    original_img = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                thinking_config=types.ThinkingConfig(thinking_budget=0) 
            )
        )
        items = json.loads(response.text)
        
        overlay = Image.new('RGBA', original_img.size, (0, 0, 0, 0))
        
        for item in items:
            try:
                png_str = item.get("mask", "")
                if not png_str.startswith("data:image/png;base64,"): continue
                mask_data = base64.b64decode(png_str.removeprefix("data:image/png;base64,"))
                mask_img = Image.open(io.BytesIO(mask_data))
                
                box = item["box_2d"]
                width, height = original_img.size
                y0, x0, y1, x1 = int(box[0]/1000*height), int(box[1]/1000*width), int(box[2]/1000*height), int(box[3]/1000*width)
                
                if x1 <= x0 or y1 <= y0: continue

                mask_resized = mask_img.resize((x1 - x0, y1 - y0), Image.Resampling.BILINEAR)
                
                if item.get("type") == "damage":
                    fill_color = (255, 50, 50, 80) 
                else:
                    fill_color = (0, 255, 255, 40)

                color_block = Image.new('RGBA', (x1 - x0, y1 - y0), fill_color)
                overlay.paste(color_block, (x0, y0), mask_resized)
                
                draw = ImageDraw.Draw(overlay)
                outline_color = (255, 0, 0, 150) if item.get("type") == "damage" else (0, 255, 255, 100)
                draw.rectangle([x0, y0, x1, y1], outline=outline_color, width=2)

            except Exception: continue

        combined = Image.alpha_composite(original_img, overlay)
        out = io.BytesIO()
        combined.convert("RGB").save(out, format="JPEG")
        return out.getvalue()

    except Exception as e:
        log_structured("SegmentationError", error=str(e))
        return image_bytes