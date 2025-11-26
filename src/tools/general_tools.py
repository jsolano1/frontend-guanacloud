from src.utils.logging_utils import log_structured

def responder_charla_general(mensaje_usuario: str, intencion: str) -> str:
    """
    Herramienta para manejar saludos, despedidas, chistes, agradecimientos o preguntas sobre la identidad de KAI.
    NO usar para preguntas de datos o tiquetes.
    
    Args:
        mensaje_usuario: El texto que escribió el usuario.
        intencion: Resumen de la intención (ej. "saludo", "pregunta_identidad", "chiste").
    """
    
    log_structured("ConversationalToolUsed", intent=intencion)
    
    if "identidad" in intencion or "quien eres" in mensaje_usuario.lower():
        return "Soy KAI (Knowledge & Assistance Interface), el asistente de IA de Connect Assistance."
    
    return "Conversación general procesada. Procede a responder amablemente al usuario."

tools_list = [responder_charla_general]