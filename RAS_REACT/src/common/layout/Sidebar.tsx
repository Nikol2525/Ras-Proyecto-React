import { NavLink } from 'react-router-dom';
import { useMensajes } from '../../context/MensajesContext';
import { useNotificaciones } from '../../context/NotificacionesContext';
import './Sidebar.css';

interface ItemMenu {
  ruta: string;
  etiqueta: string;
  icono: string;
  contador?: number;
}

interface SidebarProps {
  onItemClick: () => void;
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const { totalNoLeidos } = useMensajes();
  const { noLeidas } = useNotificaciones();

  const items: ItemMenu[] = [
    { ruta: '/inicio', etiqueta: 'Inicio', icono: '🏠' },
    { ruta: '/explorar', etiqueta: 'Explorar', icono: '🔎' },
    { ruta: '/mi-perfil', etiqueta: 'Mi perfil', icono: '👤' },
    { ruta: '/mis-trueques', etiqueta: 'Mis trueques', icono: '🔄' },
    { ruta: '/mis-publicaciones', etiqueta: 'Mis publicaciones', icono: '📋' },
    { ruta: '/mensajes', etiqueta: 'Mensajes', icono: '💬', contador: totalNoLeidos },
    { ruta: '/notificaciones', etiqueta: 'Notificaciones', icono: '🔔', contador: noLeidas },
    { ruta: '/pqr', etiqueta: 'PQR', icono: '📝' }
  ];

  return (
    <aside className="sidebar">
      <p className="sidebar-titulo">MENÚ</p>
      <nav>
        {items.map((item) => (
          <NavLink
            key={item.ruta}
            to={item.ruta}
            onClick={onItemClick}
            className={({ isActive }) => 'sidebar-item' + (isActive ? ' activo' : '')}
          >
            <span className="icono">{item.icono}</span>
            <span className="etiqueta">{item.etiqueta}</span>
            {!!item.contador && item.contador > 0 && <span className="contador">{item.contador}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
