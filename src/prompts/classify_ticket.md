Analiza la siguiente descripción del problema y devuelve un objeto JSON estructurado.

**Objetivo:** Clasificar la solicitud para el equipo de Helpdesk.

**Campos requeridos en el JSON:**
1. "titulo": Un resumen breve y profesional del problema (4-5 palabras).
2. "tipo_solicitud": Selecciona UNA categoría de esta lista:
   - Reporte de Bugs
   - Accesos y Permisos
   - Redes y Conectividad
   - Hardware y Periféricos
   - Datos e Informes
   - Otro

**Descripción del Usuario:**
{descripcion}

**Formato de Respuesta:**
Responde ÚNICAMENTE con el JSON válido. Sin markdown, sin comentarios.