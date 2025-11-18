import threading
import traceback
import google.auth
from googleapiclient.discovery import build
from google.cloud import bigquery
from src.services import dwh_query_service
from src.services.notification_service import enviar_mensaje_directo_chat
from src.utils.database_client import get_dm_space_name_for_user, check_dwh_permission
from src.utils.logging_utils import log_structured
from src.config import settings

TARGET_PROJECT_ID = "connectdwh-367315"

def _check_permission_hybrid(user_email: str) -> bool:
    """
    Verifica permisos DWH.
    Prioridad: 1. DB (Más rápido/seguro localmente) -> 2. IAM (Fallback real)
    Cambio de estrategia: Consultar primero la DB interna reduce latencia y errores de API.
    """
    if not user_email: return False
    
    try:
        if check_dwh_permission(user_email):
            log_structured("DwhAccessGranted", source="Database", user=user_email)
            return True
    except Exception as e:
        log_structured("DwhDBCheckError", error=str(e))

    log_structured("DwhIAMCheckStart", user=user_email)
    if _check_iam_permissions(user_email):
        log_structured("DwhAccessGranted", source="IAM", user=user_email)
        return True
        
    log_structured("DwhAccessDenied", user=user_email)
    return False

def _check_iam_permissions(user_email: str) -> bool:
    """Verifica si el usuario tiene roles de BigQuery en el proyecto DWH."""
    try:
        creds, _ = google.auth.default()
        service = build('cloudresourcemanager', 'v1', credentials=creds)
        
        policy = service.projects().getIamPolicy(resource=TARGET_PROJECT_ID).execute()
        
        user_member = f"user:{user_email.strip().lower()}"
        bq_roles = ["roles/bigquery.dataViewer", "roles/bigquery.dataEditor", "roles/bigquery.admin", "roles/owner"]

        for binding in policy.get('bindings', []):
            if binding['role'] in bq_roles:
                members_lower = [m.lower() for m in binding.get('members', [])]
                if user_member in members_lower:
                    return True
        return False

    except Exception as e:
        log_structured("DwhIAMAPIError", error=str(e), user=user_email)
        return False

def _run_dwh_async_secure(pregunta, email, space_name):
    log_structured("AsyncDWHStart", user=email, query=pregunta)
    try:
        resultado = dwh_query_service.consultar_dwh(pregunta, email)
        
        msg_final = f"📊 *Reporte DWH Kai*\n\n{resultado}"
        enviar_mensaje_directo_chat(space_name, {"text": msg_final})
        
    except Exception as e:
        error_msg = f"❌ Error procesando consulta DWH: {str(e)}"
        log_structured("AsyncDWHExecError", error=str(e), traceback=traceback.format_exc())
        enviar_mensaje_directo_chat(space_name, {"text": error_msg})

def consultar_dwh_tool(pregunta: str, solicitante_email: str = "unknown") -> str:
    """Herramienta para consultar el Data Warehouse de manera asíncrona."""
    
    if not _check_permission_hybrid(solicitante_email):
        return "⛔ No tienes permisos registrados para consultar el DWH. Contacta a un administrador."

    dm_space_name = get_dm_space_name_for_user(solicitante_email)
    if not dm_space_name:
        return "⚠️ No puedo enviarte los resultados. Por favor, escríbeme un mensaje directo (DM) primero para registrar tu chat."

    thread = threading.Thread(
        target=_run_dwh_async_secure, 
        args=(pregunta, solicitante_email, dm_space_name)
    )
    thread.start()
    
    return "⏳ He recibido tu consulta. Estoy procesando los datos y te enviaré los resultados por mensaje privado en breve."

dwh_tools_list = [consultar_dwh_tool]