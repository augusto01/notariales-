import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const LandingNav = () => {
  return (
    <nav className="landing-nav">
      <div className="logo">
        <Scale className="text-emerald-500" size={32} />
        <span>NotarialPro</span>
      </div>
      
      <div className="nav-links">
        <a href="#features" className="link-item">Servicios</a>
        <a href="#registro" className="link-item">Registrarse</a>
        <Link to="/login" className="btn-secondary-nav">
          Acceso Escribanos
        </Link>
      </div>
    </nav>
  );
};

export default LandingNav;