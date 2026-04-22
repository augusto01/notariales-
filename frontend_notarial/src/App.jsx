import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Index from './pages/Index'; // Tu nueva Landing Page

const RutaProtegida = ({ children }) => {
    const { auth, cargando } = useAuth();
    if (cargando) return <div className="loading-screen">Cargando...</div>; 
    return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta Pública: Landing Page */}
          <Route path="/" element={<Index />} />

          {/* Ruta de Acceso */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas Privadas */}
          <Route path="/home" element={
            <RutaProtegida>
              <Home />
            </RutaProtegida>
          } />

          {/* Redirección por defecto al Index si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;