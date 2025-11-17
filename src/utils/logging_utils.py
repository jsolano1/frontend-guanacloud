import json
import time
import functools
from datetime import datetime, timezone

def log_structured(log_name: str, **kwargs):
    """Logs estructurados para Cloud Logging."""
    log_entry = {
        "log_name": log_name, 
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "severity": "INFO"
    }
    log_entry.update(kwargs)
    for k, v in log_entry.items():
        if isinstance(v, Exception):
            log_entry[k] = str(v)
            
    print(json.dumps(log_entry, default=str))

def measure_latency(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            status = "success"
            return result
        except Exception as e:
            status = "error"
            raise e
        finally:
            end_time = time.time()
            duration_ms = round((end_time - start_time) * 1000, 2)
            log_structured(
                "PerformanceMetric", 
                function=func.__name__, 
                duration_ms=duration_ms, 
                status=status
            )
    return wrapper