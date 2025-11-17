from typing import Annotated, TypedDict, List
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from google import genai
from google.genai import types
from src.config import settings
from src.tools.helpdesk_tools import tools_list, crear_tiquete_tool
from src.utils.firestore_storage import FirestoreSaver
from src.utils.logging_utils import log_structured

# --- 1. Configuración del Cliente GenAI ---
client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

# --- 2. Estado del Grafo ---
class AgentState(TypedDict):
    messages: List[types.Content]
    user_email: str 

# --- 3. Nodo: LLM (Agente) ---
def agent_node(state: AgentState):
    messages = state["messages"]
    user_email = state.get("user_email", "usuario@connect.inc")
    
    # System Instruction dinámica
    system_prompt = f"""Eres KAI, el asistente de Helpdesk de Connect.
    Tu usuario actual es: {user_email}.
    
    REGLAS:
    1. Si el usuario quiere crear un tiquete, obtén descripción, prioridad y equipo.
    2. Si falta información, PREGUNTA antes de llamar a la herramienta.
    3. Sé amable y profesional.
    """

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

# --- 4. Nodo: Herramientas (Custom Execution) ---

def tools_execution_node(state: AgentState):
    last_message = state["messages"][-1]
    tool_outputs = []
    
    for part in last_message.parts:
        if part.function_call:
            fn_name = part.function_call.name
            fn_args = part.function_call.args
            
            log_structured("ToolExecution", tool=fn_name, args=fn_args)
            
            result = "Error: Herramienta desconocida"
            
            if fn_name == "crear_tiquete_tool":
                if "solicitante_email" not in fn_args or fn_args["solicitante_email"] == "unknown":
                    fn_args["solicitante_email"] = state["user_email"]
                result = crear_tiquete_tool(**fn_args)
                
            elif fn_name == "consultar_estado_tool":
                result = str(ticket_manager.consultar_estado_tiquete(**fn_args))
            
            tool_outputs.append(
                types.Part.from_function_response(
                    name=fn_name,
                    response={"result": result}
                )
            )
            
    return {"messages": [types.Content(role="tool", parts=tool_outputs)]}

# --- 5. Lógica de Transición ---
def should_continue(state: AgentState):
    last_message = state["messages"][-1]
    for part in last_message.parts:
        if part.function_call:
            return "tools"
    return END

# --- 6. Ensamblaje del Grafo ---
builder = StateGraph(AgentState)

builder.add_node("agent", agent_node)
builder.add_node("tools", tools_execution_node)

builder.set_entry_point("agent")

builder.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
builder.add_edge("tools", "agent")

# Persistencia
checkpointer = FirestoreSaver()
graph = builder.compile(checkpointer=checkpointer)