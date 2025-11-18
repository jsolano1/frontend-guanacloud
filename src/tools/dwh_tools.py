import threading
import google.auth
from googleapiclient.discovery import build
from google.cloud import bigquery
from src.services import dwh_query_service
from src.services.notification_service import enviar_mensaje_directo_chat
from src.utils.database_client import get_dm_space_name_for_user
from src.utils.logging_utils import log_structured
from src.config import settings

TARGET_PROJECT_ID = "connectdwh-367315"
TARGET_DATASET_ID = "connect_dwh"
TARGET_TABLE_ID = "fact_services"

def _check_iam_permissions(user_email: str) -> bool:
    """
    Valida permisos en cascada:
    1. Roles de alto nivel en el Proyecto (Owner, Editor).
    2. Roles específicos en la Tabla (Data Viewer).
    """
    if not user_email: return False
    user_member = f"user:{user_email.strip().lower()}"
    
    # --- NIVEL 1: Permisos de Proyecto (Resource Manager API) ---
    try:
        creds, _ = google.auth.default()
        service = build('cloudresourcemanager', 'v1', credentials=creds)
        
        policy = service.projects().getIamPolicy(resource=TARGET_PROJECT_ID).execute()
        
        high_privilege_roles = {
            "roles/owner",
            "roles/editor",
            "roles/bigquery.admin",
            "roles/bigquery.user",
            "roles/bigquery.jobUser"
        }

        for binding in policy.get('bindings', []):
            if binding['role'] in high_privilege_roles:
                members_lower = [m.lower() for m in binding.get('members', [])]
                if user_member in members_lower:
                    log_structured("DwhIAMCheckSuccess", level="Project", role=binding['role'], user=user_email)
                    return True

    except Exception as e:
        log_structured("DwhProjectIAMCheckWarning", error=str(e), user=user_email)

    # --- NIVEL 2: Permisos de Tabla (BigQuery API) ---
    try:
        client = bigquery.Client(project=settings.GCP_PROJECT_ID)
        table_ref = f"{TARGET_PROJECT_ID}.{TARGET_DATASET_ID}.{TARGET_TABLE_ID}"
        
        policy = client.get_iam_policy(table_ref)
        
        table_roles = {
            "roles/bigquery.dataViewer",
            "roles/bigquery.dataEditor",
            "roles/bigquery.admin",
            "roles/owner",
            "roles/editor"
        }

        for binding in policy.bindings:
            if binding.role in table_roles:
                members_lower = [m.lower() for m in binding.members]
                if user_member in members_lower:
                    log_structured("DwhIAMCheckSuccess", level="Table", role=binding.role, user=user_email)
                    return True

    except Exception as e:
        log_structured("DwhTableIAMCheckError", error=str(e), user=user_email)

    log_structured("DwhIAMCheckDenied", user=user_email, reason="No matching roles found in Project or Table")
    return False

def _run_dwh_async_secure(pregunta, email, space_name):
    """Worker asíncrono para la consulta."""
    log_structured("AsyncDWHStart", user=email, space=space_name)
    try:
        resultado = dwh_query_service.consultar_dwh(pregunta, email)
        msg_final = f"📊 *Resultados de tu análisis DWH:*\n\n{resultado}"
        enviar_mensaje_directo_chat(space_name, msg_final)
    except Exception as e:
        error_msg = f"❌ Ocurrió un error procesando tu consulta de datos: {str(e)}"
        enviar_mensaje_directo_chat(space_name, error_msg)

def consultar_dwh_tool(pregunta: str, solicitante_email: str = "unknown") -> str:
    """
    Consulta la base de datos analítica (DWH) validando permisos reales en GCP.
    """
    # 1. Validación de Permisos (Cascada: Proyecto -> Tabla)
    if not _check_iam_permissions(solicitante_email):
        return "⛔ Acceso Denegado: Tu cuenta de Google no tiene permisos (Owner/Editor/Lector) sobre el proyecto o la tabla de datos en BigQuery."

    # 2. Obtener canal seguro (DM)
    dm_space_name = get_dm_space_name_for_user(solicitante_email)
    
    if not dm_space_name:
        log_structured("DwhNoDMBound", user=solicitante_email)
        return "⚠️ No puedo procesar la solicitud porque no tengo un chat privado registrado contigo. Escríbeme por privado primero."

    # 3. Ejecución Asíncrona
    thread = threading.Thread(
        target=_run_dwh_async_secure, 
        args=(pregunta, solicitante_email, dm_space_name)
    )
    thread.start()
    
    return "⏳ Validando tus credenciales de GCP y analizando datos... Te enviaré los resultados por aquí en unos momentos."

dwh_tools_list = [consultar_dwh_tool]