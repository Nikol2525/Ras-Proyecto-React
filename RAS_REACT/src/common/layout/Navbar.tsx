import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotificaciones } from '../../context/NotificacionesContext';
import './Navbar.css';

interface NavbarProps {
  onMenuToggle: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  const { usuario, cerrarSesion } = useAuth();
  const { noLeidas } = useNotificaciones();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const salir = (): void => {
    setMenuAbierto(false);
    cerrarSesion();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="btn-hamburguesa" type="button" onClick={onMenuToggle} aria-label="Abrir menú">
          ☰
        </button>
        <Link to="/inicio" className="logo">
          RAS
        </Link>
      </div>

      <div className="navbar-right">
        {noLeidas > 0 && <span className="punto-alerta" />}
        <div className="avatar-wrapper">
          <button className="avatar-btn" type="button" onClick={() => setMenuAbierto((v) => !v)}>
            {usuario?.iniciales}
          </button>

          {menuAbierto && (
            <div className="dropdown">
              <Link to="/mi-perfil" onClick={() => setMenuAbierto(false)}>
                👤 Mi perfil
              </Link>
              <Link to="/notificaciones" onClick={() => setMenuAbierto(false)}>
                🔔 Notificaciones
              </Link>
              <Link to="/pqr" onClick={() => setMenuAbierto(false)}>
                ❓ Ayuda / Soporte
              </Link>
              <button type="button" className="dropdown-salir" onClick={salir}>
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </div>
        <button className="btn-salir" type="button" onClick={salir}>
          Salir
        </button>
      </div>
    </header>
  );
}
