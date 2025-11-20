Analiza esta imagen y determina qué es. Devuelve un JSON estrictamente con esta estructura:

{
  "category": "vehicle" o "document" o "other",
  "specific_type": "Ej: sedan, suv, cedula_identidad, licencia, pasaporte",
  "view_angle": "Ej: front_left, rear, dashboard, full_shot, macro_damage",
  "description": "Breve descripción de 5 palabras"
}

Si es un vehículo, trata de identificar la vista (ej. "front_left"). Si es un documento, identifica el tipo.