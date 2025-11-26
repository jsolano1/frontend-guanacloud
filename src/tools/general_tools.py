from src.utils.logging_utils import log_structured

def responder_consultas_generales(consulta: str, tema: str = "general") -> str:
    """
    Herramienta para responder preguntas de conocimiento general, explicaciones, 
    conceptos, redacción de correos o cualquier tema que NO requiera datos privados de la empresa.
    
    Usa esta herramienta si el usuario pregunta cosas como:
    - "¿Qué es un seguro de cobertura amplia?"
    - "Redacta un correo para un cliente..."
    - "Explícame qué hace un ajustador."
    - "¿Cuál es la capital de Francia?"
    """
    
    log_structured("GeneralKnowledgeToolUsed", topic=tema, query=consulta)
    
    return (
        f"CONFIRMACIÓN: La consulta '{consulta}' es de conocimiento general o capacidad generativa. "
        "INSTRUCCIÓN PARA EL AGENTE: Usa tu propio conocimiento y capacidades de LLM para responder "
        "de manera completa, experta y servicial. No busques en bases de datos internas."
    )

tools_list = [responder_consultas_generales]