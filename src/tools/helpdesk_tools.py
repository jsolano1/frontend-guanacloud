from src.services import ticket_manager

def crear_tiquete_tool(descripcion: str, prioridad: str, equipo: str, solicitante_email: str = "unknown") -> str:
    """
    Crea un nuevo tiquete de soporte o helpdesk en el sistema.
    
    Args:
        descripcion: Detalle completo del problema reportado por el usuario.
        prioridad: Nivel de urgencia ('alta', 'media', 'baja').
        equipo: Departamento asignado (ej. 'IT Regional', 'Data', 'RRHH').
        solicitante_email: Email del usuario (el sistema lo inyectará automáticamente).
    """
    
    return ticket_manager.crear_tiquete(
        descripcion=descripcion, 
        prioridad=prioridad, 
        equipo_asignado=equipo, 
        solicitante_email=solicitante_email,
        user_id="system"
    )

def consultar_estado_tool(ticket_id: str) -> str:
    """
    Consulta el estado actual de un tiquete existente dado su ID.
    
    Args:
        ticket_id: El identificador del tiquete (ej. KAI-2024-XXXX).
    """
    return ticket_manager.consultar_estado_tiquete(ticket_id)

tools_list = [crear_tiquete_tool, consultar_estado_tool]