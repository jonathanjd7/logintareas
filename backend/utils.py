from functools import wraps
from flask import request, jsonify
from managers import AuthManager

MAX_USERNAME_LENGTH = 32
MAX_PASSWORD_LENGTH = 64
MAX_TITLE_LENGTH = 100
MAX_DESCRIPTION_LENGTH = 500

def validate_user_data(data):
    if not data.get('username') or not data.get('password'):
        return 'Usuario y contraseña requeridos'
    if len(data['username']) > MAX_USERNAME_LENGTH:
        return 'El nombre de usuario es demasiado largo'
    if len(data['password']) > MAX_PASSWORD_LENGTH:
        return 'La contraseña es demasiado larga'
    return None

def validate_task_data(data):
    if not data.get('title'):
        return 'El título es requerido'
    if len(data['title']) > MAX_TITLE_LENGTH:
        return 'El título es demasiado largo'
    if 'description' in data and len(data['description']) > MAX_DESCRIPTION_LENGTH:
        return 'La descripción es demasiado larga'
    return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'error': 'Token requerido'}), 401
        username = AuthManager.verify_token(token)
        if not username:
            return jsonify({'error': 'Token inválido o expirado'}), 401
        return f(username, *args, **kwargs)
    return decorated 