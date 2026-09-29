import { NavLink, useNavigate } from 'react-router-dom';
import { useMensajes } from '../../context/MensajesContext';
import './BottomNav.css';

export function BottomNav() {
  const { totalNoLeidos } = useMensajes();
  const navigate = useNavigate();

  const irAPublicar = (): void => {
    navigate('/mis-publicaciones?nueva=1');
  };

  return (
    <nav className="bottom-nav">
      <NavLink to="/inicio" className={({ isActive }) => 'item' + (isActive ? ' activo' : '')}>
        <span className="icono">🏠</span>
        <span className="etiqueta">Inicio</span>
      </NavLink>
      <NavLink to="/explorar" className={({ isActive }) => 'item' + (isActive ? ' activo' : '')}>
        <span className="icono">🔎</span>
        <span className="etiqueta">Explorar</span>
      </NavLink>
      <button type="button" className="item item-publicar" onClick={irAPublicar}>
        <span className="icono-publicar">+</span>
      </button>
      <NavLink to="/mensajes" className={({ isActive }) => 'item' + (isActive ? ' activo' : '')}>
        <span className="icono">💬</span>
        {totalNoLeidos > 0 && <span className="punto-alerta" />}
        <span className="etiqueta">Mensajes</span>
      </NavLink>
      <NavLink to="/mi-perfil" className={({ isActive }) => 'item' + (isActive ? ' activo' : '')}>
        <span className="icono">👤</span>
        <span className="etiqueta">Perfil</span>
      </NavLink>
    </nav>
  );
}
