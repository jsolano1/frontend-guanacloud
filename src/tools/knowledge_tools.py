import json
import numpy as np
from google import genai
from google.cloud import storage
from src.config import settings
from src.utils.prompt_loader import load_prompt

KB_CACHE = None
STORAGE_CLIENT = storage.Client()

def _load_kb_cache():
    """Carga el índice de chunks y embeddings en memoria (cache)."""
    global KB_CACHE
    if KB_CACHE is not None: 
        return KB_CACHE
    
    try:
        bucket = STORAGE_CLIENT.bucket(settings.KNOWLEDGE_BASE_BUCKET)
        blob = bucket.blob("kb_index_chunks.json")
        if not blob.exists(): return []
        
        data = json.loads(blob.download_as_text())
        for item in data:
            item['embedding'] = np.array(item['embedding'])
        
        KB_CACHE = data
        return KB_CACHE
    except Exception as e:
        print(f"🔴 Error crítico al cargar el índice del KB: {e}")
        return []

def search_knowledge_base_tool(user_query: str, solicitante_email: str = "unknown") -> str:
    """Busca en la base de conocimiento usando RAG Multi-Contexto."""
    client = genai.Client(vertexai=True, project=settings.GCP_PROJECT_ID, location=settings.LOCATION)
    
    try:
        embed_response = client.models.embed_content(
            model=settings.EMBEDDING_MODEL_NAME, 
            contents=user_query
        )
        query_vector = np.array(embed_response.embeddings[0].values)
    except Exception as e:
        return f"Error generando embeddings con el modelo {settings.EMBEDDING_MODEL_NAME}: {str(e)}"
        log_structured("KBSearchStart", query=user_query)

    kb_data = _load_kb_cache()
    if not kb_data: return "La base de conocimiento está vacía."

    all_candidates = []
    for item in kb_data:
        doc_vector = item['embedding']
        score = np.dot(query_vector, doc_vector) / (np.linalg.norm(query_vector) * np.linalg.norm(doc_vector))
        
        all_candidates.append({
            'score': score,
            'chunk_text': item['chunk_text'],
            'source_file': item['source_file']
        })

    all_candidates.sort(key=lambda x: x['score'], reverse=True)
    
    best_chunk = all_candidates[0] if all_candidates else None
    
    if not best_chunk:
        log_structured("KBSearchFailed", reason="No candidates found")
        return "No encontré información en la base de conocimiento."

    log_structured("KBSearchBestMatch", source=best_chunk['source_file'], score=best_chunk['score'])

    if best_chunk['score'] < 0.55:
        return "No encontré información suficientemente relevante en el KB."

    top_n_chunks = all_candidates[:3]
    
    contexto_para_llm = "\n\n--- CONTEXTO ADICIONAL ---\n\n".join([
        f"Fuente: {c['source_file']} (Similitud: {c['score']:.2f})\nContenido: {c['chunk_text']}" 
        for c in top_n_chunks
    ])
    
    try:
        prompt_template_final = load_prompt("rag_final_answer.md") 
        prompt_respuesta_final = prompt_template_final.replace("{document_content}", contexto_para_llm).replace("{user_query}", user_query)
        
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_ID,
            contents=prompt_respuesta_final
        )
        
        return response.candidates[0].content.parts[0].text
        
    except Exception as e:
        return f"Error durante el proceso final de RAG: {str(e)}"