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

def classify_image(image_bytes: bytes) -> dict:
    """Determina si es vehículo o documento y su ángulo."""
    prompt = load_prompt("classify_image_type.md")
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json", temperature=0.0
            )
        )
        return json.loads(response.text)
    except Exception as e:
        log_structured("ClassificationError", error=str(e))
        return {"category": "unknown", "view_angle": "unknown"}

def apply_segmentation_masks(image_bytes: bytes) -> bytes:
    """
    Solicita máscaras a Gemini (Base64) y las 'pinta' sobre la imagen original.
    Basado en la documentación de Gemini 2.5 Segmentation.
    """
    prompt = load_prompt("segment_vehicle_layers.md")
    original_img = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
    
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=[types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                thinking_config=types.ThinkingConfig(thinking_budget=0) 
            )
        )
        
        items = json.loads(response.text)
        
        overlay = Image.new('RGBA', original_img.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        for item in items:
            try:
                png_str = item.get("mask", "")
                if not png_str.startswith("data:image/png;base64,"): continue
                
                png_str = png_str.removeprefix("data:image/png;base64,")
                mask_data = base64.b64decode(png_str)
                mask_img = Image.open(io.BytesIO(mask_data))
                
                box = item["box_2d"] 
                width, height = original_img.size
                
                y0 = int(box[0] / 1000 * height)
                x0 = int(box[1] / 1000 * width)
                y1 = int(box[2] / 1000 * height)
                x1 = int(box[3] / 1000 * width)
                
                if x1 <= x0 or y1 <= y0: continue

                mask_resized = mask_img.resize((x1 - x0, y1 - y0), Image.Resampling.BILINEAR)
                mask_array = np.array(mask_resized)

                color = (0, 255, 255, 100) if item.get("type") == "part" else (255, 0, 0, 120) # RGBA
                
                color_block = Image.new('RGBA', (x1 - x0, y1 - y0), color)
                
                overlay.paste(color_block, (x0, y0), mask_resized)
                
            except Exception as mask_err:
                print(f"Error procesando máscara individual: {mask_err}")
                continue

        # 5. Fusionar capas
        combined = Image.alpha_composite(original_img, overlay)
        
        output_buffer = io.BytesIO()
        combined.convert("RGB").save(output_buffer, format="JPEG")
        return output_buffer.getvalue()

    except Exception as e:
        log_structured("SegmentationError", error=str(e))
        return image_bytes # Fallback a original