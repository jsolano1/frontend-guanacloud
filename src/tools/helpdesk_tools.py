from src.services import ticket_manager

def crear_tiquete_tool(descripcion: str, prioridad: str, equipo: str, solicitante_email: str = "unknown") -> str:
    """Crea un nuevo tiquete de soporte. Prioridad: 'alta', 'media', 'baja'."""
    return ticket_manager.crear_tiquete(descripcion, prioridad, equipo, solicitante_email, "system")

def cerrar_tiquete_tool(ticket_id: str, resolucion: str, solicitante_email: str = "unknown") -> str:
    """Cierra un tiquete existente. Requiere ID del tiquete y una resolución clara."""
    return ticket_manager.cerrar_tiquete(ticket_id, resolucion, solicitante_email)

def reasignar_tiquete_tool(ticket_id: str, nuevo_responsable_email: str, solicitante_email: str = "unknown") -> str:
    """Reasigna un tiquete a un nuevo responsable (email)."""
    return ticket_manager.reasignar_tiquete(ticket_id, nuevo_responsable_email, solicitante_email)

def consultar_estado_tool(ticket_id: str) -> str:
    """Consulta el estado actual de un tiquete por su ID (ej. KAI-2025-XXXX)."""
    return ticket_manager.consultar_estado_tiquete(ticket_id)

tools_list = [crear_tiquete_tool, cerrar_tiquete_tool, reasignar_tiquete_tool, consultar_estado_tool]