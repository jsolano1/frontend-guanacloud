import base64
import json
import requests
from email.mime.text import MIMEText
from googleapiclient.discovery import build
from google.auth import impersonated_credentials
import google.auth.transport.requests
import google.auth
from src.config import settings
from src.utils.logging_utils import log_structured

CHAT_API_SCOPE = ['https://www.googleapis.com/auth/chat.bot']

def _get_creds(subject_email, scopes):
    source_creds, _ = google.auth.default(scopes=scopes)
    return impersonated_credentials.Credentials(
        source_credentials=source_creds,
        target_principal=settings.APP_EMAIL_SENDER_IDENTITY,
        target_scopes=scopes,
        subject=subject_email
    )

def _create_message(sender, to, subject, message_text):
    message = MIMEText(message_text, 'html')
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}

def enviar_notificacion_email(destinatario, asunto, cuerpo_html):
    """Envía email vía Gmail API (DWD)."""
    if not settings.APP_EMAIL_SENDER_IDENTITY:
        log_structured("EmailSkipped", reason="No sender identity configured")
        return False

    try:
        scopes = ['https://www.googleapis.com/auth/gmail.send']
        
        creds = _get_creds(settings.APP_EMAIL_SENDER_IDENTITY, scopes)
        
        service = build('gmail', 'v1', credentials=creds)
        mensaje = _create_message(settings.APP_EMAIL_SENDER_IDENTITY, destinatario, asunto, cuerpo_html) 
        
        service.users().messages().send(userId='me', body=mensaje).execute()
        
        log_structured("EmailSent", to=destinatario, subject=asunto)
        return True
    except Exception as e:
        log_structured("EmailError", error=str(e))
        return False

def enviar_notificacion_chat(mensaje_dict_o_str, webhook_url=None):
    """Envía mensaje a Google Chat."""
    url = webhook_url or settings.GOOGLE_CHAT_WEBHOOK_URL
    if not url:
        return
    
    payload = mensaje_dict_o_str if isinstance(mensaje_dict_o_str, dict) else {"text": mensaje_dict_o_str}
    try:
        resp = requests.post(url, json=payload)
        resp.raise_for_status()
        log_structured("ChatNotificationSent")
    except Exception as e:
        log_structured("ChatNotificationError", error=str(e))

def enviar_mensaje_directo_chat(space_name: str, mensaje_text: str):
    """
    Envía un mensaje a un espacio específico (DM) usando la API de Google Chat.
    Esto es SEGURO porque va dirigido a un space_name específico, no a un webhook público.
    """
    try:
        creds, _ = google.auth.default(scopes=CHAT_API_SCOPE)
        
        service = build('chat', 'v1', credentials=creds)
        
        body = {"text": mensaje_text}
        
        service.spaces().messages().create(
            parent=space_name,
            body=body
        ).execute()
        
        log_structured("DMSent", space=space_name)
        return True
        
    except Exception as e:
        log_structured("DMSendError", error=str(e), space=space_name)
        return False