import json
from typing import Annotated, TypedDict, List, Optional, Any, Dict
from langgraph.graph import StateGraph, END
from google import genai
from google.genai import types
from src.config import settings
from src.tools.helpdesk_tools import tools_list as helpdesk_tools
from src.tools.dwh_tools import dwh_tools_list
from src.tools.knowledge_tools import search_knowledge_base_tool
from src.services import ticket_manager
from src.utils.firestore_storage import FirestoreSaver
from src.utils.logging_utils import log_structured
from src.utils.prompt_loader import load_prompt

# --- Inicialización Perezosa para el Cliente Gemini ---
knowledge_tools_list = [search_knowledge_base_tool]
all_tools = helpdesk_tools + dwh_tools_list + knowledge_tools_list 

_COMPILED_GRAPH = None
_GEMINI_CLIENT = None

def get_gemini_client():
    """Inicializa el cliente de Gemini (Vertex AI) solo si aún no existe."""
    global _GEMINI_CLIENT
    if _GEMINI_CLIENT is None:
        _GEMINI_CLIENT = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)
    return _GEMINI_CLIENT
# ----------------------------------------------------


class AgentState(TypedDict):
    messages: List[types.Content]
    user_email: str
    generated_card: Optional[Dict[str, Any]]


def agent_node(state: AgentState):
    messages = state["messages"]
    user_email = state.get("user_email", "usuario@connect.inc")
    
    prompt_template = load_prompt("system_prompt_helpdesk.md")
    system_prompt = prompt_template.format(user_email=user_email) if prompt_template else f"Eres KAI. Usuario: {user_email}."

    try:
        client = get_gemini_client()
        
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=messages,
            config=types.GenerateContentConfig(
                tools=all_tools,
                system_instruction=system_prompt,
                temperature=0.0
            )
        )
        return {"messages": [response.candidates[0].content]}
    except Exception as e:
        log_structured("LLMError", error=str(e))
        return {"messages": [types.Content(role="model", parts=[types.Part.from_text(text="Tuve un problema técnico. 😵‍💫")])]}

def tools_execution_node(state: AgentState):
    last_message = state["messages"][-1]
    tool_outputs = []
    card_found = None
    
    user_email = state.get("user_email", "unknown")

    for part in last_message.parts:
        if part.function_call:
            fn_name = part.function_call.name
            fn_args = part.function_call.args
            
            if "solicitante_email" not in fn_args or fn_args["solicitante_email"] == "unknown":
                fn_args["solicitante_email"] = user_email

            log_structured("ToolExecution", tool=fn_name, user=user_email)
            
            try:
                result = "Error: Herramienta no encontrada"
                
                if fn_name in ["crear_tiquete_tool", "cerrar_tiquete_tool", "reasignar_tiquete_tool", "consultar_estado_tool", "start_ticket_creation_form"]:
                     from src.tools import helpdesk_tools
                     func = getattr(helpdesk_tools, fn_name, None)
                     if func: result = func(**fn_args)
                
                elif fn_name == "consultar_dwh_tool":
                     from src.tools import dwh_tools
                     result = dwh_tools.consultar_dwh_tool(**fn_args)
                
                elif fn_name == "search_knowledge_base_tool":
                     from src.tools import knowledge_tools
                     result = knowledge_tools.search_knowledge_base_tool(**fn_args)

                if isinstance(result, str):
                    clean_result = result.strip()
                    if '"cardsV2"' in clean_result:
                        try:
                            json_start = clean_result.find('{')
                            json_end = clean_result.rfind('}') + 1
                            potential_json = clean_result[json_start:json_end]
                            card_data = json.loads(potential_json)
                            
                            if "cardsV2" in card_data:
                                card_found = card_data
                                result = f"Acción '{fn_name}' completada exitosamente. Se ha mostrado una tarjeta interactiva al usuario."
                        except Exception:
                            pass

            except Exception as e:
                result = f"Error ejecutando {fn_name}: {str(e)}"
                log_structured("ToolException", tool=fn_name, error=str(e))
            
            tool_outputs.append(types.Part.from_function_response(name=fn_name, response={"result": result}))
            
    return {
        "messages": [types.Content(role="tool", parts=tool_outputs)],
        "generated_card": card_found
    }

def should_continue(state: AgentState):
    last_message = state["messages"][-1]
    if last_message.parts:
        for part in last_message.parts:
            if part.function_call:
                return "tools"
    return END

_COMPILED_GRAPH = None

builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_node("tools", tools_execution_node)
builder.set_entry_point("agent")
builder.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
builder.add_edge("tools", "agent")

checkpointer = FirestoreSaver()
def get_compiled_graph():
    """Implementa la inicialización perezosa de la compilación del grafo."""
    global _COMPILED_GRAPH
    if _COMPILED_GRAPH is None:
        _COMPILED_GRAPH = builder.compile(checkpointer=checkpointer)
    return _COMPILED_GRAPH