import api from '../api/api';

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');

        delete api.defaults.headers.common['Authorization'];
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const removeAuthToken = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
};