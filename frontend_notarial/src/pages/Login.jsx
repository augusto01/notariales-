import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Importamos el CSS puro

const Login = () => {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const resultado = await login(credenciales);
    console.log("Resultado del login:", resultado); // Agregá esto para debuguear
    
    if (resultado.ok) {
        navigate('/home');
    } else {
        setError(resultado.msg);
        setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="bg-glow" style={{ top: '-10%', left: '-10%' }} />
      <div className="bg-glow" style={{ bottom: '-10%', right: '-10%' }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
      >
        <div className="login-header">
          <div className="icon-wrapper">
            <Scale size={36} />
          </div>
          <h2>Notariales</h2>
          <p>Gestión de Escribanía Digital</p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="error-alert"
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-group">
            <label>Email Profesional</label>
            <div className="input-wrapper">
              <input 
                type="email"
                className="login-input"
                placeholder="ejemplo@escribania.com"
                required
                disabled={loading}
                onChange={e => setCredenciales({...credenciales, email: e.target.value})}
              />
              <Mail className="input-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <input 
                type="password"
                className="login-input"
                placeholder="••••••••"
                required
                disabled={loading}
                onChange={e => setCredenciales({...credenciales, password: e.target.value})}
              />
              <Lock className="input-icon" size={20} />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Entrar al Sistema
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;