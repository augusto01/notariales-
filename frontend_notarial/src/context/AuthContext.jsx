import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    // URL base de tu API (Asegurate de que el puerto coincida con tu backend)
// En AuthContext.jsx
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000/api';
    useEffect(() => {
        const autenticarUsuario = () => {
            const token = localStorage.getItem('token');
            if (token) {
                setAuth(true);
            }
            setCargando(false);
        };
        autenticarUsuario();
    }, []);

    // Función de Login
    const login = async (credenciales) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credenciales),
                mode: 'cors' // Asegura que se permita CORS para solicitudes entre dominios
            });

            const data = await response.json();

            if (!response.ok) {
                return { ok: false, msg: data.msg || 'Credenciales incorrectas' };
            }

            localStorage.setItem('token', data.token);
            setAuth(true);
            return { ok: true };

        } catch (error) {
            console.error("Error en login:", error);
            return { ok: false, msg: 'Error de conexión con el servidor' };
        }
    };

    // Función para obtener datos del usuario logueado
    const obtenerPerfil = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/auth/perfil`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setUsuario(data);
                return { ok: true, data };
            } else {
                // Si el token es inválido o expiró, cerramos sesión
                cerrarSesion();
                return { ok: false, msg: 'Sesión expirada' };
            }
        } catch (error) {
            console.error("Error al obtener perfil:", error);
            return { ok: false, msg: 'No se pudo obtener el perfil' };
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setUsuario(null);
        setAuth(false);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                auth, 
                usuario, 
                login, 
                obtenerPerfil, 
                cerrarSesion, 
                cargando 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar dentro de un AuthProvider');
    }
    return context;
};