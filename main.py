import os
import uvicorn
import traceback
from fastapi import FastAPI, Request
from src.logic_graph import get_compiled_graph
from src.utils.logging_utils import log_structured
from google.genai import types

app = FastAPI(title="KAI Core V2", version="2.1.0")

@app.post("/")
async def handle_chat_event(request: Request):
    try:
        event = await request.json()
        
        if event.get('type') == 'CARD_CLICKED':
             return {"text": "Funcionalidad de clic en tarjeta pendiente de migración completa a V2."}

        if event.get('type') != 'MESSAGE': return {}

        message_text = event['message']['text']
        user_email = event['user']['email']
        thread_id = event['message']['thread']['name']

        log_structured("MessageReceived", user=user_email, text=message_text)

        config = {"configurable": {"thread_id": thread_id}}
        
        compiled_graph = get_compiled_graph() 

        initial_input = {
            "messages": [types.Content(role="user", parts=[types.Part.from_text(text=message_text)])],
            "user_email": user_email,
            "generated_card": None
        }
        
        final_state = await compiled_graph.ainvoke(initial_input, config=config)
        
        response_text = last_message.parts[0].text if last_message.parts and last_message.parts[0].text else " " 
        
        response_payload = {"text": response_text}

        if final_state.get("generated_card"):
            card_data = final_state["generated_card"]
            log_structured("CardRendered", user=user_email, card_keys=list(card_data.keys()))
            
            if "cardsV2" in card_data:
                response_payload["cardsV2"] = card_data["cardsV2"]
            elif "cards" in card_data:
                 response_payload["cards"] = card_data["cards"]

        return response_payload

    except Exception as e:
        tb = traceback.format_exc()
        log_structured("CriticalError", error=str(e), traceback=tb)
        return {"text": f"😵‍💫 KAI V2 Error: {str(e)}"}