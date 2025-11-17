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
    source_creds, _ = google.auth.default(scopes=scopes)
    return impersonated_credentials.Credentials(
        source_credentials=source_creds,
        target_principal=os.environ.get("K_SERVICE_ACCOUNT") or "kai-sa@...",
        target_scopes=scopes,
        subject=subject_email
    )

def enviar_notificacion_email(destinatario, asunto, cuerpo_html):
    """Envía email vía Gmail API (DWD)."""
    try:
        scopes = ['https://www.googleapis.com/auth/gmail.send']
        if not settings.APP_EMAIL_SENDER_IDENTITY:
            log_structured("EmailSkipped", reason="No sender identity")
            return
            
        except Exception as e:
        logger.error(f"GMAIL_API_AUTH_ERROR: Fallo al crear credenciales delegadas. Error: {e}", exc_info=True)
        raise

    try:
        service = build('gmail', 'v1', credentials=credentials)
        mensaje = _create_message(destinatario, asunto, cuerpo_html, SENDER_EMAIL) 
        sent_message = service.users().messages().send(userId='me', body=mensaje).execute()
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