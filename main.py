import os
import uvicorn
import asyncio
import traceback
from typing import List

from fastapi import FastAPI, Request, UploadFile, File, Form, HTTPException, APIRouter
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from google.genai import types

# --- IMPORTS DE LÓGICA INTERNA ---
# Nota: Asegúrate de que la carpeta 'src' tenga un archivo __init__.py
try:
    from src.logic_graph import get_compiled_graph
    from src.utils.logging_utils import log_structured
    from src.tools.claims_tools import analyze_claim_image_async, save_batch_claim_data
except ImportError as e:
    print(f"⚠️ Warning: No se pudieron cargar módulos internos: {e}")
    # Mocks para que la app no se caiga si faltan archivos en local
    def get_compiled_graph(): return None
    def log_structured(*args, **kwargs): print(f"[LOG] {kwargs}")
    async def analyze_claim_image_async(*args): return {"filename": args[2], "processed_url": "https://via.placeholder.com/300", "analysis": "Mock Analysis"}
    def save_batch_claim_data(*args): return {}

# --- CONFIGURACIÓN APP ---
app = FastAPI(
    title="KAI Core V2",
    description="Orquestador Multi-agente Cognitivo",
    version="2.5.0-ui-enabled"
)

# Configurar CORS para permitir llamadas desde el navegador
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router específico para Claims
claims_router = APIRouter(prefix="/api/v1/claims", tags=["claims"])

# Definir rutas absolutas a estáticos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(BASE_DIR, "src", "static")
INDEX_FILE = "index.html"
ARCH_FILE = "arquitectura_kai_v2.html"

# --- RUTAS DE INTERFAZ (GET) ---

@app.get("/", tags=["UI"])
async def serve_interface():
    """Sirve la Interfaz de Chat (index.html)"""
    file_path = os.path.join(STATIC_PATH, INDEX_FILE)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return JSONResponse(status_code=404, content={"error": "UI no encontrada. Verifica src/static/index.html"})

@app.get("/arquitectura", tags=["UI"])
async def serve_architecture():
    """Sirve el Diagrama de Arquitectura"""
    file_path = os.path.join(STATIC_PATH, ARCH_FILE)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return JSONResponse(status_code=404, content={"error": "Diagrama no encontrado. Verifica src/static/arquitectura_kai_v2.html"})

# --- RUTA DE CHAT (POST) ---

@app.post("/", tags=["Chat"])
async def handle_chat_webhook(request: Request):
    """Endpoint principal para mensajes de chat (Web & Google Chat)"""
    try:
        event = await request.json()
        
        # Filtros básicos
        if event.get('type') == 'CARD_CLICKED':
             return {"text": "Interacción con tarjeta recibida (WIP)."}
        if event.get('type') != 'MESSAGE': 
            return {}

        # Extraer datos
        message_text = event.get('message', {}).get('text', '')
        user_email = event.get('user', {}).get('email', 'web_guest')
        thread_id = event.get('message', {}).get('thread', {}).get('name', 'default')

        log_structured("MessageReceived", user=user_email, text=message_text)

        # Invocar LangGraph
        compiled_graph = get_compiled_graph()
        if not compiled_graph:
            return {"text": "⚠️ El cerebro del bot no está inicializado."}

        config = {"configurable": {"thread_id": thread_id}}
        initial_input = {
            "messages": [types.Content(role="user", parts=[types.Part.from_text(text=message_text)])],
            "user_email": user_email,
            "generated_card": None
        }
        
        # Ejecutar grafo
        final_state = await compiled_graph.ainvoke(initial_input, config=config)
        
        # Formatear respuesta
        last_message = final_state["messages"][-1]
        response_text = last_message.parts[0].text if last_message.parts else "..."
        
        response_payload = {"text": response_text}

        # Tarjetas UI
        if final_state.get("generated_card"):
            card_data = final_state["generated_card"]
            if "cardsV2" in card_data: response_payload["cardsV2"] = card_data["cardsV2"]
            elif "cards" in card_data: response_payload["cards"] = card_data["cards"]

        return response_payload

    except Exception as e:
        tb = traceback.format_exc()
        log_structured("ChatError", error=str(e), traceback=tb)
        return {"text": f"Error interno: {str(e)}"}

# --- RUTA DE CLAIMS (POST) ---

@claims_router.post("/upload")
async def upload_claims(
    service_number: str = Form(...),
    files: List[UploadFile] = File(...)
):
    """Procesa subida masiva de imágenes"""
    try:
        count = len(files)
        log_structured("BatchUploadStart", service=service_number, count=count)
        
        file_contents = []
        for file in files:
            content = await file.read()
            file_contents.append((content, file.filename))
        
        # Procesamiento paralelo
        tasks = [
            analyze_claim_image_async(service_number, content, name) 
            for content, name in file_contents
        ]
        
        raw_results = await asyncio.gather(*tasks)
        final_data = save_batch_claim_data(service_number, raw_results)
        
        return {
            "status": "success",
            "service": service_number,
            "processed_count": count,
            "results": raw_results,
            "data": final_data
        }

    except Exception as e:
        log_structured("BatchUploadError", error=str(e))
        return JSONResponse(status_code=500, content={"error": str(e)})

app.include_router(claims_router)

# --- HEALTH CHECK ---
@app.get("/health")
async def health():
    return {"status": "ok"}

# --- ENTRY POINT ---
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)