import json
from typing import Any, Dict, Optional
from google.cloud import firestore
from langgraph.checkpoint.base import BaseCheckpointSaver, Checkpoint, CheckpointMetadata, CheckpointTuple
from src.config import settings
from src.utils.logging_utils import log_structured

class FirestoreSaver(BaseCheckpointSaver):
    """Implementación personalizada de Checkpointer para LangGraph usando Firestore."""
    
    def __init__(self):
        self.client = firestore.Client(project=settings.GCP_PROJECT_ID, database=settings.FIRESTORE_DATABASE_ID)
        self.collection = self.client.collection(settings.FIRESTORE_SESSION_COLLECTION)

    def get_tuple(self, config: Dict[str, Any]) -> Optional[CheckpointTuple]:
        thread_id = config["configurable"]["thread_id"]
        doc_ref = self.collection.document(thread_id)
        
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
        doc_ref = self.collection.document(thread_id)
        
        
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

    def list(self, config: Optional[Dict[str, Any]], *, filter: Optional[Dict[str, Any]] = None, before: Optional[Dict[str, Any]] = None, limit: Optional[int] = None):
        return []