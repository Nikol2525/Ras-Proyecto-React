import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../../common/shared/Modal';
import { useMensajes } from '../../context/MensajesContext';
import './Mensajes.css';

type FiltroConv = 'todos' | 'noLeidos';

export function Mensajes() {
  const { conversaciones, marcarLeida, enviarMensaje } = useMensajes();
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState<FiltroConv>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [conversacionActivaId, setConversacionActivaId] = useState<string>(conversaciones[0]?.id ?? '');
  const [mostrarChatMovil, setMostrarChatMovil] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [modalPerfilAbierto, setModalPerfilAbierto] = useState(false);

  const conversacionesFiltradas = useMemo(() => {
    let lista = conversaciones;
    if (filtro === 'noLeidos') {
      lista = lista.filter((c) => c.noLeidos > 0);
    }
    const texto = busqueda.trim().toLowerCase();
    if (texto) {
      lista = lista.filter(
        (c) =>
          c.contactoNombre.toLowerCase().includes(texto) ||
          c.etiquetaArticulo.toLowerCase().includes(texto) ||
          c.ultimoMensaje.toLowerCase().includes(texto)
      );
    }
    return lista;
  }, [conversaciones, filtro, busqueda]);

  const conversacionActiva = conversaciones.find((c) => c.id === conversacionActivaId);

  const seleccionar = (id: string): void => {
    setConversacionActivaId(id);
    marcarLeida(id);
    setMostrarChatMovil(true);
  };

  const enviar = (e: FormEvent): void => {
    e.preventDefault();
    const texto = nuevoMensaje.trim();
    if (!texto || !conversacionActiva) return;
    enviarMensaje(conversacionActiva.id, texto);
    setNuevoMensaje('');
  };

  const verIntercambio = (): void => {
    void navigate('/mis-trueques');
  };

  return (
    <>
      <div className="mensajes-layout">
        <aside className={'lista-conversaciones' + (mostrarChatMovil ? ' oculta-movil' : '')}>
          <div className="lista-header">
            <h2>Mensajes</h2>
            <input
              type="text"
              placeholder="Buscar conversación..."
              className="buscador"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="tabs">
              <button type="button" className={filtro === 'todos' ? 'activo' : ''} onClick={() => setFiltro('todos')}>
                Todos
              </button>
              <button
                type="button"
                className={filtro === 'noLeidos' ? 'activo' : ''}
                onClick={() => setFiltro('noLeidos')}
              >
                No leídos
              </button>
            </div>
          </div>

          <div className="conversaciones">
            {conversacionesFiltradas.map((c) => (
              <button
                key={c.id}
                type="button"
                className={'conversacion-item' + (c.id === conversacionActivaId ? ' activa' : '')}
                onClick={() => seleccionar(c.id)}
              >
                <span className="avatar-mini" style={{ background: c.contactoColor }}>
                  {c.contactoIniciales}
                </span>
                <div className="conversacion-info">
                  <div className="conversacion-top">
                    <strong>{c.contactoNombre}</strong>
                    <span className="text-soft">{c.hora}</span>
                  </div>
                  <p className="text-muted ultimo-msj">{c.ultimoMensaje}</p>
                  <span className="etiqueta-articulo">🏷️ {c.etiquetaArticulo}</span>
                </div>
                {c.noLeidos > 0 && <span className="badge-no-leidos">{c.noLeidos}</span>}
              </button>
            ))}
            {conversacionesFiltradas.length === 0 && (
              <div className="vacio-conversaciones text-soft">No se encontraron conversaciones.</div>
            )}
          </div>
        </aside>

        <section className={'panel-chat' + (mostrarChatMovil ? ' visible-movil' : '')}>
          {conversacionActiva ? (
            <>
              <header className="chat-header">
                <button type="button" className="btn-volver-movil" onClick={() => setMostrarChatMovil(false)}>
                  ←
                </button>
                <div className="chat-header-info" onClick={() => setModalPerfilAbierto(true)}>
                  <strong>{conversacionActiva.contactoNombre}</strong>
                  <span className="text-soft">
                    {conversacionActiva.enLinea ? '● En línea' : conversacionActiva.ultimaConexion} ·{' '}
                    {conversacionActiva.contactoPrograma} — {conversacionActiva.contactoSede}
                  </span>
                </div>
                <div className="chat-header-acciones">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setModalPerfilAbierto(true)}>
                    Ver perfil
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" onClick={verIntercambio}>
                    Ver intercambio
                  </button>
                </div>
              </header>

              <div className="intercambio-relacionado">
                Intercambio relacionado: <strong>{conversacionActiva.intercambioArticulo}</strong>
                <span className="badge badge-blue">{conversacionActiva.intercambioEstado}</span>
              </div>

              <div className="chat-mensajes">
                <span className="separador-fecha">Hoy</span>
                {conversacionActiva.mensajes.map((m) => (
                  <div className={'mensaje-fila' + (m.propio ? ' propio' : '')} key={m.id}>
                    {!m.propio && (
                      <span className="avatar-mini" style={{ background: conversacionActiva.contactoColor }}>
                        {conversacionActiva.contactoIniciales}
                      </span>
                    )}
                    <div className="burbuja">
                      <p>{m.texto}</p>
                      <span className="hora-msj">{m.hora}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="chat-input" onSubmit={enviar}>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                />
                <button type="submit" className="btn-enviar" aria-label="Enviar">
                  ➤
                </button>
              </form>
            </>
          ) : (
            <div className="chat-vacio">Selecciona una conversación para comenzar a chatear.</div>
          )}
        </section>
      </div>

      <div className="container-page volver-wrap">
        <Link to="/inicio" className="btn btn-outline">
          ← Volver
        </Link>
      </div>

      {modalPerfilAbierto && conversacionActiva && (
        <Modal titulo="Perfil del chat" icono="👤" ancho={360} onCerrar={() => setModalPerfilAbierto(false)}>
          <div className="perfil-chat-modal">
            <span className="avatar-grande" style={{ background: conversacionActiva.contactoColor }}>
              {conversacionActiva.contactoIniciales}
            </span>
            <h3>{conversacionActiva.contactoNombre}</h3>
            <p className="text-muted">{conversacionActiva.contactoPrograma}</p>
            <p className="text-soft">{conversacionActiva.contactoSede}</p>
            <p className="estado-conexion">
              {conversacionActiva.enLinea ? '● En línea' : conversacionActiva.ultimaConexion}
            </p>
            <div className="intercambio-mini">
              <strong>Intercambio relacionado</strong>
              <p>{conversacionActiva.intercambioArticulo}</p>
              <span className="badge badge-blue">{conversacionActiva.intercambioEstado}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
