import React from 'react';
import { useAuth } from '../context/authContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Scale
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import '../styles/dashboard.css';

const Home = () => {
  const { cerrarSesion } = useAuth();

  return (
    <div className="dashboard-layout">
      {/* Sidebar Fija */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Scale size={32} />
          <span>Notariales</span>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <Users size={20} />
            <span>Clientes</span>
          </a>
          <a href="#" className="nav-item">
            <FileText size={20} />
            <span>Escrituras</span>
          </a>
          <a href="#" className="nav-item">
            <Settings size={20} />
            <span>Configuración</span>
          </a>
        </nav>

        <button onClick={cerrarSesion} className="btn-logout">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Llamada al Navbar - Maneja el saludo y los datos del perfil */}
        <Navbar />

        <header className="header-section">
          <div>
            <h1>Panel de Control</h1>
            <p style={{ color: '#94a3b8' }}>Bienvenido de nuevo al sistema.</p>
          </div>
        </header>

        {/* Stats Rápidas */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Clientes Totales</h3>
            <div className="value">124</div>
          </div>
          <div className="stat-card">
            <h3>Trámites Pendientes</h3>
            <div className="value">12</div>
          </div>
          <div className="stat-card">
            <h3>Actas del Mes</h3>
            <div className="value">45</div>
          </div>
        </div>

        {/* Sección de Actividad Reciente */}
        <section className="recent-activity">
          <h2 style={{ marginBottom: '1.5rem' }}>Actividad Reciente</h2>
          <div className="activity-placeholder">
            <p style={{ color: '#94a3b8' }}>Cargando flujos de trabajo pendientes...</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;