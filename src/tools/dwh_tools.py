import threading
import google.auth
from googleapiclient.discovery import build
from google.cloud import bigquery
from src.services import dwh_query_service
from src.services.notification_service import enviar_mensaje_directo_chat
from src.utils.database_client import get_dm_space_name_for_user
from src.utils.logging_utils import log_structured
from src.config import settings
from src.utils.database_client import check_dwh_permission

TARGET_PROJECT_ID = "connectdwh-367315"
TARGET_DATASET_ID = "connect_dwh"
TARGET_TABLE_ID = "fact_services"

def _check_permission_hybrid(user_email: str) -> bool:
    """
    Verifica permisos en dos niveles:
    1. IAM de GCP (Prioridad técnica).
    2. Tabla roles_usuarios en Postgres (Prioridad de negocio/fallback).
    """
    if not user_email: return False
    
    if _check_iam_permissions(user_email):
        return True
        
    log_structured("DwhIAMCheckFailed", user=user_email, action="Attempting DB Fallback")
    if check_dwh_permission(user_email):
        log_structured("DwhDBCheckSuccess", user=user_email)
        return True
        
    return False

def _get_role(binding):
    """Helper seguro para obtener el rol de un binding (objeto o dict)."""
    if isinstance(binding, dict):
        return binding.get('role')
    return getattr(binding, 'role', None)

def _get_members(binding):
    """Helper seguro para obtener miembros."""
    if isinstance(binding, dict):
        return binding.get('members', [])
    return getattr(binding, 'members', [])

def _check_iam_permissions(user_email: str) -> bool:
    if not user_email: return False
    user_member = f"user:{user_email.strip().lower()}"
    
    # --- NIVEL 1: Permisos de Proyecto ---
    try:
        creds, _ = google.auth.default()
        service = build('cloudresourcemanager', 'v1', credentials=creds)
        policy = service.projects().getIamPolicy(resource=TARGET_PROJECT_ID).execute()
        
        high_privilege_roles = {
            "roles/owner", "roles/editor", "roles/bigquery.admin",
            "roles/bigquery.user", "roles/bigquery.jobUser"
        }

        # La API REST de Resource Manager devuelve dicts
        for binding in policy.get('bindings', []):
            role = binding.get('role')
            if role in high_privilege_roles:
                members = [m.lower() for m in binding.get('members', [])]
                if user_member in members:
                    log_structured("DwhIAMCheckSuccess", level="Project", role=role, user=user_email)
                    return True
    except Exception as e:
        log_structured("DwhProjectIAMCheckWarning", error=str(e), user=user_email)

    # --- NIVEL 2: Permisos de Tabla ---
    try:
        client = bigquery.Client(project=settings.GCP_PROJECT_ID)
        table_ref = f"{TARGET_PROJECT_ID}.{TARGET_DATASET_ID}.{TARGET_TABLE_ID}"
        policy = client.get_iam_policy(table_ref)
        
        table_roles = {
            "roles/bigquery.dataViewer", "roles/bigquery.dataEditor",
            "roles/bigquery.admin", "roles/owner", "roles/editor"
        }

        # La librería de BigQuery puede devolver objetos Policy con bindings como objetos O dicts
        for binding in policy.bindings:
            role = _get_role(binding)
            if role in table_roles:
                members = [m.lower() for m in _get_members(binding)]
                if user_member in members:
                    log_structured("DwhIAMCheckSuccess", level="Table", role=role, user=user_email)
                    return True

    except Exception as e:
        import traceback
        log_structured("DwhTableIAMCheckError", error=str(e), traceback=traceback.format_exc(), user=user_email)

    log_structured("DwhIAMCheckDenied", user=user_email, reason="No matching roles found")
    return False

def _run_dwh_async_secure(pregunta, email, space_name):
    log_structured("AsyncDWHStart", user=email, space=space_name)
    try:
        resultado = dwh_query_service.consultar_dwh(pregunta, email)
        msg_final = f"📊 *Resultados de tu análisis DWH:*\n\n{resultado}"
        enviar_mensaje_directo_chat(space_name, msg_final)
    except Exception as e:
        error_msg = f"❌ Ocurrió un error procesando tu consulta de datos: {str(e)}"
        enviar_mensaje_directo_chat(space_name, error_msg)

def consultar_dwh_tool(pregunta: str, solicitante_email: str = "unknown") -> str:
    if not _check_permission_hybrid(solicitante_email):
        return "⛔ Acceso Denegado: No tienes permisos registrados (ni en GCP IAM ni en la base de datos de usuarios) para consultar el Data Warehouse."

    dm_space_name = get_dm_space_name_for_user(solicitante_email)
    if not dm_space_name:
        return "⚠️ No tengo un chat privado registrado contigo. Escríbeme por privado primero."

    thread = threading.Thread(
        target=_run_dwh_async_secure, 
        args=(pregunta, solicitante_email, dm_space_name)
    )
    thread.start()
    
    return "⏳ Validando credenciales y consultando DWH... Resultados en breve por aquí."

dwh_tools_list = [consultar_dwh_tool]