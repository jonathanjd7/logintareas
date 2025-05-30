import { useState } from 'react';
import { toast } from 'react-toastify';

interface TaskFormProps {
    onSubmit: (title: string, description: string) => Promise<void>;
    initialTitle?: string;
    initialDescription?: string;
    submitText?: string;
}

export default function TaskForm({
    onSubmit,
    initialTitle = '',
    initialDescription = '',
    submitText = 'Crear Tarea'
}: TaskFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            toast.error('El título es requerido');
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit(title, description);
            setTitle('');
            setDescription('');
            toast.success('Tarea guardada exitosamente');
        } catch (error) {
            toast.error('Error al guardar la tarea');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-xl font-medium text-gray-700">
                    Título
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                    placeholder="Título de la tarea"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-xl font-medium text-gray-700">
                    Descripción
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                    placeholder="Descripción de la tarea"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {isSubmitting ? 'Guardando...' : submitText}
            </button>
        </form>
    );
} 