import json
import uuid
from datetime import datetime, timezone
from sqlalchemy.sql import text
from google import genai
from google.genai import types
from src.config import settings
from src.utils.database_client import get_db_connection
from src.utils.logging_utils import log_structured
from src.services.notification_service import enviar_notificacion_chat, enviar_notificacion_email
from src.utils.prompt_loader import load_prompt

client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

def _get_ai_classification(descripcion: str) -> dict:
    prompt_template = load_prompt("classify_ticket.md")
    if not prompt_template:
        prompt_template = "Clasifica esto en JSON {titulo, tipo_solicitud}: " + descripcion
    
    prompt = prompt_template.replace("{descripcion}", descripcion)
    
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        return json.loads(response.text)
    except Exception as e:
        log_structured("AIClassificationError", error=str(e))
        return {"titulo": "Tiquete de Soporte", "tipo_solicitud": "Otro"}

def crear_tiquete(descripcion: str, prioridad: str, equipo_asignado: str, solicitante_email: str, user_id: str) -> str:
    log_structured("CrearTiqueteLogic", user=solicitante_email, equipo=equipo_asignado)
    
    ai_data = _get_ai_classification(descripcion)
    titulo = ai_data.get("titulo", "Tiquete de Soporte")
    ticket_id = f"KAI-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4().hex)[:4].upper()}"
    
    engine = get_db_connection()
    try:
        # Transacción atómica
        with engine.begin() as conn:
            conn.execute(text("""
                INSERT INTO tickets (TicketID, Solicitante, FechaCreacion, SLA_horas, equipo_asignado, titulo, ticket_status)
                VALUES (:id, :email, NOW(), 24, :equipo, :titulo, 'New')
            """), {"id": ticket_id, "email": solicitante_email, "equipo": equipo_asignado, "titulo": titulo})
            
            detalles = json.dumps({"descripcion": descripcion, "prioridad": prioridad})
            conn.execute(text("""
                INSERT INTO eventos_tiquetes (TicketID, TipoEvento, FechaEvento, otros_detalles, Autor)
                VALUES (:id, 'CREADO', NOW(), :detalles, :autor)
            """), {"id": ticket_id, "detalles": detalles, "autor": solicitante_email})

        # Notificaciones (Fuera de transacción DB)
        enviar_notificacion_email(solicitante_email, f"Tiquete Creado: {ticket_id}", f"Hola, tu tiquete {ticket_id} ha sido creado.")
        
        # Card V2 Response
        card = {
            "cardsV2": [{
                "cardId": f"create_{ticket_id}",
                "card": {
                    "header": {"title": f"✅ Tiquete Creado: {ticket_id}", "subtitle": titulo},
                    "sections": [{"widgets": [
                        {"decoratedText": {"topLabel": "Equipo", "text": equipo_asignado}},
                        {"decoratedText": {"topLabel": "Prioridad", "text": prioridad}},
                        {"textParagraph": {"text": descripcion}}
                    ]}]
                }
            }]
        }
        return json.dumps(card)
    except Exception as e:
        log_structured("DBInsertError", error=str(e))
        return f"❌ Error creando el tiquete: {str(e)}"

def cerrar_tiquete(ticket_id: str, resolucion: str, solicitante_email: str) -> str:
    log_structured("CerrarTiqueteLogic", ticket_id=ticket_id, resolucion=resolucion)
    ticket_id = ticket_id.upper().strip()
    engine = get_db_connection()
    
    try:
        dueno_original = None
        
        # Paso 1: Lectura (Conexión simple, sin transacción de escritura)
        with engine.connect() as conn:
            check = conn.execute(text("SELECT Solicitante FROM tickets WHERE TicketID = :id"), {"id": ticket_id}).fetchone()
            if not check:
                return f"⚠️ No encontré el tiquete {ticket_id}."
            dueno_original = check[0]

        # Paso 2: Escritura (Transacción explícita)
        with engine.begin() as conn:
            conn.execute(text("UPDATE tickets SET ticket_status = 'Completed' WHERE TicketID = :id"), {"id": ticket_id})
            
            detalles = json.dumps({"resolucion": resolucion, "cerrado_por": solicitante_email})
            conn.execute(text("""
                INSERT INTO eventos_tiquetes (TicketID, TipoEvento, FechaEvento, otros_detalles, Autor)
                VALUES (:id, 'CERRADO', NOW(), :detalles, :autor)
            """), {"id": ticket_id, "detalles": detalles, "autor": solicitante_email})

        # Notificación
        if dueno_original:
            enviar_notificacion_email(dueno_original, f"Tiquete Cerrado: {ticket_id}", f"Tu tiquete ha sido cerrado.<br><b>Resolución:</b> {resolucion}")

        # Card Response
        card = {
            "cardsV2": [{
                "cardId": f"close_{ticket_id}",
                "card": {
                    "header": {"title": f"🔒 Tiquete Cerrado: {ticket_id}", "subtitle": "Estado: Completed"},
                    "sections": [{"widgets": [
                        {"textParagraph": {"text": f"<b>Resolución:</b> {resolucion}"}},
                        {"textParagraph": {"text": f"Cerrado por: {solicitante_email}"}}
                    ]}]
                }
            }]
        }
        return json.dumps(card)

    except Exception as e:
        log_structured("DBCloseError", error=str(e))
        return f"❌ Error cerrando el tiquete: {str(e)}"

def reasignar_tiquete(ticket_id: str, nuevo_responsable: str, solicitante_email: str) -> str:
    ticket_id = ticket_id.upper().strip()
    engine = get_db_connection()
    try:
        with engine.begin() as conn:
            detalles = json.dumps({"asignado_a": nuevo_responsable, "por": solicitante_email})
            conn.execute(text("""
                INSERT INTO eventos_tiquetes (TicketID, TipoEvento, FechaEvento, responsable, otros_detalles, Autor)
                VALUES (:id, 'REASIGNADO', NOW(), :resp, :detalles, :autor)
            """), {"id": ticket_id, "resp": nuevo_responsable, "detalles": detalles, "autor": solicitante_email})

        enviar_notificacion_email(nuevo_responsable, f"Tiquete Asignado: {ticket_id}", f"Se te ha asignado el tiquete {ticket_id}.")
        
        card = {
            "cardsV2": [{
                "cardId": f"reassign_{ticket_id}",
                "card": {
                    "header": {"title": f"🔄 Tiquete Reasignado: {ticket_id}"},
                    "sections": [{"widgets": [
                        {"decoratedText": {"topLabel": "Nuevo Responsable", "text": nuevo_responsable}},
                        {"textParagraph": {"text": f"Reasignado por: {solicitante_email}"}}
                    ]}]
                }
            }]
        }
        return json.dumps(card)
    except Exception as e:
        log_structured("DBReassignError", error=str(e))
        return f"Error reasignando: {str(e)}"

def consultar_estado_tiquete(ticket_id: str) -> str:
    engine = get_db_connection()
    try:
        with engine.connect() as conn:
            res = conn.execute(text("SELECT ticket_status, titulo, equipo_asignado FROM tickets WHERE TicketID = :id"), {"id": ticket_id.upper()}).fetchone()
            
            if not res: return f"No encontré el tiquete {ticket_id}."
            
            # Retornamos texto simple para estado, no card, es más rápido para lectura
            return f"📋 *Estado del Tiquete {ticket_id}*\n- Estado: *{res[0]}*\n- Título: {res[1]}\n- Equipo: {res[2]}"
    except Exception as e:
        return f"Error consultando DB: {str(e)}"