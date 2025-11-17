import json
import uuid
import re
from datetime import datetime, timezone, timedelta
from sqlalchemy.sql import text
from google import genai
from google.genai import types
from src.config import settings
from src.utils.database_client import get_db_connection
from src.utils.logging_utils import log_structured
from src.services.notification_service import enviar_notificacion_chat, enviar_notificacion_email

client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

def _get_ai_classification(descripcion: str) -> dict:
    """Clasifica el tiquete usando Gemini (Nuevo SDK)."""
    prompt = f"""
    Analiza la descripción del problema y devuelve un JSON con:
    - 'titulo': Resumen de 4-5 palabras.
    - 'tipo_solicitud': Una categoría de: [Reporte de Bugs, Accesos, Redes, Hardware, Datos, Otro].
    
    Descripción: {descripcion}
    
    Responder SOLO JSON.
    """
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except Exception as e:
        log_structured("AIClassificationError", error=str(e))
        return {"titulo": "Tiquete de Soporte", "tipo_solicitud": "Otro"}

def crear_tiquete(descripcion: str, prioridad: str, equipo_asignado: str, solicitante_email: str, user_id: str) -> str:
    """Lógica de negocio pura para crear el tiquete."""
    log_structured("CrearTiqueteLogic", user=solicitante_email, equipo=equipo_asignado)
    
    # 1. Clasificación IA
    ai_data = _get_ai_classification(descripcion)
    titulo = ai_data.get("titulo")
    tipo = ai_data.get("tipo_solicitud")
    
    # 2. Generar ID
    ticket_id = f"KAI-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4().hex)[:4].upper()}"
    
    # 3. Guardar en DB
    engine = get_db_connection()
    try:
        with engine.connect() as conn:
            with conn.begin():
                conn.execute(text("""
                    INSERT INTO tickets (TicketID, Solicitante, FechaCreacion, SLA_horas, equipo_asignado, titulo, ticket_status)
                    VALUES (:id, :email, NOW(), 24, :equipo, :titulo, 'New')
                """), {
                    "id": ticket_id, "email": solicitante_email, 
                    "equipo": equipo_asignado, "titulo": titulo
                })
                
                detalles = json.dumps({"descripcion": descripcion, "prioridad": prioridad})
                conn.execute(text("""
                    INSERT INTO eventos_tiquetes (TicketID, TipoEvento, FechaEvento, otros_detalles, Autor)
                    VALUES (:id, 'CREADO', NOW(), :detalles, :autor)
                """), {"id": ticket_id, "detalles": detalles, "autor": solicitante_email})
                
        # 4. Notificar (Simplificado)
        msg = f"✅ Tiquete Creado: *{ticket_id}*\n*Título:* {titulo}\n*Equipo:* {equipo_asignado}\n*Prioridad:* {prioridad}"
        enviar_notificacion_chat(msg)
        
        return msg
        
    except Exception as e:
        log_structured("DBInsertError", error=str(e))
        return f"❌ Error creando el tiquete: {str(e)}"

def consultar_estado_tiquete(ticket_id: str) -> str:
    engine = get_db_connection()
    try:
        with engine.connect() as conn:
            result = conn.execute(text(
                "SELECT ticket_status, titulo, equipo_asignado FROM tickets WHERE TicketID = :id"
            ), {"id": ticket_id}).fetchone()
            
            if not result:
                return f"No encontré el tiquete {ticket_id}."
            
            return f"📋 Estado del tiquete *{ticket_id}*:\n- Estado: {result[0]}\n- Título: {result[1]}\n- Equipo: {result[2]}"
    except Exception as e:
        return f"Error consultando DB: {str(e)}"