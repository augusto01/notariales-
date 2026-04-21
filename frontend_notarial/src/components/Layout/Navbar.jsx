import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { 
  User, 
  ChevronDown, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  CircleDot,
  Settings
} from 'lucide-react';

const Navbar = () => {
  const { obtenerPerfil, usuario } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = async () => {
    if (!usuario && !isOpen) await obtenerPerfil();
    setIsOpen(!isOpen);
  };

  // Lógica de Licencia (Asumiendo que viene en el objeto usuario)
  const isLicenseActive = usuario?.licenciaActiva ?? true; 

  return (
    <nav className="navbar-container" ref={menuRef}>
      <div className="nav-breadcrumb">
        <span className="text-slate-500">Sistema</span>
        <span className="separator">/</span>
        <span className="text-white font-medium">Dashboard</span>
      </div>

      <div className="nav-profile-section">
        {/* Indicador de Licencia Rápido */}
        <div className={`license-pill ${isLicenseActive ? 'active' : 'expired'}`}>
          <CircleDot size={12} />
          {isLicenseActive ? 'Licencia Activa' : 'Licencia Expirada'}
        </div>

        {/* Botón de Perfil */}
        <button className={`profile-trigger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="avatar-circle">
            <User size={20} />
          </div>
          <div className="profile-info-brief">
            <span className="user-name-text">{usuario?.nombre || 'Cargando...'}</span>
            <span className="user-role-text">{usuario?.role || 'Oficialía'}</span>
          </div>
          <ChevronDown size={16} className={`chevron ${isOpen ? 'rotate' : ''}`} />
        </button>

        {/* Menú Desplegable Profesional */}
        {isOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <p className="header-label">Información de Cuenta</p>
            </div>
            
            <div className="dropdown-content">
              <div className="info-row">
                <Mail size={16} className="text-slate-500" />
                <span>{usuario?.email}</span>
              </div>
              <div className="info-row">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Rango: <strong>{usuario?.role || 'Escribano'}</strong></span>
              </div>
              <div className="info-row">
                <CreditCard size={16} className={isLicenseActive ? 'text-emerald-500' : 'text-red-500'} />
                <span>Estado: <strong className={isLicenseActive ? 'text-emerald-400' : 'text-red-400'}>
                  {isLicenseActive ? 'Suscripción Premium' : 'Requiere Renovación'}
                </strong></span>
              </div>
            </div>

            <div className="dropdown-divider"></div>
            
            <button className="dropdown-action">
              <Settings size={16} />
              Configurar Perfil
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;