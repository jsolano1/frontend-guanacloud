import os
import uvicorn
import traceback
from fastapi import FastAPI, Request
from src.logic_graph import graph
from src.utils.logging_utils import log_structured
from google.genai import types

app = FastAPI(title="KAI Core V2", version="2.0.1")

@app.post("/")
async def handle_chat_event(request: Request):
    try:
        event = await request.json()
        event_type = event.get('type')
        
        if event_type != 'MESSAGE':
            return {}

        message_text = event['message']['text']
        user_name = event['user']['displayName']
        user_email = event['user']['email']
        thread_id = event['message']['thread']['name']

        log_structured("MessageReceived", user=user_email, text=message_text)

        config = {"configurable": {"thread_id": thread_id}}
        
        initial_input = {
            "messages": [
                types.Content(role="user", parts=[types.Part.from_text(text=message_text)])
            ],
            "user_email": user_email
        }

        final_state = await graph.ainvoke(initial_input, config=config)
        
        if not final_state.get("messages"):
            raise ValueError("El grafo no devolvió mensajes.")

        last_message = final_state["messages"][-1]
        
        if not last_message.parts:
             log_structured("EmptyResponseFromGemini", state=str(final_state))
             return {"text": "Lo siento, no pude generar una respuesta (filtro de seguridad o error interno)."}

        response_text = last_message.parts[0].text

        return {"text": response_text}

    except Exception as e:
        tb_str = traceback.format_exc()
        log_structured("CriticalError", error=str(e), traceback=tb_str)
        return {"text": f"😵‍💫 KAI V2 Error: {str(e)}"} 

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)