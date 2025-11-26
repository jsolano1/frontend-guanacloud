from src.utils.logging_utils import log_structured
from src.utils.prompt_loader import load_prompt

def responder_consultas_generales(consulta: str, contexto: str = "general") -> str:
    """
    Herramienta para responder preguntas de conocimiento general o capacidad generativa.
    """
    log_structured("GeneralKnowledgeToolUsed", query=consulta)
    
    prompt = load_prompt("general_chat.md")
    if not prompt:
        return "INSTRUCCIÓN: Responde al usuario usando tu conocimiento general."
        
    return prompt

tools_list = [responder_consultas_generales]