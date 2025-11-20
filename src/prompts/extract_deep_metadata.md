Analiza esta imagen en profundidad y extrae toda la información técnica y textual visible.
Devuelve un JSON con la siguiente estructura según lo que veas (si no ves algo, usa null):

**Si es VEHÍCULO:**
{
  "tipo_analisis": "vehiculo",
  "marca": "Ej: Toyota",
  "modelo": "Ej: Corolla",
  "año_aproximado": "Ej: 2018-2022",
  "color": "Ej: Plata Metálico",
  "tipo_carroceria": "Ej: Sedan",
  "placa_visible": "Número o null",
  "daños_resumen": ["Lista de daños visibles", "Golpe puerta", "Faro roto"]
}

**Si es DOCUMENTO (Cédula, Licencia, Pasaporte):**
{
  "tipo_analisis": "documento",
  "tipo_documento": "Ej: Licencia de Conducir, Cédula, Pasaporte",
  "pais_emisor": "Ej: Costa Rica, Panamá",
  "numero_identidad": "El ID principal",
  "nombre_completo": "Nombre visible",
  "fecha_nacimiento": "YYYY-MM-DD",
  "fecha_vencimiento": "YYYY-MM-DD",
  "tipo_licencia": "Ej: B1, A2 (Solo si es licencia)",
  "donador": "Si/No (si visible)",
  "sexo": "M/F"
}

Solo devuelve el JSON limpio.