import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '@/utils/auth';
import { isAuthenticated } from '@/utils/auth';

export default function Navbar() {
    const router = useRouter();
    const authenticated = isAuthenticated();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        Gestor de Tareas
                    </Link>

                    <div className="flex items-center space-x-4">
                        {authenticated ? (
                            <>
                                <Link
                                    href="/tasks"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        router.pathname === '/tasks'
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Mis Tareas
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        router.pathname === '/login'
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href="/register"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        router.pathname === '/register'
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 