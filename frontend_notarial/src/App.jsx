import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import Login from './pages/Login';
import Home from './pages/Home';

const RutaProtegida = ({ children }) => {
    const { auth, cargando } = useAuth();
    if (cargando) return null; // O un spinner
    return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/home" element={
            <RutaProtegida>
              <Home />
            </RutaProtegida>
          } />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;