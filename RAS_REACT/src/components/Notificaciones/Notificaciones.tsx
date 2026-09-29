import { Link, useNavigate } from 'react-router-dom';
import { useNotificaciones } from '../../context/NotificacionesContext';
import { useMensajes } from '../../context/MensajesContext';
import type { Notificacion } from '../../types/notificacion';
import './Notificaciones.css';

export function Notificaciones() {
  const { notificaciones, noLeidas, marcarLeida, marcarTodasLeidas } = useNotificaciones();
  const { marcarLeida: marcarConversacionLeida } = useMensajes();
  const navigate = useNavigate();

  const abrir = (n: Notificacion): void => {
    marcarLeida(n.id);
    if (n.conversacionId) {
      marcarConversacionLeida(n.conversacionId);
      navigate('/mensajes');
    } else if (n.truequeId) {
      navigate('/mis-trueques');
    } else if (n.publicacionId) {
      navigate('/mis-publicaciones');
    }
  };

  return (
    <div className="container-page">
      <div className="header-flex">
        <div>
          <h1>Notificaciones</h1>
          <p className="text-muted">Mantente al tanto de tu actividad en RAS</p>
        </div>
        {noLeidas > 0 && (
          <button type="button" className="btn btn-outline" onClick={marcarTodasLeidas}>
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="lista-notificaciones">
        {notificaciones.map((n) => (
          <button
            key={n.id}
            type="button"
            className={'card notificacion-item' + (!n.leida ? ' no-leida' : '')}
            onClick={() => abrir(n)}
          >
            <span className="notif-icono">{n.icono}</span>
            <div className="notif-info">
              <strong>{n.titulo}</strong>
              <p className="text-muted">{n.descripcion}</p>
              <span className="text-soft">{n.fecha}</span>
            </div>
            {!n.leida && <span className="punto-nueva" />}
          </button>
        ))}

        {notificaciones.length === 0 && <div className="card vacio">No tienes notificaciones por ahora.</div>}
      </div>

      <Link to="/inicio" className="btn btn-outline volver-btn">
        ← Volver
      </Link>
    </div>
  );
}
