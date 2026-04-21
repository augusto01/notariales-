import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RutaPrivada = ({ children }) => {
    const { auth, cargando } = useAuth();

    if (cargando) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-emerald-500">Cargando sistema...</div>;

    return auth ? children : <Navigate to="/login" />;
};

export default RutaPrivada;