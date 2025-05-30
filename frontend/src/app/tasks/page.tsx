'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { tasksAPI } from '@/utils/api';
import { isAuthenticated, logout } from '@/utils/auth';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
}

export default function TasksPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        fetchTasks();
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const fetchTasks = async () => {
        try {
            const data = await tasksAPI.getTasks();
            setTasks(data);
        } catch (error) {
            toast.error('Error al cargar las tareas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTask = async (title: string, description: string) => {
        try {
            await tasksAPI.createTask(title, description);
            fetchTasks();
        } catch (error) {
            throw error;
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full relative">
            {/* Background image with overlay */}
            <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Logout button */}
            <div className="fixed top-4 right-4 z-20">
                <button
                    onClick={handleLogout}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen w-full py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center mb-8">
                        Gestión de Tareas
                    </h1>
                    
                    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Nueva Tarea</h2>
                        <TaskForm onSubmit={handleCreateTask} />
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Lista de Tareas</h2>
                        <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
                    </div>
                </div>
            </div>
        </div>
    );
} 