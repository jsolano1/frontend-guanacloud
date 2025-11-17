from src.services import dwh_query_service
from src.utils.database_client import check_dwh_permission
from src.utils.logging_utils import log_structured

def consultar_dwh_tool(pregunta: str, solicitante_email: str = "unknown") -> str:
    """
    Consulta la base de datos analítica (Data Warehouse) para obtener métricas, estadísticas o reportes de negocio.
    Úsala para preguntas como: "Cuántos servicios hubo ayer?", "Promedio de costos en Costa Rica", etc.
    
    Args:
        pregunta: La pregunta completa del usuario relacionada con datos.
        solicitante_email: Email del usuario (inyectado automáticamente).
    """
    log_structured("ToolCall", tool="consultar_dwh_tool", user=solicitante_email)

    if solicitante_email == "unknown" or not solicitante_email:
        return "Error: No pude identificar tu usuario para validar permisos."
        
    tiene_permiso = check_dwh_permission(solicitante_email)
    
    if not tiene_permiso:
        log_structured("DwhPermissionDenied", user=solicitante_email)
        return "⛔ Acceso Denegado: Tu usuario no tiene permisos configurados para consultar el Data Warehouse. Contacta a un administrador."

    return dwh_query_service.consultar_dwh(pregunta, solicitante_email)

dwh_tools_list = [consultar_dwh_tool]