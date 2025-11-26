import os
import uvicorn
import asyncio
import traceback
from typing import List, Optional

from fastapi import FastAPI, Request, UploadFile, File, Form, Header, HTTPException, APIRouter
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from google.genai import types

# --- IMPORTS REALES (Sin Mocks) ---
try:
    from src.logic_graph import get_compiled_graph
    from src.utils.logging_utils import log_structured
    from src.tools.claims_tools import analyze_claim_image_async, save_batch_claim_data
except ImportError as e:
    print(f"❌ Error Crítico: Faltan módulos internos. {e}")
    # Si falla esto en prod, es mejor que falle para saberlo, no usar mocks.
    raise e

app = FastAPI(title="KAI Core V2", version="3.1.0")

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En prod, restringe esto a tu dominio
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

# --- ENDPOINTS VISTAS ---

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
    return {"status": "ok", "mode": "production_no_iap"}

# --- ENDPOINT CHAT (LangGraph) ---

@app.post("/", tags=["Chat"])
async def handle_chat(request: Request):
    try:
        event = await request.json()
        
        # 1. Validar Tipo de Evento
        if event.get('type') != 'MESSAGE': return {}

        # 2. Resolver Identidad (Simplificado: JSON payload o Guest)
        # Ya no verificamos headers de IAP. Confiamos en el payload del cliente.
        json_email = event.get('user', {}).get('email')
        user_email = json_email if json_email else 'web_guest@kai.ai'
        
        # 3. Extraer Mensaje
        message_text = event.get('message', {}).get('text', '')
        thread_id = event.get('message', {}).get('thread', {}).get('name', f"thread_{user_email}")

        log_structured("MessageReceived", user=user_email, text=message_text, source="open_endpoint")

        # 4. Ejecutar Grafo (Cerebro KAI)
        graph = get_compiled_graph()
        if not graph:
            return {"text": "Error: Cerebro no inicializado."}

        config = {"configurable": {"thread_id": thread_id}}
        
        inputs = {
            "messages": [types.Content(role="user", parts=[types.Part.from_text(text=message_text)])],
            "user_email": user_email 
        }
        
        state = await graph.ainvoke(inputs, config=config)
        
        # 5. Respuesta
        last_msg = state["messages"][-1]
        response_text = last_msg.parts[0].text if last_msg.parts else "..."
        
        return {"text": response_text}

    except Exception as e:
        tb = traceback.format_exc()
        print(f"Error en Chat: {e}\n{tb}")
        return {"text": f"Error interno procesando mensaje: {str(e)}"}

# --- ENDPOINT CLAIMS (Procesamiento REAL) ---

@claims_router.post("/upload")
async def upload_claims(
    service_number: str = Form(...),
    files: List[UploadFile] = File(...)
):
    """
    Procesa imágenes REALES usando Gemini Vision en paralelo.
    """
    try:
        count = len(files)
        log_structured("BatchUploadStart", service=service_number, count=count)
        
        # 1. Leer archivos en memoria
        file_contents = []
        for file in files:
            content = await file.read()
            file_contents.append((content, file.filename))
        
        # 2. Ejecutar tareas de IA en Paralelo (REAL)
        # Llamamos a la función real importada de src.tools.claims_tools
        tasks = [
            analyze_claim_image_async(service_number, content, name) 
            for content, name in file_contents
        ]
        
        # Scatter-Gather pattern
        raw_results = await asyncio.gather(*tasks)
        
        # 3. Guardar Data Estructurada (REAL)
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
        log_structured("BatchUploadError", error=str(e), traceback=tb)
        return JSONResponse(status_code=500, content={"error": str(e), "detail": "Fallo en procesamiento de imágenes."})

app.include_router(claims_router)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)