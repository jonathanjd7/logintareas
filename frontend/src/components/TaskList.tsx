import { useState } from 'react';
import { toast } from 'react-toastify';
import { tasksAPI } from '@/utils/api';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
}

interface TaskListProps {
    tasks: Task[];
    onTaskUpdate: () => void;
}

export default function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleToggleComplete = async (taskId: number, completed: boolean) => {
        try {
            await tasksAPI.updateTask(taskId, { completed: !completed });
            onTaskUpdate();
            toast.success('Tarea actualizada');
        } catch (error) {
            toast.error('Error al actualizar la tarea');
        }
    };

    const handleDelete = async (taskId: number) => {
        try {
            setIsDeleting(taskId);
            await tasksAPI.deleteTask(taskId);
            onTaskUpdate();
            toast.success('Tarea eliminada');
        } catch (error) {
            toast.error('Error al eliminar la tarea');
        } finally {
            setIsDeleting(null);
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No hay tareas pendientes</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-white shadow rounded-lg p-4 flex items-start justify-between"
                >
                    <div className="flex-1">
                        <div className="flex items-center">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(task.id, task.completed)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    aria-label={`Marcar tarea "${task.title}" como ${task.completed ? 'pendiente' : 'completada'}`}
                                />
                                <h3 className={`ml-3 text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                    {task.title}
                                </h3>
                            </label>
                        </div>
                        {task.description && (
                            <p className="mt-2 text-sm text-gray-500">{task.description}</p>
                        )}
                        <p className="mt-2 text-xs text-gray-400">
                            Creada: {new Date(task.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={() => handleDelete(task.id)}
                        disabled={isDeleting === task.id}
                        className="ml-4 text-red-600 hover:text-red-800 disabled:opacity-50"
                        aria-label={`Eliminar tarea "${task.title}"`}
                    >
                        {isDeleting === task.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            ))}
        </div>
    );
} 