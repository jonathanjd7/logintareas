import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: async (username: string, password: string) => {
        const response = await api.post('/login', { username, password });
        return response.data;
    },
    register: async (username: string, password: string) => {
        const response = await api.post('/register', { username, password });
        return response.data;
    },
};

export const tasksAPI = {
    getTasks: async () => {
        const response = await api.get('/tasks');
        return response.data;
    },
    createTask: async (title: string, description: string) => {
        const response = await api.post('/tasks', { title, description });
        return response.data;
    },
    updateTask: async (id: number, data: { title?: string; description?: string; completed?: boolean }) => {
        const response = await api.put(`/tasks/${id}`, data);
        return response.data;
    },
    deleteTask: async (id: number) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },
};

export default api; 