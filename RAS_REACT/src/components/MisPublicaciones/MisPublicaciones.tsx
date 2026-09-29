import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '../../common/shared/Badge';
import { Modal } from '../../common/shared/Modal';
import { usePublicaciones } from '../../context/PublicacionesContext';
import { useTrueques } from '../../context/TruequesContext';
import type { Publicacion, PropuestaRecibida, TipoPublicacion } from '../../types/publicacion';
import './MisPublicaciones.css';

type FiltroPub = 'todas' | 'activas' | 'conPropuestas' | 'pausadas' | 'cerradas';

export function MisPublicaciones() {
  const { misPublicaciones, stats, crearPublicacion, editar, pausar, reactivar, aceptarPropuesta, rechazarPropuesta } =
    usePublicaciones();
  const { crear } = useTrueques();
  const [searchParams] = useSearchParams();

  const [filtro, setFiltro] = useState<FiltroPub>('todas');

  const publicacionesFiltradas = useMemo<Publicacion[]>(() => {
    switch (filtro) {
      case 'activas':
        return misPublicaciones.filter((p) => p.estado === 'Activa');
      case 'conPropuestas':
        return misPublicaciones.filter((p) => p.propuestas.length > 0);
      case 'pausadas':
        return misPublicaciones.filter((p) => p.estado === 'Pausada');
      case 'cerradas':
        return misPublicaciones.filter((p) => p.estado === 'Cerrada');
      default:
        return misPublicaciones;
    }
  }, [misPublicaciones, filtro]);

  // ---- Modal: nueva publicación / editar ----
  const [modalNuevaAbierto, setModalNuevaAbierto] = useState(false);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [publicacionEditandoId, setPublicacionEditandoId] = useState('');
  const [tituloNueva, setTituloNueva] = useState('');
  const [descripcionNueva, setDescripcionNueva] = useState('');
  const [tipoNueva, setTipoNueva] = useState<TipoPublicacion>('Trueque');
  const [categoriaNueva, setCategoriaNueva] = useState('Uniformes');
  const [sedeNueva, setSedeNueva] = useState('Sede Kennedy');

  const abrirNuevaPublicacion = (): void => {
    setModoEdicion(false);
    setTituloNueva('');
    setDescripcionNueva('');
    setTipoNueva('Trueque');
    setCategoriaNueva('Uniformes');
    setSedeNueva('Sede Kennedy');
    setModalNuevaAbierto(true);
  };

  // Auto-abrir el modal si venimos del botón "+" de la barra inferior móvil
  useEffect(() => {
    if (searchParams.get('nueva')) {
      abrirNuevaPublicacion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const abrirEditar = (pub: Publicacion): void => {
    setModoEdicion(true);
    setPublicacionEditandoId(pub.id);
    setTituloNueva(pub.titulo);
    setDescripcionNueva(pub.descripcion);
    setTipoNueva(pub.tipo);
    setCategoriaNueva(pub.categoria);
    setSedeNueva(pub.sede);
    setModalNuevaAbierto(true);
  };

  const publicar = (): void => {
    if (!tituloNueva.trim()) return;
    if (modoEdicion) {
      editar(publicacionEditandoId, {
        titulo: tituloNueva,
        descripcion: descripcionNueva,
        tipo: tipoNueva,
        categoria: categoriaNueva,
        sede: sedeNueva
      });
    } else {
      crearPublicacion({
        titulo: tituloNueva,
        descripcion: descripcionNueva,
        tipo: tipoNueva,
        categoria: categoriaNueva,
        sede: sedeNueva
      });
    }
    setModalNuevaAbierto(false);
    setConfirmacionVisible(true);
    setTimeout(() => setConfirmacionVisible(false), 3200);
  };

  // ---- Modal: ver propuestas ----
  const [modalPropuestasAbierto, setModalPropuestasAbierto] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);

  const verPropuestas = (pub: Publicacion): void => {
    setPublicacionSeleccionada(pub);
    setModalPropuestasAbierto(true);
  };

  const onAceptarPropuesta = (pub: Publicacion, propuesta: PropuestaRecibida): void => {
    aceptarPropuesta(pub.id, propuesta.id);
    crear({
      ofreces: { icono: pub.icono, nombre: pub.titulo, categoria: pub.categoria },
      recibes: { icono: '📦', nombre: propuesta.ofrece, categoria: 'General' },
      contraparteNombre: propuesta.nombre,
      contraparteSede: pub.sede,
      contraparteIniciales: propuesta.iniciales,
      contraparteColor: propuesta.colorAvatar
    });
    setModalPropuestasAbierto(false);
  };

  const onRechazarPropuesta = (pub: Publicacion, propuesta: PropuestaRecibida): void => {
    rechazarPropuesta(pub.id, propuesta.id);
    const actualizada = misPublicaciones.find((p) => p.id === pub.id) ?? null;
    setPublicacionSeleccionada(
      actualizada ? { ...actualizada, propuestas: actualizada.propuestas.filter((pr) => pr.id !== propuesta.id) } : null
    );
  };

  return (
    <>
      <div className="container-page">
        <div className="header-flex">
          <div>
            <h1>Mis publicaciones</h1>
            <p className="text-muted">Gestiona tus artículos publicados en RAS</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={abrirNuevaPublicacion}>
            + Nueva publicación
          </button>
        </div>

        {confirmacionVisible && (
          <div className="confirmacion-toast">📦 {modoEdicion ? 'Publicación actualizada' : 'Publicación creada'}</div>
        )}

        <div className="card stats-bar">
          <div>
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{stats.activas}</strong>
            <span>Activas</span>
          </div>
          <div>
            <strong>{stats.conPropuestas}</strong>
            <span>Con propuestas</span>
          </div>
          <div>
            <strong>{stats.vistasSemana}</strong>
            <span>Vistas esta semana</span>
          </div>
        </div>

        <div className="tabs">
          <button type="button" className={filtro === 'todas' ? 'activo' : ''} onClick={() => setFiltro('todas')}>
            Todas ({stats.total})
          </button>
          <button type="button" className={filtro === 'activas' ? 'activo' : ''} onClick={() => setFiltro('activas')}>
            Activas ({stats.activas})
          </button>
          <button
            type="button"
            className={filtro === 'conPropuestas' ? 'activo' : ''}
            onClick={() => setFiltro('conPropuestas')}
          >
            Con propuestas ({stats.conPropuestas})
          </button>
          <button type="button" className={filtro === 'pausadas' ? 'activo' : ''} onClick={() => setFiltro('pausadas')}>
            Pausadas ({stats.pausadas})
          </button>
          <button type="button" className={filtro === 'cerradas' ? 'activo' : ''} onClick={() => setFiltro('cerradas')}>
            Cerradas ({stats.cerradas})
          </button>
        </div>

        <div className="lista-pubs">
          {publicacionesFiltradas.map((pub) => (
            <div className="card pub-row" key={pub.id}>
              <div className="pub-icono" style={{ background: pub.colorFondo }}>
                {pub.icono}
              </div>

              <div className="pub-info">
                <div className="pub-titulo-row">
                  <h3>{pub.titulo}</h3>
                  {pub.esNueva && <span className="badge badge-blue">NEW</span>}
                  <Badge estado={pub.tipo} />
                  <Badge estado={pub.estado} conPunto />
                </div>
                <p className="text-soft meta-line">
                  {pub.sede} · {pub.publicadaHace} · {pub.vistas} vistas · {pub.categoria}
                </p>
                {pub.estado === 'Activa' && (
                  <div className="progreso-wrap">
                    <div className="progreso-barra">
                      <div className="progreso-fill" style={{ width: `${pub.progreso}%` }} />
                    </div>
                    <span className="text-soft">
                      {pub.propuestas.length > 0 ? `Completado al ${pub.progreso}%` : 'Sin propuestas aún'}
                    </span>
                  </div>
                )}
              </div>

              <div className="pub-acciones">
                {pub.propuestas.length > 0 ? (
                  <>
                    <span className="propuestas-count">
                      {pub.propuestas.length} propuesta{pub.propuestas.length > 1 ? 's' : ''}
                    </span>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => verPropuestas(pub)}>
                      Ver propuestas
                    </button>
                  </>
                ) : (
                  pub.estado !== 'Cerrada' && <span className="text-soft">0 propuestas</span>
                )}

                {pub.estado === 'Cerrada' ? (
                  <>
                    <span className="text-soft">Finalizada</span>
                    <button type="button" className="btn-link" onClick={() => abrirEditar(pub)}>
                      Editar
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="btn-link" onClick={() => abrirEditar(pub)}>
                      Editar
                    </button>
                    {pub.estado === 'Activa' ? (
                      <button type="button" className="btn-link" onClick={() => pausar(pub.id)}>
                        Pausar
                      </button>
                    ) : (
                      pub.estado === 'Pausada' && (
                        <button type="button" className="btn-link reactivar" onClick={() => reactivar(pub.id)}>
                          Reactivar
                        </button>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {publicacionesFiltradas.length === 0 && (
            <div className="card vacio">No hay publicaciones en esta categoría todavía.</div>
          )}
        </div>

        <Link to="/inicio" className="btn btn-outline volver-btn">
          ← Volver
        </Link>
      </div>

      {modalNuevaAbierto && (
        <Modal
          titulo={modoEdicion ? 'Editar publicación' : 'Nueva publicación'}
          icono="📦"
          ancho={480}
          onCerrar={() => setModalNuevaAbierto(false)}
        >
          <div className="form-field">
            <label htmlFor="tituloNueva">Título del artículo</label>
            <input
              id="tituloNueva"
              type="text"
              value={tituloNueva}
              onChange={(e) => setTituloNueva(e.target.value)}
              placeholder="Ej: Uniforme SENA talla M"
            />
          </div>
          <div className="form-field">
            <label htmlFor="descripcionNueva">Descripción</label>
            <textarea
              id="descripcionNueva"
              rows={3}
              value={descripcionNueva}
              onChange={(e) => setDescripcionNueva(e.target.value)}
              placeholder="Describe el estado, características y detalles del artículo..."
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="tipoNueva">Tipo de publicación</label>
              <select id="tipoNueva" value={tipoNueva} onChange={(e) => setTipoNueva(e.target.value as TipoPublicacion)}>
                <option value="Trueque">Trueque</option>
                <option value="Donación">Donación</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="categoriaNueva">Categoría</label>
              <select id="categoriaNueva" value={categoriaNueva} onChange={(e) => setCategoriaNueva(e.target.value)}>
                <option>Uniformes</option>
                <option>Libros</option>
                <option>Equipos</option>
                <option>Ropa</option>
                <option>Herramientas</option>
                <option>Material</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="sedeNueva">Sede</label>
            <select id="sedeNueva" value={sedeNueva} onChange={(e) => setSedeNueva(e.target.value)}>
              <option>Sede Kennedy</option>
              <option>Sede Norte</option>
              <option>Sede Centro</option>
              <option>Sede Sur</option>
            </select>
          </div>
          <div className="modal-acciones">
            <button type="button" className="btn btn-outline" onClick={() => setModalNuevaAbierto(false)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={publicar}>
              {modoEdicion ? 'Guardar cambios' : 'Publicar artículo'}
            </button>
          </div>
        </Modal>
      )}

      {modalPropuestasAbierto && publicacionSeleccionada && (
        <Modal titulo="Propuestas recibidas" icono="🤝" ancho={480} onCerrar={() => setModalPropuestasAbierto(false)}>
          <p className="text-muted publicacion-ref">Publicación: {publicacionSeleccionada.titulo}</p>
          <div className="lista-propuestas">
            {publicacionSeleccionada.propuestas.map((p) => (
              <div className="propuesta-item" key={p.id}>
                <span className="avatar-mini" style={{ background: p.colorAvatar }}>
                  {p.iniciales}
                </span>
                <div className="propuesta-info">
                  <strong>{p.nombre}</strong>
                  <span className="text-muted">Ofrece: {p.ofrece}</span>
                </div>
                <div className="propuesta-acciones">
                  <Link to="/mensajes" className="btn btn-outline btn-sm">
                    💬 Chat
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onAceptarPropuesta(publicacionSeleccionada, p)}
                  >
                    ✓ Aceptar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onRechazarPropuesta(publicacionSeleccionada, p)}
                  >
                    ✕ Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
