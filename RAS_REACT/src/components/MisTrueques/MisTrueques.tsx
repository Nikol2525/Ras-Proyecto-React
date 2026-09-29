import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../common/shared/Badge';
import { Modal } from '../../common/shared/Modal';
import { useTrueques } from '../../context/TruequesContext';
import { useResenas } from '../../context/ResenasContext';
import type { Trueque } from '../../types/trueque';
import './MisTrueques.css';

type FiltroTrueque = 'todos' | 'enCurso' | 'negociando' | 'completados' | 'cancelados';
type EstadoPaso = 'hecho' | 'actual' | 'pendiente';

const PASOS = ['Propuesta enviada', 'Aceptada', 'Punto de encuentro', 'Evidencia', 'Completado'];

function estadoPaso(t: Trueque, indice: number): EstadoPaso {
  const paso = indice + 1;
  if (t.estado === 'Cancelado') return paso <= t.pasoActual ? 'hecho' : 'pendiente';
  if (paso < t.pasoActual) return 'hecho';
  if (paso === t.pasoActual) return t.estado === 'Completado' ? 'hecho' : 'actual';
  return 'pendiente';
}

export function MisTrueques() {
  const { trueques, stats, subirEvidencia, cancelar, calificar } = useTrueques();
  const { calificar: calificarResena } = useResenas();

  const [filtro, setFiltro] = useState<FiltroTrueque>('todos');

  const truequesFiltrados = useMemo<Trueque[]>(() => {
    switch (filtro) {
      case 'enCurso':
        return trueques.filter((t) => t.estado === 'En curso');
      case 'negociando':
        return trueques.filter((t) => t.estado === 'Negociando' || t.estado === 'Esperando respuesta');
      case 'completados':
        return trueques.filter((t) => t.estado === 'Completado');
      case 'cancelados':
        return trueques.filter((t) => t.estado === 'Cancelado');
      default:
        return trueques;
    }
  }, [trueques, filtro]);

  // ---- Modal subir evidencia ----
  const [modalEvidenciaAbierto, setModalEvidenciaAbierto] = useState(false);
  const [vistaModalEvidencia, setVistaModalEvidencia] = useState<'form' | 'exito'>('form');
  const [truequeSeleccionado, setTruequeSeleccionado] = useState<Trueque | null>(null);
  const [fotosSeleccionadas, setFotosSeleccionadas] = useState(0);
  const [descripcionEvidencia, setDescripcionEvidencia] = useState('');
  const [tipoEvidencia, setTipoEvidencia] = useState('Foto de los artículos intercambiados');

  const abrirSubirEvidencia = (t: Trueque): void => {
    setTruequeSeleccionado(t);
    setDescripcionEvidencia('');
    setTipoEvidencia('Foto de los artículos intercambiados');
    setFotosSeleccionadas(0);
    setVistaModalEvidencia('form');
    setModalEvidenciaAbierto(true);
  };

  const seleccionarFotos = (): void => setFotosSeleccionadas((n) => Math.min(5, n + 1));

  const enviarEvidencia = (): void => {
    if (!truequeSeleccionado) return;
    subirEvidencia(truequeSeleccionado.id);
    setVistaModalEvidencia('exito');
  };

  // ---- Modal calificar (RF09) ----
  const [modalCalificarAbierto, setModalCalificarAbierto] = useState(false);
  const [vistaModalCalificar, setVistaModalCalificar] = useState<'form' | 'exito'>('form');
  const [truequeACalificar, setTruequeACalificar] = useState<Trueque | null>(null);
  const [estrellasCalificacion, setEstrellasCalificacion] = useState(5);
  const [comentarioCalificacion, setComentarioCalificacion] = useState('');

  const abrirCalificar = (t: Trueque): void => {
    setTruequeACalificar(t);
    setEstrellasCalificacion(5);
    setComentarioCalificacion('');
    setVistaModalCalificar('form');
    setModalCalificarAbierto(true);
  };

  const enviarCalificacion = (): void => {
    if (!truequeACalificar) return;
    calificarResena({
      nombreContraparte: truequeACalificar.contraparteNombre,
      estrellas: estrellasCalificacion,
      comentario: comentarioCalificacion
    });
    calificar(truequeACalificar.id);
    setVistaModalCalificar('exito');
  };

  return (
    <>
      <div className="container-page">
        <h1>Mis trueques</h1>
        <p className="text-muted subtitulo">Seguimiento de todos tus trueques activos y pasados</p>

        <div className="card stats-bar">
          <div>
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{stats.enCurso}</strong>
            <span>En curso</span>
          </div>
          <div>
            <strong>{stats.completados}</strong>
            <span>Completados</span>
          </div>
          <div>
            <strong>{stats.cancelados}</strong>
            <span>Cancelados</span>
          </div>
          <div>
            <strong>{stats.negociando}</strong>
            <span>Negociando</span>
          </div>
        </div>

        <div className="tabs">
          <button type="button" className={filtro === 'todos' ? 'activo' : ''} onClick={() => setFiltro('todos')}>
            Todos ({stats.total})
          </button>
          <button type="button" className={filtro === 'enCurso' ? 'activo' : ''} onClick={() => setFiltro('enCurso')}>
            En curso ({stats.enCurso})
          </button>
          <button type="button" className={filtro === 'negociando' ? 'activo' : ''} onClick={() => setFiltro('negociando')}>
            Negociando ({stats.negociando})
          </button>
          <button
            type="button"
            className={filtro === 'completados' ? 'activo' : ''}
            onClick={() => setFiltro('completados')}
          >
            Completados ({stats.completados})
          </button>
          <button type="button" className={filtro === 'cancelados' ? 'activo' : ''} onClick={() => setFiltro('cancelados')}>
            Cancelados ({stats.cancelados})
          </button>
        </div>

        <div className="lista-trueques">
          {truequesFiltrados.map((t) => (
            <div className="card trueque-card" key={t.id}>
              <div className="trueque-top">
                <div className="articulos-trueque">
                  <div className="articulo-col">
                    <span className="text-soft label-articulo">Tú ofreces</span>
                    <div className="articulo-info">
                      <span className="articulo-icono">{t.ofreces.icono}</span>
                      <div>
                        <strong>{t.ofreces.nombre}</strong>
                        <span className="text-soft d-block">{t.ofreces.categoria}</span>
                      </div>
                    </div>
                  </div>
                  <span className="flecha">⇄</span>
                  <div className="articulo-col">
                    <span className="text-soft label-articulo">Recibes</span>
                    <div className="articulo-info">
                      <span className="articulo-icono">{t.recibes.icono}</span>
                      <div>
                        <strong>{t.recibes.nombre}</strong>
                        <span className="text-soft d-block">{t.recibes.categoria}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contraparte">
                  <strong>{t.contraparteNombre}</strong>
                  <span className="text-soft d-block">{t.contraparteSede}</span>
                  <span className="avatar-mini" style={{ background: t.contraparteColor }}>
                    {t.contraparteIniciales}
                  </span>
                </div>
              </div>

              {t.estado !== 'Cancelado' ? (
                <>
                  <div className="stepper">
                    {PASOS.map((paso, i) => (
                      <Fragment key={paso}>
                        <div className={'paso ' + estadoPaso(t, i)}>
                          <span className="paso-circulo">{estadoPaso(t, i) === 'hecho' ? '✓' : i + 1}</span>
                          <span className="paso-label">{paso}</span>
                        </div>
                        {i < PASOS.length - 1 && (
                          <span className={'paso-linea' + (estadoPaso(t, i) === 'hecho' ? ' hecho' : '')} />
                        )}
                      </Fragment>
                    ))}
                  </div>

                  {(t.puntoEncuentro || t.fechaAcordada) && (
                    <div className="acuerdo-info">
                      {t.puntoEncuentro && (
                        <div>
                          <strong>Punto de encuentro acordado</strong>
                          <span className="text-soft d-block">{t.puntoEncuentro}</span>
                        </div>
                      )}
                      {t.fechaAcordada && (
                        <div>
                          <strong>Fecha acordada</strong>
                          <span className="text-soft d-block">{t.fechaAcordada}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="motivo-cancelacion">{t.motivoCancelacion}</p>
              )}

              <div className="trueque-footer">
                <span className="text-soft">
                  {t.actualizado} · <Badge estado={t.estado} />
                </span>
                <div className="acciones-footer">
                  <Link to="/mensajes" className="btn btn-outline btn-sm">
                    💬 Chat
                  </Link>
                  {t.estado === 'En curso' && !t.evidenciaSubida && (
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => abrirSubirEvidencia(t)}>
                      📎 Subir evidencia
                    </button>
                  )}
                  {(t.estado === 'En curso' || t.estado === 'Negociando' || t.estado === 'Esperando respuesta') && (
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => cancelar(t.id)}>
                      Cancelar
                    </button>
                  )}
                  {t.estado === 'Completado' &&
                    (!t.calificado ? (
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => abrirCalificar(t)}>
                        ⭐ Calificar
                      </button>
                    ) : (
                      <span className="text-soft calificado-tag">✓ Ya calificado</span>
                    ))}
                </div>
              </div>
            </div>
          ))}

          {truequesFiltrados.length === 0 && <div className="card vacio">No hay trueques en esta categoría.</div>}
        </div>

        <Link to="/inicio" className="btn btn-outline volver-btn">
          ← Volver
        </Link>
      </div>

      {modalEvidenciaAbierto && truequeSeleccionado && (
        <Modal
          titulo="Subir evidencia del trueque"
          subtitulo={`${truequeSeleccionado.ofreces.nombre} ↔ ${truequeSeleccionado.recibes.nombre}`}
          icono="📎"
          ancho={480}
          onCerrar={() => setModalEvidenciaAbierto(false)}
        >
          {vistaModalEvidencia === 'form' ? (
            <>
              <div className="info-caja">
                <strong>ℹ️ ¿Qué necesitas subir?</strong>
                <p>Sube fotos que demuestren que el intercambio se realizó: artículos juntos, punto de entrega, selfie, etc.</p>
              </div>

              <div className="dropzone" onClick={seleccionarFotos} role="button" tabIndex={0}>
                <span className="dropzone-icono">📷</span>
                <strong>Arrastra fotos aquí o haz clic para seleccionar</strong>
                <span className="text-soft">JPG, PNG o HEIC · Máximo 5 fotos · 10 MB c/u</span>
              </div>
              <p className="text-soft contador-fotos">{fotosSeleccionadas}/5 foto(s) seleccionada(s)</p>

              <div className="form-field">
                <label>Descripción de la evidencia (opcional)</label>
                <textarea
                  rows={2}
                  value={descripcionEvidencia}
                  onChange={(e) => setDescripcionEvidencia(e.target.value)}
                  placeholder="Ej: Intercambio realizado el jueves 29 de mayo en la sede Kennedy, recepción principal..."
                />
              </div>

              <div className="form-field">
                <label>Tipo de evidencia</label>
                <select value={tipoEvidencia} onChange={(e) => setTipoEvidencia(e.target.value)}>
                  <option>Foto de los artículos intercambiados</option>
                  <option>Foto del punto de encuentro</option>
                  <option>Selfie con la contraparte</option>
                </select>
              </div>

              <div className="modal-acciones">
                <button type="button" className="btn btn-outline" onClick={() => setModalEvidenciaAbierto(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={enviarEvidencia}>
                  ✅ Enviar evidencia
                </button>
              </div>
            </>
          ) : (
            <div className="confirmacion-exito">
              <span className="icono-exito">✅</span>
              <h3>¡Evidencia enviada con éxito!</h3>
              <p className="text-muted">Tu evidencia fue registrada y notificada a la contraparte.</p>
              <p className="text-muted">
                El trueque avanzará al paso <strong>Evidencia ✓</strong> una vez que ambas partes la confirmen.
              </p>
              <button type="button" className="btn btn-primary" onClick={() => setModalEvidenciaAbierto(false)}>
                Cerrar
              </button>
            </div>
          )}
        </Modal>
      )}

      {modalCalificarAbierto && truequeACalificar && (
        <Modal
          titulo="Calificar usuario"
          subtitulo={`¿Cómo fue tu experiencia con ${truequeACalificar.contraparteNombre}?`}
          icono="⭐"
          ancho={420}
          onCerrar={() => setModalCalificarAbierto(false)}
        >
          {vistaModalCalificar === 'form' ? (
            <>
              <div className="estrellas-selector">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={'estrella-btn' + (n <= estrellasCalificacion ? ' activa' : '')}
                    onClick={() => setEstrellasCalificacion(n)}
                  >
                    {n <= estrellasCalificacion ? '★' : '☆'}
                  </button>
                ))}
              </div>
              <div className="form-field">
                <label htmlFor="comentarioCalificacion">Comentario (opcional)</label>
                <textarea
                  id="comentarioCalificacion"
                  rows={3}
                  value={comentarioCalificacion}
                  onChange={(e) => setComentarioCalificacion(e.target.value)}
                  placeholder="Cuéntanos cómo fue el intercambio y el cumplimiento del otro aprendiz..."
                />
              </div>
              <div className="modal-acciones">
                <button type="button" className="btn btn-outline" onClick={() => setModalCalificarAbierto(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={enviarCalificacion}>
                  Enviar evaluación
                </button>
              </div>
            </>
          ) : (
            <div className="confirmacion-exito">
              <span className="icono-exito">👍</span>
              <h3>Tu evaluación ha sido enviada</h3>
              <p className="text-muted">Tu evaluación ayuda a mejorar la comunidad RAS.</p>
              <button type="button" className="btn btn-primary" onClick={() => setModalCalificarAbierto(false)}>
                Aceptar
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
