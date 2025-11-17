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

def _get_creds(subject_email, scopes):
    """Obtiene credenciales delegadas (Domain-Wide Delegation)."""
    try:
        source_creds, _ = google.auth.default(scopes=scopes)
        if hasattr(source_creds, 'refresh') and not source_creds.token:
             source_creds.refresh(google.auth.transport.requests.Request())
        
        return impersonated_credentials.Credentials(
            source_credentials=source_creds,
            target_principal=source_creds.service_account_email, 
            target_scopes=scopes,
            subject=subject_email
        )
    except Exception as e:
        log_structured("AuthCredentialsError", error=str(e))
        raise e

def _create_message(sender, to, subject, message_text):
    """Crea un mensaje MIME para Gmail API."""
    message = MIMEText(message_text, 'html')
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}

def enviar_notificacion_email(destinatario, asunto, cuerpo_html):
    """Envía email vía Gmail API (DWD)."""
    try:
        scopes = ['https://www.googleapis.com/auth/gmail.send']
        sender_email = settings.APP_EMAIL_SENDER_IDENTITY

        if not sender_email:
            log_structured("EmailSkipped", reason="No APP_EMAIL_SENDER_IDENTITY configured")
            return False

        # Obtener credenciales
        creds = _get_creds(sender_email, scopes)
        
        # Construir servicio
        service = build('gmail', 'v1', credentials=creds)
        
        # Crear mensaje
        mensaje = _create_message(sender_email, destinatario, asunto, cuerpo_html)
        
        # Enviar
        sent_message = service.users().messages().send(userId='me', body=mensaje).execute()
        
        log_structured("EmailSent", to=destinatario, subject=asunto, id=sent_message.get('id'))
        return True

    except Exception as e:
        log_structured("EmailError", error=str(e))
        return False

def enviar_notificacion_chat(mensaje_dict_o_str, webhook_url=None):
    """Envía mensaje a Google Chat."""
    url = webhook_url or settings.GOOGLE_CHAT_WEBHOOK_URL
    if not url:
        log_structured("ChatSkipped", reason="No Webhook URL")
        return
    
    payload = mensaje_dict_o_str if isinstance(mensaje_dict_o_str, dict) else {"text": mensaje_dict_o_str}
    
    try:
        resp = requests.post(url, json=payload)
        resp.raise_for_status()
        log_structured("ChatNotificationSent")
    except Exception as e:
        log_structured("ChatNotificationError", error=str(e))