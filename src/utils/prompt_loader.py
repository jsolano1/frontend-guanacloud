import os

def load_prompt(file_name: str) -> str:
    """
    Carga el contenido de un archivo de prompt desde la carpeta src/prompts.
    """
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        prompt_path = os.path.join(current_dir, '..', 'prompts', file_name)
        
        with open(prompt_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"🔴 Error cargando prompt {file_name}: {e}")
        return ""