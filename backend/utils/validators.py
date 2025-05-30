import re
from typing import Dict, List, Tuple

def validate_email(email: str) -> Tuple[bool, str]:
    """
    Valida el formato de un email.
    Retorna una tupla con (es_válido, mensaje_error)
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        return False, "El formato del email no es válido"
    return True, ""

def validate_password(password: str) -> Tuple[bool, str]:
    """
    Valida que la contraseña cumpla con los requisitos mínimos.
    Retorna una tupla con (es_válida, mensaje_error)
    """
    if len(password) < 8:
        return False, "La contraseña debe tener al menos 8 caracteres"
    if not re.search(r'[A-Z]', password):
        return False, "La contraseña debe contener al menos una mayúscula"
    if not re.search(r'[a-z]', password):
        return False, "La contraseña debe contener al menos una minúscula"
    if not re.search(r'\d', password):
        return False, "La contraseña debe contener al menos un número"
    return True, ""

def validate_username(username: str) -> Tuple[bool, str]:
    """
    Valida el formato del nombre de usuario.
    Retorna una tupla con (es_válido, mensaje_error)
    """
    if len(username) < 3:
        return False, "El nombre de usuario debe tener al menos 3 caracteres"
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False, "El nombre de usuario solo puede contener letras, números y guiones bajos"
    return True, "" 