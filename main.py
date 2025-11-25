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

from src.logic_graph import get_compiled_graph
from src.utils.logging_utils import log_structured
from src.tools.claims_tools import analyze_claim_image_async, save_batch_claim_data

app = FastAPI(
    title="KAI Core V2",
    description="Orquestador Multi-agente Cognitivo para Asistencia Vial y Hogar",
    version="2.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

claims_router = APIRouter(prefix="/api/v1/claims", tags=["claims"])

STATIC_DIR = "src/static"
ARCH_FILE = "arquitectura_kai_v2.html"
FULL_ARCH_PATH = os.path.join(STATIC_DIR, ARCH_FILE)

@app.get("/", tags=["Health"])
async def root():
    """Endpoint raíz para verificar estado (GET) vs Chat (POST)."""
    return {"status": "online", "service": "KAI Core V2", "version": "2.2.0"}

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check ligero para Cloud Run startup probe."""
    return {"status": "healthy"}

@app.get("/arquitectura", response_class=FileResponse, tags=["Documentation"])
async def get_architecture():
    """Devuelve el diagrama interactivo de la arquitectura."""
    if not os.path.exists(FULL_ARCH_PATH):
        return JSONResponse(
            status_code=404, 
            content={"error": "El diagrama de arquitectura no se encuentra generado."}
        )
    return FileResponse(FULL_ARCH_PATH)

@app.post("/", tags=["Chat"])
async def handle_chat_event(request: Request):
    """
    Maneja eventos del chat (Webhooks).
    Integra el grafo compilado de LangGraph para orquestación de agentes.
    """
    try:
        event = await request.json()
        
        if event.get('type') == 'CARD_CLICKED':
             return {"text": "Funcionalidad de clic en tarjeta pendiente de migración completa a V2."}

        if event.get('type') != 'MESSAGE': 
            return {}

        message_text = event['message']['text']
        user_email = event['user']['email']
        thread_id = event['message']['thread']['name']

        log_structured("MessageReceived", user=user_email, text=message_text)

        config = {"configurable": {"thread_id": thread_id}}
        
        compiled_graph = get_compiled_graph() 

        initial_input = {
            "messages": [types.Content(role="user", parts=[types.Part.from_text(text=message_text)])],
            "user_email": user_email,
            "generated_card": None
        }
        
        final_state = await compiled_graph.ainvoke(initial_input, config=config)
        
        last_message = final_state["messages"][-1]
        response_text = " "
        if last_message.parts and last_message.parts[0].text:
             response_text = last_message.parts[0].text
        
        response_payload = {"text": response_text}

        if final_state.get("generated_card"):
            card_data = final_state["generated_card"]
            log_structured("CardRendered", user=user_email, card_keys=list(card_data.keys()))
            
            if "cardsV2" in card_data:
                response_payload["cardsV2"] = card_data["cardsV2"]
            elif "cards" in card_data:
                 response_payload["cards"] = card_data["cards"]

        return response_payload

    except Exception as e:
        tb = traceback.format_exc()
        log_structured("CriticalError", error=str(e), traceback=tb)
        return {"text": f"😵‍💫 KAI V2 Error: {str(e)}"}

@claims_router.post("/upload")
async def upload_claim_evidence(
    service_number: str = Form(...),
    files: List[UploadFile] = File(...) 
):
    """
    Endpoint optimizado para carga paralela de evidencias (Fotos/Docs).
    1. Lee todos los archivos en memoria (stream).
    2. Procesa (AI Vision + GCS Upload) todos en paralelo usando asyncio.gather.
    3. Consolida y guarda en DB en una sola transacción lógica.
    """
    count = len(files)
    log_structured("BatchStart", service=service_number, count=count)
    
    file_contents = []
    for file in files:
        content = await file.read()
        file_contents.append((content, file.filename))
    
    tasks = [
        analyze_claim_image_async(service_number, content, filename) 
        for content, filename in file_contents
    ]
    
    try:
        raw_results = await asyncio.gather(*tasks)
        
        final_data = save_batch_claim_data(service_number, raw_results)
        
        failures = [r for r in raw_results if "error" in r]
        status = "success"
        if failures:
            status = "partial_success" if len(failures) < count else "failure"
        
        processed_count = count - len(failures)
        log_structured("BatchComplete", service=service_number, processed=processed_count, failed=len(failures))

        return {
            "status": status, 
            "service": service_number, 
            "total_files": count,
            "processed_count": processed_count,
            "failed_files": [f["filename"] for f in failures],
            "data": final_data
        }
        
    except Exception as e:
        tb = traceback.format_exc()
        log_structured("BatchProcessError", error=str(e), traceback=tb)
        raise HTTPException(status_code=500, detail=f"Error procesando lote: {str(e)}")

app.include_router(claims_router)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)