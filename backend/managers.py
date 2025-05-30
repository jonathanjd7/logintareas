import jwt
import datetime
from flask import current_app
from datastore import DataStore
from models import User, Task

class AuthManager:
    @staticmethod
    def register(username, password):
        if DataStore.get_user(username):
            raise Exception("Usuario ya existe")
        user = User(username, password)
        DataStore.add_user(user)
        return user

    @staticmethod
    def login(username, password):
        user = DataStore.get_user(username)
        if not user or user.password != password:
            raise Exception("Credenciales inválidas")
        payload = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        return token

    @staticmethod
    def verify_token(token):
        try:
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            return payload['username']
        except Exception:
            return None


class TaskManager:
    @staticmethod
    def create_task(title, description, username):
        task = Task(title, description, username)
        DataStore.add_task(task)
        return task

    @staticmethod
    def get_tasks(username):
        return DataStore.get_tasks_by_user(username)

    @staticmethod
    def get_task(task_id):
        return DataStore.get_task_by_id(task_id)

    @staticmethod
    def delete_task(task_id, username):
        task = DataStore.get_task_by_id(task_id)
        if not task or task.user_id != username:
            raise Exception("Tarea no encontrada o no autorizada")
        DataStore.delete_task(task_id)

    @staticmethod
    def update_task(task_id, title, description, username):
        task = DataStore.get_task_by_id(task_id)
        if not task or task.user_id != username:
            raise Exception("Tarea no encontrada o no autorizada")
        task.title = title
        task.description = description
        DataStore.update_task(task)
        return task
