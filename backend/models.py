class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password  # En producción, hashear
        self.tasks = []

class Task:
    def __init__(self, title, description, user_id):
        self.id = None  # Se asigna al guardar
        self.title = title
        self.description = description
        self.user_id = user_id 