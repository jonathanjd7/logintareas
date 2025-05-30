import os
from datetime import timedelta
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración general
DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
SECRET_KEY = os.environ.get('SECRET_KEY', 'mi-clave-secreta-desarrollo')

# Configuración de la base de datos
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///tasks.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Configuración JWT
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

# Configuración CORS
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')

# Configuración de seguridad
BCRYPT_LOG_ROUNDS = 12  # Para el hash de contraseñas

# Configuración de la aplicación
APP_NAME = "Gestor de Tareas API"
APP_VERSION = "1.0.0" 