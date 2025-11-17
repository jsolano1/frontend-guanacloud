import threading
from src.services import dwh_query_service
from src.utils.database_client import check_dwh_permission, get_dm_space_name_for_user
from src.services.notification_service import enviar_mensaje_directo_chat
from src.utils.logging_utils import log_structured

def _run_dwh_async_secure(pregunta, email, space_name):
    """
    Worker que ejecuta la consulta pesada y responde al DM específico.
    """
    log_structured("AsyncDWHStart", user=email, space=space_name)
    try:
        # 1. Ejecutar análisis (puede tardar 30s+)
        resultado = dwh_query_service.consultar_dwh(pregunta, email)
        
        # 2. Enviar respuesta SEGURA al DM (API)
        msg_final = f"📊 *Resultados de tu análisis DWH:*\n\n{resultado}"
        enviar_mensaje_directo_chat(space_name, msg_final)
        
    except Exception as e:
        error_msg = f"❌ Ocurrió un error procesando tu consulta de datos: {str(e)}"
        enviar_mensaje_directo_chat(space_name, error_msg)

def consultar_dwh_tool(pregunta: str, solicitante_email: str = "unknown") -> str:
    """
    Consulta la base de datos analítica (Data Warehouse) de forma asíncrona y segura.
    """
    # 1. Validación de Permisos de Negocio
    if not check_dwh_permission(solicitante_email):
        return "⛔ Acceso Denegado: No tienes permisos para consultar el DWH."

    # 2. Obtener el ID del Chat Privado (DM) desde Postgres
    # Esto garantiza que la respuesta vaya SOLO al usuario que preguntó
    dm_space_name = get_dm_space_name_for_user(solicitante_email)
    
    if not dm_space_name:
        # Fallback de seguridad: Si no hay DM registrado, no enviamos nada.
        log_structured("DwhNoDMBound", user=solicitante_email)
        return "⚠️ No puedo procesar la solicitud porque no tengo un chat privado registrado contigo en mi base de datos. Por favor, escribe 'hola' para actualizar tu registro."

    # 3. Ejecución Asíncrona (Fire & Forget)
    # Pasamos el space_name seguro al worker
    thread = threading.Thread(
        target=_run_dwh_async_secure, 
        args=(pregunta, solicitante_email, dm_space_name)
    )
    thread.start()
    
    # 4. Respuesta Inmediata al usuario (para evitar Timeout)
    return "⏳ He recibido tu consulta compleja. Estoy analizando los datos en el DWH y te enviaré los resultados por aquí en unos momentos."

# Lista para exportar
dwh_tools_list = [consultar_dwh_tool]