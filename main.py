import os
import uvicorn
import asyncio
import traceback
import mimetypes
from typing import List, Optional

from fastapi import FastAPI, Request, UploadFile, File, Form, Header, HTTPException, APIRouter
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from google.genai import types

# --- IMPORTS ESTRICTOS (Si falla aquí, es porque faltan archivos en src/) ---
from src.logic_graph import get_compiled_graph
from src.utils.logging_utils import log_structured
from src.tools.claims_tools import analyze_claim_image_async, save_batch_claim_data

app = FastAPI(title="KAI Core V2", version="3.2.0-prod-vision")

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

claims_router = APIRouter(prefix="/api/v1/claims", tags=["claims"])

# Rutas Estáticas
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(BASE_DIR, "src", "static")
INDEX_FILE = os.path.join(STATIC_PATH, "index.html")
ARCH_FILE = os.path.join(STATIC_PATH, "arquitectura_kai_v2.html")

# --- VISTAS UI ---
@app.get("/", tags=["UI"])
async def serve_ui():
    if os.path.exists(INDEX_FILE):
        return FileResponse(INDEX_FILE)
    return JSONResponse(status_code=404, content={"error": "UI no encontrada en src/static/index.html"})

@app.get("/arquitectura", tags=["UI"])
async def serve_architecture():
    if os.path.exists(ARCH_FILE):
        return FileResponse(ARCH_FILE)
    return JSONResponse(status_code=404, content={"error": "Diagrama no encontrado"})

@app.get("/health")
async def health():
    return {"status": "ok", "mode": "real_ai_enabled"}

# --- CHATBOT (LangGraph) ---
@app.post("/", tags=["Chat"])
async def handle_chat(request: Request):
    try:
        event = await request.json()
        if event.get('type') != 'MESSAGE': return {}

        # Identidad
        user_email = event.get('user', {}).get('email', 'web_guest@kai.ai')
        message_text = event.get('message', {}).get('text', '')
        thread_id = event.get('message', {}).get('thread', {}).get('name', f"thread_{user_email}")

        log_structured("MessageReceived", user=user_email, text=message_text)

        # Cerebro
        graph = get_compiled_graph()
        if not graph:
            raise ImportError("El grafo lógico no se pudo cargar.")

        config = {"configurable": {"thread_id": thread_id}}
        inputs = {
            "messages": [types.Content(role="user", parts=[types.Part.from_text(text=message_text)])],
            "user_email": user_email
        }
        
        state = await graph.ainvoke(inputs, config=config)
        
        # Respuesta
        last_msg = state["messages"][-1]
        response_text = last_msg.parts[0].text if last_msg.parts else "..."
        
        return {"text": response_text}

    except Exception as e:
        tb = traceback.format_exc()
        print(f"Chat Error: {e}")
        return {"text": f"Error en el cerebro KAI: {str(e)}"}

# --- CLAIMS UPLOAD (Soporte PDF + Imagenes) ---
@claims_router.post("/upload")
async def upload_claims(
    service_number: str = Form(...),
    files: List[UploadFile] = File(...)
):
    """
    Procesa lote mixto de imágenes y PDFs.
    """
    try:
        count = len(files)
        log_structured("BatchUploadStart", service=service_number, count=count)
        
        tasks = []
        file_contents = []

        # 1. Lectura y preparación de tareas
        for file in files:
            content = await file.read()
            # Detectar mime type real para Gemini
            mime_type, _ = mimetypes.guess_type(file.filename)
            if not mime_type:
                mime_type = file.content_type or "application/octet-stream"
            
            file_contents.append({
                "filename": file.filename,
                "mime_type": mime_type,
                "size": len(content)
            })

            # Lanzar análisis asíncrono (Real AI)
            tasks.append(
                analyze_claim_image_async(service_number, content, file.filename, mime_type)
            )
        
        # 2. Ejecución Paralela en Vertex AI
        raw_results = await asyncio.gather(*tasks)
        
        # 3. Persistencia
        final_data = save_batch_claim_data(service_number, raw_results)
        
        log_structured("BatchUploadSuccess", service=service_number, processed=len(raw_results))

        return {
            "status": "success",
            "service": service_number,
            "processed_count": count,
            "results": raw_results,
            "data": final_data
        }

    except Exception as e:
        tb = traceback.format_exc()
        print(f"Upload Error: {tb}")
        return JSONResponse(status_code=500, content={"error": str(e), "detail": "Fallo en procesamiento IA."})

app.include_router(claims_router)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)