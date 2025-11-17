import json
import asyncio
from typing import Any, Dict, List, Optional, Tuple
from google.cloud import firestore
from langgraph.checkpoint.base import BaseCheckpointSaver, Checkpoint, CheckpointMetadata, CheckpointTuple
from src.config import settings
from src.utils.logging_utils import log_structured

class FirestoreSaver(BaseCheckpointSaver):
    """Implementación personalizada de Checkpointer para LangGraph usando Firestore."""
    
    def __init__(self):
        # Inicialización del cliente Firestore
        self.client = firestore.Client(project=settings.GCP_PROJECT_ID, database=settings.FIRESTORE_DATABASE_ID)
        self.collection = self.client.collection(settings.FIRESTORE_SESSION_COLLECTION)

    def _sanitize_id(self, thread_id: str) -> str:
        """
        Convierte 'spaces/X/threads/Y' en 'spaces_X_threads_Y' para usarlo como ID de documento seguro.
        Firestore no permite '/' en IDs de documentos si no apuntan a subcolecciones.
        """
        if not thread_id:
            return "unknown_thread"
        return thread_id.replace("/", "_")

    def get_tuple(self, config: Dict[str, Any]) -> Optional[CheckpointTuple]:
        thread_id = config["configurable"]["thread_id"]
        safe_thread_id = self._sanitize_id(thread_id)
        doc_ref = self.collection.document(safe_thread_id)
        
        try:
            doc = doc_ref.get()
            if not doc.exists:
                return None
            
            data = doc.to_dict()
            checkpoint = json.loads(data["checkpoint"])
            metadata = json.loads(data["metadata"])
            
            
            return CheckpointTuple(
                config=config,
                checkpoint=checkpoint,
                metadata=metadata,
                parent_config=None 
            )
        except Exception as e:
            log_structured("FirestoreGetCheckpointError", error=str(e), thread_id=thread_id)
            return None

    def put(self, config: Dict[str, Any], checkpoint: Checkpoint, metadata: CheckpointMetadata, new_versions: Dict[str, Any]) -> Dict[str, Any]:
        thread_id = config["configurable"]["thread_id"]
        safe_thread_id = self._sanitize_id(thread_id)
        doc_ref = self.collection.document(safe_thread_id)
        
        try:
             save_data = {
                 "checkpoint": json.dumps(checkpoint, default=str),
                 "metadata": json.dumps(metadata, default=str),
                 "updated_at": firestore.SERVER_TIMESTAMP
             }
             doc_ref.set(save_data, merge=True)
             
             return {
                 "configurable": {
                     "thread_id": thread_id,
                     "checkpoint_id": checkpoint["id"]
                 }
             }
        except Exception as e:
            log_structured("FirestorePutCheckpointError", error=str(e), thread_id=thread_id)
            return config

    def put_writes(self, config: Dict[str, Any], writes: List[Tuple[str, Any]], task_id: str) -> None:
        """
        Guarda escrituras intermedias. 
        Para este MVP, podemos dejarlo vacío o loguearlo, ya que el estado final se guarda en `put`.
        LangGraph requiere que exista.
        """
        pass 

    def list(self, config: Optional[Dict[str, Any]], *, filter: Optional[Dict[str, Any]] = None, before: Optional[Dict[str, Any]] = None, limit: Optional[int] = None):
        return []

    # --- Métodos Asíncronos (Wrappers para asyncio) ---

    async def aget_tuple(self, config: Dict[str, Any]) -> Optional[CheckpointTuple]:
        return await asyncio.to_thread(self.get_tuple, config)

    async def aput(self, config: Dict[str, Any], checkpoint: Checkpoint, metadata: CheckpointMetadata, new_versions: Dict[str, Any]) -> Dict[str, Any]:
        return await asyncio.to_thread(self.put, config, checkpoint, metadata, new_versions)
    
    async def aput_writes(self, config: Dict[str, Any], writes: List[Tuple[str, Any]], task_id: str) -> None:
        """Implementación asíncrona de put_writes."""
        return await asyncio.to_thread(self.put_writes, config, writes, task_id)

    async def alist(self, config: Optional[Dict[str, Any]], *, filter: Optional[Dict[str, Any]] = None, before: Optional[Dict[str, Any]] = None, limit: Optional[int] = None):
        return []