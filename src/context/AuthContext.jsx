import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { setAuthToken, getAuthToken, removeAuthToken } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const token = getAuthToken();
            if (token) {
                setAuthToken(token);
                try {
                    const res = await api.get('/auth/me');
                    setUser(res.data);
                } catch (err) {
                    console.error("Erreur de chargement de l'utilisateur:", err);
                    removeAuthToken();
                    setUser(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            setUser(res.data);
            setAuthToken(res.data.token);
            navigate('/');
            return res.data;
        } catch (err) {
            console.error("Erreur de connexion:", err.response?.data?.message || err.message);
            throw err.response?.data?.message || 'Échec de la connexion';
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await api.post('/auth/register', { name, email, password });
            setUser(res.data);
            setAuthToken(res.data.token);
            navigate('/');
            return res.data;
        } catch (err) {
            console.error("Erreur d'inscription:", err.response?.data?.message || err.message);
            throw err.response?.data?.message || "Échec de l'inscription";
        }
    };

    const logout = () => {
        removeAuthToken();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
};