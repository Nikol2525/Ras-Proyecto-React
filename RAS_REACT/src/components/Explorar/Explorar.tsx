import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '../../common/shared/Badge';
import { Modal } from '../../common/shared/Modal';
import { usePublicaciones } from '../../context/PublicacionesContext';
import { useTrueques } from '../../context/TruequesContext';
import { useMensajes } from '../../context/MensajesContext';
import { useAuth } from '../../context/AuthContext';
import type { Publicacion } from '../../types/publicacion';
import './Explorar.css';

type TipoFiltro = 'todos' | 'Trueque' | 'Donación';

const CATEGORIAS = ['Todas', 'Uniformes', 'Libros', 'Equipos', 'Ropa', 'Herramientas', 'Material'];
const SEDES = ['Todas', 'Sede Kennedy', 'Sede Norte', 'Sede Centro', 'Sede Sur'];

export function Explorar() {
  const { misPublicaciones, publicacionesComunidad, agregarPropuestaComunidad } = usePublicaciones();
  const { crear } = useTrueques();
  const { iniciarConversacion } = useMensajes();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<TipoFiltro>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroSede, setFiltroSede] = useState('Todas');

  const todasLasPublicaciones = useMemo<Publicacion[]>(
    () => [...publicacionesComunidad, ...misPublicaciones.filter((p) => p.estado === 'Activa')],
    [publicacionesComunidad, misPublicaciones]
  );

  const resultados = useMemo<Publicacion[]>(() => {
    const texto = busqueda.trim().toLowerCase();
    return todasLasPublicaciones.filter((p) => {
      const coincideTexto =
        !texto ||
        p.titulo.toLowerCase().includes(texto) ||
        p.descripcion.toLowerCase().includes(texto) ||
        p.categoria.toLowerCase().includes(texto);
      const coincideTipo = filtroTipo === 'todos' || p.tipo === filtroTipo;
      const coincideCategoria = filtroCategoria === 'Todas' || p.categoria === filtroCategoria;
      const coincideSede = filtroSede === 'Todas' || p.sede === filtroSede;
      return coincideTexto && coincideTipo && coincideCategoria && coincideSede;
    });
  }, [todasLasPublicaciones, busqueda, filtroTipo, filtroCategoria, filtroSede]);

  const limpiarFiltros = (): void => {
    setBusqueda('');
    setFiltroTipo('todos');
    setFiltroCategoria('Todas');
    setFiltroSede('Todas');
  };

  // ---- Modal detalle / proponer trueque ----
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
  const [vistaModal, setVistaModal] = useState<'detalle' | 'exito'>('detalle');
  const [ofrezcoTitulo, setOfrezcoTitulo] = useState('');
  const [mensajePropuesta, setMensajePropuesta] = useState('');

  const misPublicacionesActivas = misPublicaciones.filter((p) => p.estado === 'Activa');

  const esPropia = (pub: Publicacion): boolean => misPublicaciones.some((p) => p.id === pub.id);

  const abrirDetalle = (pub: Publicacion): void => {
    setPublicacionSeleccionada(pub);
    setVistaModal('detalle');
    setOfrezcoTitulo(misPublicacionesActivas[0]?.titulo ?? '');
    setMensajePropuesta(`Hola! Me interesa tu publicación "${pub.titulo}". ¿Seguimos hablando por aquí?`);
  };

  const cerrarModal = (): void => setPublicacionSeleccionada(null);

  const enviarPropuesta = (): void => {
    const pub = publicacionSeleccionada;
    if (!pub || !usuario || !ofrezcoTitulo) return;

    agregarPropuestaComunidad(pub.id, {
      id: 'pr-' + Date.now(),
      nombre: usuario.nombre,
      iniciales: usuario.iniciales,
      colorAvatar: usuario.colorAvatar,
      ofrece: ofrezcoTitulo
    });

    crear({
      ofreces: { icono: '📦', nombre: ofrezcoTitulo, categoria: 'General' },
      recibes: { icono: pub.icono, nombre: pub.titulo, categoria: pub.categoria },
      contraparteNombre: pub.autorNombre,
      contraparteSede: pub.sede,
      contraparteIniciales: pub.autorIniciales,
      contraparteColor: pub.autorColor
    });

    iniciarConversacion({
      contactoNombre: pub.autorNombre,
      contactoIniciales: pub.autorIniciales,
      contactoColor: pub.autorColor,
      contactoSede: pub.sede,
      etiquetaArticulo: pub.titulo,
      intercambioArticulo: `${ofrezcoTitulo} a cambio de: ${pub.titulo}`,
      mensajeInicial: mensajePropuesta
    });

    setVistaModal('exito');
  };

  const irAMisTrueques = (): void => {
    cerrarModal();
    navigate('/mis-trueques');
  };

  const irAMensajes = (): void => {
    cerrarModal();
    navigate('/mensajes');
  };

  return (
    <>
      <div className="container-page">
        <h1>Explorar artículos</h1>
        <p className="text-muted subtitulo">Busca y filtra artículos disponibles en toda la comunidad RAS</p>

        <div className="card panel-filtros">
          <div className="form-field buscador-field">
            <label htmlFor="busqueda">Buscar artículo</label>
            <input
              id="busqueda"
              type="text"
              placeholder="Ej: uniforme, libro, calculadora..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filtros-fila">
            <div className="form-field">
              <label htmlFor="filtroCategoria">Categoría</label>
              <select id="filtroCategoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="filtroSede">Sede</label>
              <select id="filtroSede" value={filtroSede} onChange={(e) => setFiltroSede(e.target.value)}>
                {SEDES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="filtroTipo">Tipo</label>
              <select id="filtroTipo" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as TipoFiltro)}>
                <option value="todos">Todos</option>
                <option value="Trueque">Trueque</option>
                <option value="Donación">Donación</option>
              </select>
            </div>
            <button type="button" className="btn btn-outline btn-limpiar" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </div>
        </div>

        <p className="text-soft contador-resultados">Resultados ({resultados.length})</p>

        <div className="grid-publicaciones">
          {resultados.map((pub) => (
            <article className="card pub-card" key={pub.id} onClick={() => abrirDetalle(pub)}>
              <div className="pub-imagen" style={{ background: pub.colorFondo }}>
                {pub.icono}
              </div>
              <div className="pub-body">
                <h3>{pub.titulo}</h3>
                <div className="pub-meta">
                  <Badge estado={pub.tipo} />
                  <span className="text-soft">{pub.sede}</span>
                </div>
                <div className="pub-footer">
                  <span className="autor">
                    <span className="avatar-mini" style={{ background: pub.autorColor }}>
                      {pub.autorIniciales}
                    </span>
                    {pub.autorNombre}
                  </span>
                  <span className="link-ver">Ver</span>
                </div>
              </div>
            </article>
          ))}

          {resultados.length === 0 && <div className="card vacio">No se encontraron artículos con esos filtros.</div>}
        </div>

        <Link to="/inicio" className="btn btn-outline volver-btn">
          ← Volver
        </Link>
      </div>

      {publicacionSeleccionada && (
        <Modal titulo={publicacionSeleccionada.titulo} icono={publicacionSeleccionada.icono} ancho={480} onCerrar={cerrarModal}>
          {vistaModal === 'detalle' ? (
            <>
              <div className="detalle-meta">
                <Badge estado={publicacionSeleccionada.tipo} />
                <Badge estado={publicacionSeleccionada.estado} conPunto />
                <span className="text-soft">
                  {publicacionSeleccionada.sede} · {publicacionSeleccionada.categoria}
                </span>
              </div>
              <p className="detalle-descripcion">{publicacionSeleccionada.descripcion}</p>
              <div className="detalle-autor">
                <span className="avatar-mini" style={{ background: publicacionSeleccionada.autorColor }}>
                  {publicacionSeleccionada.autorIniciales}
                </span>
                <div>
                  <strong>{publicacionSeleccionada.autorNombre}</strong>
                  <span className="text-soft d-block">
                    {publicacionSeleccionada.publicadaHace} · {publicacionSeleccionada.vistas} vistas
                  </span>
                </div>
              </div>

              {esPropia(publicacionSeleccionada) ? (
                <>
                  <div className="info-caja">
                    <strong>ℹ️ Esta es tu publicación</strong>
                    <p>Gestiona sus propuestas desde "Mis publicaciones".</p>
                  </div>
                  <div className="modal-acciones">
                    <Link to="/mis-publicaciones" className="btn btn-primary" onClick={cerrarModal}>
                      Ir a mis publicaciones
                    </Link>
                  </div>
                </>
              ) : misPublicacionesActivas.length === 0 ? (
                <>
                  <div className="info-caja">
                    <strong>⚠️ Aún no tienes publicaciones activas</strong>
                    <p>Publica un artículo para poder proponer un trueque a cambio.</p>
                  </div>
                  <div className="modal-acciones">
                    <Link to="/mis-publicaciones" className="btn btn-primary" onClick={cerrarModal}>
                      Crear publicación
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="titulo-propuesta">🤝 Proponer trueque</h4>
                  <div className="form-field">
                    <label htmlFor="ofrezcoTitulo">¿Qué ofreces a cambio?</label>
                    <select id="ofrezcoTitulo" value={ofrezcoTitulo} onChange={(e) => setOfrezcoTitulo(e.target.value)}>
                      {misPublicacionesActivas.map((mp) => (
                        <option key={mp.id} value={mp.titulo}>
                          {mp.titulo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="mensajePropuesta">Mensaje inicial</label>
                    <textarea
                      id="mensajePropuesta"
                      rows={3}
                      value={mensajePropuesta}
                      onChange={(e) => setMensajePropuesta(e.target.value)}
                    />
                  </div>
                  <div className="modal-acciones">
                    <button type="button" className="btn btn-outline" onClick={cerrarModal}>
                      Cancelar
                    </button>
                    <button type="button" className="btn btn-primary" onClick={enviarPropuesta}>
                      Enviar propuesta
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="confirmacion-exito">
              <span className="icono-exito">✅</span>
              <h3>¡Propuesta enviada!</h3>
              <p className="text-muted">
                Se creó un chat y un nuevo trueque en negociación con {publicacionSeleccionada.autorNombre}.
              </p>
              <div className="modal-acciones acciones-centradas">
                <button type="button" className="btn btn-outline" onClick={irAMensajes}>
                  💬 Ver chat
                </button>
                <button type="button" className="btn btn-primary" onClick={irAMisTrueques}>
                  Ver mis trueques
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
