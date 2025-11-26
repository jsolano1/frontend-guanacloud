import threading
import traceback
import google.auth
from googleapiclient.discovery import build
from src.services import dwh_query_service
from src.services.notification_service import enviar_mensaje_directo_chat
from src.utils.database_client import get_dm_space_name_for_user, check_dwh_permission
from src.utils.logging_utils import log_structured

TARGET_PROJECT_ID = "connectdwh-367315"

def _check_permission_hybrid(user_email: str) -> bool:
    if not user_email: return False
    try:
        if check_dwh_permission(user_email): return True
    except Exception: pass
    return True 

def _run_dwh_async_secure(pregunta, email, space_name):
    """Hilo background para GChat."""
    log_structured("AsyncDWHStart", user=email)
    try:
        resultado = dwh_query_service.consultar_dwh(pregunta, email)
        msg = f"📊 *Reporte DWH Kai*\n\n{resultado}"
        enviar_mensaje_directo_chat(space_name, {"text": msg})
    except Exception as e:
        enviar_mensaje_directo_chat(space_name, {"text": f"❌ Error DWH: {str(e)}"})

def consultar_dwh_tool(pregunta: str, solicitante_email: str = "unknown", context_origin: str = "chat") -> str:
    """
    Herramienta DWH Híbrida.
    """

    # --- RUTA WEB (Síncrona) ---
    if context_origin == "web":
        log_structured("DWH_Sync_Execution", user=solicitante_email, origin="web")
        try:
            return dwh_query_service.consultar_dwh(pregunta, solicitante_email)
        except Exception as e:
            return f"Error ejecutando consulta síncrona: {str(e)}"

    # --- RUTA CHAT (Asíncrona) ---
    dm_space_name = get_dm_space_name_for_user(solicitante_email)
    
    if not dm_space_name:
        log_structured("DWH_Sync_Fallback", reason="NoDMSpace")
        return dwh_query_service.consultar_dwh(pregunta, solicitante_email)

    log_structured("DWH_Async_Execution", user=solicitante_email)
    thread = threading.Thread(
        target=_run_dwh_async_secure, 
        args=(pregunta, solicitante_email, dm_space_name)
    )
    thread.start()
    
    return "⏳ Consulta en proceso."

dwh_tools_list = [consultar_dwh_tool]