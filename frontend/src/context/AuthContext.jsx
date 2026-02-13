import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            // Check for token in URL (Google Auth redirect)
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get('token');

            if (urlToken) {
                localStorage.setItem('token', urlToken);
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    setUser(res.data);
                } catch (err) {
                    console.error(err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
            return res.data;
        } catch (error) {
            throw error.response?.data?.message || error.message || 'Login failed';
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await api.post('/auth/register', { username, email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
            return res.data;
        } catch (error) {
            throw error.response?.data?.message || error.message || 'Registration failed';
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const googleLogin = () => {
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        window.location.href = `${baseURL}/auth/google`;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, googleLogin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
