from flask import Flask, request, jsonify
from managers import AuthManager, TaskManager
from utils import token_required, validate_user_data, validate_task_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app, 
     origins=["http://localhost:3000"], 
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
app.config['SECRET_KEY'] = 'supersecretkey'


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos'}), 400
    error = validate_user_data(data)
    if error:
        return jsonify({'error': error}), 400
    try:
        user = AuthManager.register(data['username'], data['password'])
        return jsonify({'message': 'Usuario registrado'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos'}), 400
    try:
        token = AuthManager.login(data['username'], data['password'])
        return jsonify({'token': token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401

@app.route('/api/tasks', methods=['GET'])
@token_required
def get_tasks(username):
    tasks = TaskManager.get_tasks(username)
    return jsonify([{'id': t.id, 'title': t.title, 'description': t.description} for t in tasks])

@app.route('/api/tasks', methods=['POST'])
@token_required
def create_task(username):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos'}), 400
    error = validate_task_data(data)
    if error:
        return jsonify({'error': error}), 400
    task = TaskManager.create_task(data['title'], data['description'], username)
    return jsonify({'id': task.id, 'title': task.title, 'description': task.description}), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
@token_required
def update_task(username, task_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos'}), 400
    error = validate_task_data(data)
    if error:
        return jsonify({'error': error}), 400
    try:
        task = TaskManager.update_task(task_id, data['title'], data['description'], username)
        return jsonify({'message': 'Tarea actualizada', 'task': {'id': task.id, 'title': task.title, 'description': task.description}})
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
@token_required
def delete_task(username, task_id):
    try:
        TaskManager.delete_task(task_id, username)
        return jsonify({'message': 'Tarea eliminada'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/')
def index():
    return 'API de Práctica Integradora funcionando'

if __name__ == '__main__':
    app.run(debug=True)
