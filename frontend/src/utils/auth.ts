import Cookies from 'js-cookie';
import { authAPI } from './api';
import { AxiosError } from 'axios';

export const setAuthToken = (token: string) => {
    Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' }); // Expira en 1 día, seguro y SameSite estricto
};

export const removeAuthToken = () => {
    Cookies.remove('token');
};

export const getAuthToken = () => {
    return Cookies.get('token');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const login = async (username: string, password: string) => {
    try {
        const response = await authAPI.login(username, password);
        setAuthToken(response.token);
        return response;
    } catch (error: unknown) {
        console.error('Error en login:', error);

        if (typeof error === 'object' && error !== null && 'isAxiosError' in error && error.isAxiosError) {
            const axiosError = error as AxiosError;
            console.error('Respuesta del servidor (login):', axiosError.response?.data);
        }

        throw error;
    }
};

export const register = async (username: string, password: string) => {
    try {
        const response = await authAPI.register(username, password);
        return response;
    } catch (error: unknown) {
        console.error('Error en registro:', error);

        if (typeof error === 'object' && error !== null && 'isAxiosError' in error && error.isAxiosError) {
            const axiosError = error as AxiosError;
            console.error('Respuesta del servidor (registro):', axiosError.response?.data);
        }

        throw error;
    }
};

export const logout = () => {
    removeAuthToken();
    window.location.href = '/login';
}; 