import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    # --- GCP Core ---
    GCP_PROJECT_ID: str
    LOCATION: str = "us-central1"
    
    # --- IA (Nuevo SDK) ---
    # Usamos el modelo Flash optimizado para latencia
    GEMINI_MODEL_ID: str = "gemini-2.5-flash" 
    
    # --- Base de Datos (Cloud SQL) ---
    DB_USER: str = "postgres"
    DB_NAME: str = "postgres"
    DB_CONNECTION_NAME: str
    DB_PASS: str

    # --- Firestore (Persistencia de LangGraph) ---
    # Usamos una colección separada para la V2 para evitar conflictos
    FIRESTORE_DATABASE_ID: str = "agentkai-corev2" 
    FIRESTORE_SESSION_COLLECTION: str = "kai_v2_graph_state"

    # --- Integraciones ---
    GOOGLE_CHAT_WEBHOOK_URL: str
    TI_GOOGLE_CHAT_WEBHOOK_URL: str
    APP_EMAIL_SENDER_IDENTITY: str
    
    # --- Storage ---
    GCS_ATTACHMENT_BUCKET: str = "kai-tiquete-attachments"
    
    # --- Pool DB ---
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_TIMEOUT: int = 30

settings = Settings()