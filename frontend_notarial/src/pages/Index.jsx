import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  Send,
  Smartphone,
  Building2,
  Award,
  BookOpen
} from 'lucide-react';
import LandingNav from '../components/LandingNav';
import '../styles/index.css';

const Index = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío
    setEnviado(true);
  };

  return (
    <div className="landing-wrapper">
      <header className="hero">
        <LandingNav />
        <div className="hero-content">
          <h1 className="animate-fade-in">Excelencia en Gestión Notarial</h1>
          <p>Transformamos la seguridad jurídica tradicional en eficiencia digital para la escribanía moderna.</p>
          <a href="#registro" className="btn-primary">Solicitar Matrícula</a>
        </div>
      </header>

      {/* Sección Quiénes Somos */}
      <section className="about-section" id="quienes-somos">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="label">Nuestra Identidad</div>
              <h2>Comprometidos con la Fe Pública</h2>
              <p>
                Somos un equipo de profesionales apasionados por la tecnología y el derecho, 
                dedicados a desarrollar herramientas que fortalezcan la labor de los escribanos en Argentina.
              </p>
              <div className="about-values">
                <div className="value-item">
                  <Award className="text-emerald-500" />
                  <div>
                    <h4>Innovación Local</h4>
                    <p>Software diseñado específicamente para las normativas del Consejo Federal del Notariado Argentino.</p>
                  </div>
                </div>
                <div className="value-item">
                  <BookOpen className="text-emerald-500" />
                  <div>
                    <h4>Soporte Especializado</h4>
                    <p>Acompañamos tu transición digital con capacitación constante y asistencia técnica directa.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image-placeholder">
                {/* Aquí puedes poner una imagen institucional o un gráfico */}
                <div className="glass-effect-card">
                    <Scale size={80} strokeWidth={1} />
                    <span>Seguridad. Transparencia. Ética.</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Formulario de Registro */}
      <section id="registro" className="registration-section">
        <div className="form-container">
          {!enviado ? (
            <>
              <div className="form-header">
                <h2>Inscripción al Sistema</h2>
                <p>Completa tus datos profesionales para iniciar el proceso de alta.</p>
              </div>

              <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>Nombre</label>
                    <input type="text" required placeholder="Nombre" />
                  </div>
                  <div className="input-group">
                    <label>Apellido</label>
                    <input type="text" required placeholder="Apellido" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Correo Electrónico Profesional</label>
                  <input type="email" required placeholder="correo@ejemplo.com" />
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label><Building2 size={16} /> Empresa / Escribanía</label>
                    <input type="text" required placeholder="Nombre de la firma" />
                  </div>
                  <div className="input-group">
                    <label><Smartphone size={16} /> Celular de Contacto</label>
                    <input type="tel" required placeholder="+54 9 ..." />
                  </div>
                </div>

                <div className="captcha-placeholder">
                  <div className="captcha-box">
                    <input type="checkbox" id="captcha" required />
                    <label htmlFor="captcha">No soy un robot</label>
                    <div className="recaptcha-icon">
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
                        <span>reCAPTCHA</span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  Enviar Solicitud <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={64} className="text-emerald-500" />
              </div>
              <h2>¡Solicitud Enviada con Éxito!</h2>
              <p>
                Gracias por confiar en nosotros. Hemos recibido tu información correctamente. 
                Un asesor de cuentas se pondrá en contacto contigo en un plazo de 
                <strong> 24 a 48 horas hábiles</strong> para validar tu matrícula profesional.
              </p>
              <button onClick={() => setEnviado(false)} className="btn-link">Volver al inicio</button>
            </div>
          )}
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 NotarialPro — <strong>Augusto.log()</strong> | Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;