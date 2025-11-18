import json
import re
import traceback
from datetime import date
from google.cloud import bigquery
from google import genai
from google.genai import types
from src.config import settings
from src.utils.prompt_loader import load_prompt
from src.utils.logging_utils import log_structured

bq_client = bigquery.Client(project=settings.GCP_PROJECT_ID)

def _execute_sql(sql: str) -> list:
    """Ejecuta SQL en BigQuery y devuelve una lista de diccionarios serializables."""
    try:
        query_job = bq_client.query(sql)
        results = query_job.result()
        
        rows = []
        for row in results:
            item = {}
            for key, value in row.items():
                if isinstance(value, date):
                    item[key] = value.isoformat()
                else:
                    item[key] = value
            rows.append(item)
        return rows
    except Exception as e:
        log_structured("BigQueryExecutionError", error=str(e), sql=sql)
        raise e

def consultar_dwh(pregunta: str, user_email: str) -> str:
    """Orquesta el flujo de consulta de datos."""
    log_structured("DwhQueryStart", user=user_email, query=pregunta)

    genai_client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)

    prompt_template = load_prompt("generate_dwh_sql_from_nl.md")
    if not prompt_template:
        return "Error interno: No pude cargar las instrucciones de Data."

    prompt_sql = prompt_template.replace("{pregunta_del_usuario}", pregunta)

    try:
        response_sql = genai_client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=prompt_sql,
            config=types.GenerateContentConfig(temperature=0.0)
        )
        
        generated_sql = response_sql.candidates[0].content.parts[0].text
        generated_sql = re.sub(r"```sql|```", "", generated_sql).strip()
        
        log_structured("DwhSqlGenerated", sql=generated_sql)

        if any(verb in generated_sql.upper() for verb in ["DROP", "DELETE", "INSERT", "UPDATE", "ALTER"]):
            return "⛔ Lo siento, por seguridad no puedo ejecutar comandos de modificación en la base de datos."

        data = _execute_sql(generated_sql)
        
        if not data:
            return f"Ejecuté la consulta, pero no encontré resultados para: '{pregunta}'. Intenta ampliar el rango de fechas o verificar los filtros."

        data_preview = data[:50] 
        
        summary_template = load_prompt("summarize_dwh_results.md")
        if not summary_template:
            return f"Aquí están los datos crudos: {json.dumps(data_preview, ensure_ascii=False)}"

        prompt_summary = summary_template.replace("{pregunta_del_usuario}", pregunta).replace("{json_results}", json.dumps(data_preview, ensure_ascii=False))
        
        response_summary = genai_client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=prompt_summary,
            config=types.GenerateContentConfig(temperature=0.2)
        )
        
        return response_summary.candidates[0].content.parts[0].text

    except Exception as e:
        tb = traceback.format_exc()
        log_structured("DwhServiceError", error=str(e), traceback=tb)
        return f"Tuve un problema técnico procesando tu consulta de datos. Error: {str(e)}"