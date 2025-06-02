import axios from 'axios';
import { getAuthToken } from '../utils/auth';

// Récupérer l'URL de l'API depuis les variables d'environnement de Vite
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;