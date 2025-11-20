Analiza la imagen de este vehículo y extrae la siguiente información en formato JSON estrictamente:

{
    "vista_perfil": "Ej: Delantera izquierda, Trasera derecha, Frontal, Lateral, Interior",
    "marca": "Marca del vehículo o 'Desconocido'",
    "modelo": "Modelo aproximado o 'Desconocido'",
    "tipo_vehiculo": "Ej: Sedan, SUV, Hatchback, Pick-up, Motocicleta, Camión",
    "color": "Color principal del vehículo"
}

Si la imagen NO es un vehículo (ej. es un documento, una persona, o borrosa), devuelve:
{
    "error": "No se detectó un vehículo claro en la imagen"
}

Solo devuelve el JSON.