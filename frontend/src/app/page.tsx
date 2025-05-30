import Link from 'next/link';

export default function Home() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Bienvenido al Gestor de Tareas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                Organiza tus tareas de manera eficiente y mantén un seguimiento de tus actividades diarias.
            </p>
            <div className="space-x-4">
                <Link
                    href="/login"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700"
                >
                    Iniciar Sesión
                </Link>
                <Link
                    href="/register"
                    className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-medium border border-indigo-600 hover:bg-indigo-50"
                >
                    Registrarse
                </Link>
            </div>
        </div>
    );
} 