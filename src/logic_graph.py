import json
from typing import Annotated, TypedDict, List, Optional, Any, Dict
from langgraph.graph import StateGraph, END
from google import genai
from google.genai import types
from src.config import settings
from src.tools.helpdesk_tools import tools_list, crear_tiquete_tool, cerrar_tiquete_tool, reasignar_tiquete_tool, consultar_estado_tool
from src.services import ticket_manager
from src.utils.firestore_storage import FirestoreSaver
from src.utils.logging_utils import log_structured
from src.utils.prompt_loader import load_prompt

client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

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
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=messages,
            config=types.GenerateContentConfig(
                tools=tools_list,
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
    
    for part in last_message.parts:
        if part.function_call:
            fn_name = part.function_call.name
            fn_args = part.function_call.args
            
            log_structured("ToolExecution", tool=fn_name, args=fn_args)
            result = "Error: Herramienta desconocida"
            
            try:
                if "solicitante_email" in fn_args and fn_args["solicitante_email"] == "unknown":
                    fn_args["solicitante_email"] = state["user_email"]

                if fn_name == "crear_tiquete_tool":
                    result = crear_tiquete_tool(**fn_args)
                elif fn_name == "cerrar_tiquete_tool":
                    result = cerrar_tiquete_tool(**fn_args)
                elif fn_name == "reasignar_tiquete_tool":
                    result = reasignar_tiquete_tool(**fn_args)
                elif fn_name == "consultar_estado_tool":
                    result = str(consultar_estado_tool(**fn_args))
                
                if isinstance(result, str) and '"cardsV2":' in result:
                    try:
                        card_json = json.loads(result)
                        if "cardsV2" in card_json:
                            card_found = card_json
                            result = "Acción completada. Tarjeta generada."
                    except:
                        pass

            except Exception as e:
                result = f"Error ejecutando herramienta: {str(e)}"
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

builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_node("tools", tools_execution_node)
builder.set_entry_point("agent")
builder.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
builder.add_edge("tools", "agent")

checkpointer = FirestoreSaver()
graph = builder.compile(checkpointer=checkpointer)