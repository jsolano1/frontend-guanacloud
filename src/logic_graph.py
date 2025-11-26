import json
from typing import Annotated, TypedDict, List, Optional, Any, Dict
from langgraph.graph import StateGraph, END
from google import genai
from google.genai import types
from src.config import settings
from src.tools.helpdesk_tools import tools_list as helpdesk_tools
from src.tools.dwh_tools import dwh_tools_list
from src.tools.knowledge_tools import search_knowledge_base_tool
from src.utils.firestore_storage import FirestoreSaver
from src.utils.logging_utils import log_structured
from src.utils.prompt_loader import load_prompt
from src.tools.general_tools import tools_list as general_tools

knowledge_tools_list = [search_knowledge_base_tool]
all_tools = helpdesk_tools + dwh_tools_list + [search_knowledge_base_tool] + general_tools

_COMPILED_GRAPH = None
_GEMINI_CLIENT = None

def get_gemini_client():
    global _GEMINI_CLIENT
    if _GEMINI_CLIENT is None:
        _GEMINI_CLIENT = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)
    return _GEMINI_CLIENT

class AgentState(TypedDict):
    messages: List[types.Content]
    user_email: str
    origin: str # Campo nuevo para saber de dónde viene (web vs chat)
    generated_card: Optional[Dict[str, Any]]

def agent_node(state: AgentState):
    messages = state["messages"]
    user_email = state.get("user_email", "usuario@connect.inc")
    
    prompt_template = load_prompt("system_prompt.md")
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
        return {"messages": [types.Content(role="model", parts=[types.Part.from_text(text="Error técnico en el modelo.")])]}

def tools_execution_node(state: AgentState):
    last_message = state["messages"][-1]
    tool_outputs = []
    user_email = state.get("user_email", "unknown")
    origin = state.get("origin", "chat") # Default chat si no se especifica

    for part in last_message.parts:
        if part.function_call:
            fn_name = part.function_call.name
            fn_args = part.function_call.args
            
            # Inyecciones automáticas de contexto
            if "solicitante_email" not in fn_args or fn_args["solicitante_email"] == "unknown":
                fn_args["solicitante_email"] = user_email

            # Lógica híbrida DWH: Inyectar el origen para decidir Sync/Async
            if fn_name == "consultar_dwh_tool":
                fn_args["context_origin"] = origin

            log_structured("ToolExecutionStart", tool=fn_name, user=user_email, origin=origin)
            
            try:
                result = "Herramienta no encontrada"
                
                if fn_name == "consultar_dwh_tool":
                     from src.tools import dwh_tools
                     # La herramienta ahora acepta context_origin
                     result = dwh_tools.consultar_dwh_tool(**fn_args)
                
                elif fn_name in ["crear_tiquete_tool", "cerrar_tiquete_tool", "reasignar_tiquete_tool", "consultar_estado_tool"]:
                     from src.tools import helpdesk_tools
                     func = getattr(helpdesk_tools, fn_name, None)
                     if func: result = func(**fn_args)

                elif fn_name == "search_knowledge_base_tool":
                     from src.tools import knowledge_tools
                     result = knowledge_tools.search_knowledge_base_tool(**fn_args)

                if isinstance(result, str) and '"cardsV2"' in result:
                    try:
                        json_str = result
                        if result.startswith("```json"):
                            json_str = result.replace("```json", "").replace("```", "")
                        
                        card_data = json.loads(json_str)
                        if "cardsV2" in card_data:
                            card_found = card_data
                            result = "Acción completada. Tarjeta UI mostrada al usuario."
                    except Exception as json_err:
                        log_structured("CardParseError", error=str(json_err))

            except Exception as e:
                result = f"Error ejecutando {fn_name}: {str(e)}"
            
            tool_outputs.append(types.Part.from_function_response(name=fn_name, response={"result": result}))
            
    return {"messages": [types.Content(role="tool", parts=tool_outputs)]}

def should_continue(state: AgentState):
    last_message = state["messages"][-1]
    if last_message.parts:
        for part in last_message.parts:
            if part.function_call:
                return "tools"
    return END

checkpointer = FirestoreSaver()

def get_compiled_graph():
    global _COMPILED_GRAPH
    if _COMPILED_GRAPH is None:
        builder = StateGraph(AgentState)
        builder.add_node("agent", agent_node)
        builder.add_node("tools", tools_execution_node)
        builder.set_entry_point("agent")
        builder.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
        builder.add_edge("tools", "agent")
        _COMPILED_GRAPH = builder.compile(checkpointer=checkpointer)
    return _COMPILED_GRAPH