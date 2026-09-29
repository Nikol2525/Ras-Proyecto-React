import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../common/shared/Badge';
import { Modal } from '../../common/shared/Modal';
import { usePqr } from '../../context/PqrContext';
import type { Pqr as PqrModel, TipoPqr } from '../../types/pqr';
import './Pqr.css';

type Pestana = 'nueva' | 'mis';

export function Pqr() {
  const { pqrs, stats, radicar } = usePqr();

  const [pestana, setPestana] = useState<Pestana>('mis');
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [referenciaCreada, setReferenciaCreada] = useState('');

  const [tipoNueva, setTipoNueva] = useState<TipoPqr>('Petición');
  const [asuntoNueva, setAsuntoNueva] = useState('');
  const [descripcionNueva, setDescripcionNueva] = useState('');
  const [relacionadoNueva, setRelacionadoNueva] = useState('Consulta general');

  const [pqrSeleccionada, setPqrSeleccionada] = useState<PqrModel | null>(null);

  const radicarNueva = (): void => {
    if (!asuntoNueva.trim() || !descripcionNueva.trim()) return;
    const creada = radicar({
      tipo: tipoNueva,
      asunto: asuntoNueva,
      descripcion: descripcionNueva,
      relacionado: relacionadoNueva
    });
    setReferenciaCreada(creada.referencia);
    setConfirmacionVisible(true);
    setAsuntoNueva('');
    setDescripcionNueva('');
    setPestana('mis');
    setTimeout(() => setConfirmacionVisible(false), 4000);
  };

  return (
    <>
      <div className="container-page">
        <h1>Peticiones, Quejas y Reclamos</h1>
        <p className="text-muted subtitulo">Radica o consulta el estado de tus solicitudes</p>

        {confirmacionVisible && (
          <div className="card confirmacion-pqr">
            <span className="confirmacion-icono">📮</span>
            <div>
              <strong>PQR radicada exitosamente</strong>
              <p className="text-muted">Referencia {referenciaCreada} · Recibirás respuesta en máx. 24h.</p>
            </div>
          </div>
        )}

        <div className="pqr-grid">
          <div className="pqr-main">
            <div className="tabs">
              <button type="button" className={pestana === 'nueva' ? 'activo' : ''} onClick={() => setPestana('nueva')}>
                Nueva PQR
              </button>
              <button type="button" className={pestana === 'mis' ? 'activo' : ''} onClick={() => setPestana('mis')}>
                Mis PQR
              </button>
            </div>

            {pestana === 'nueva' ? (
              <div className="card form-pqr">
                <div className="form-field">
                  <label htmlFor="tipoNueva">Tipo de solicitud</label>
                  <select id="tipoNueva" value={tipoNueva} onChange={(e) => setTipoNueva(e.target.value as TipoPqr)}>
                    <option value="Petición">Petición</option>
                    <option value="Queja">Queja</option>
                    <option value="Reclamo">Reclamo</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="asuntoNueva">Asunto</label>
                  <input
                    id="asuntoNueva"
                    type="text"
                    value={asuntoNueva}
                    onChange={(e) => setAsuntoNueva(e.target.value)}
                    placeholder="Ej: El artículo recibido no coincide con la descripción"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="relacionadoNueva">Relacionado con</label>
                  <input
                    id="relacionadoNueva"
                    type="text"
                    value={relacionadoNueva}
                    onChange={(e) => setRelacionadoNueva(e.target.value)}
                    placeholder="Ej: Intercambio no completado"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="descripcionNueva">Descripción detallada</label>
                  <textarea
                    id="descripcionNueva"
                    rows={5}
                    value={descripcionNueva}
                    onChange={(e) => setDescripcionNueva(e.target.value)}
                    placeholder="Cuéntanos con detalle qué sucedió..."
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={radicarNueva}>
                  Radicar solicitud
                </button>
              </div>
            ) : (
              <>
                <h3 className="titulo-lista">Mis PQR anteriores</h3>
                <div className="lista-pqr">
                  {pqrs.map((p) => (
                    <div className="card pqr-item" key={p.id}>
                      <div className="pqr-icono">📄</div>
                      <div className="pqr-info">
                        <div className="pqr-titulo-row">
                          <strong>{p.asunto}</strong>
                          <Badge estado={p.tipo} />
                          <Badge estado={p.estado} />
                        </div>
                        <p className="text-soft">
                          {p.relacionado} · {p.fechaRadicada}
                        </p>
                        {p.estado === 'Resuelta' && p.fechaResuelta && <p className="text-soft">✅ {p.fechaResuelta}</p>}
                      </div>
                      <div className="pqr-ref-col">
                        <span className="text-soft">Ref. {p.referencia}</span>
                        {p.estado !== 'Resuelta' ? (
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => setPqrSeleccionada(p)}>
                            Ver detalle
                          </button>
                        ) : (
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => setPqrSeleccionada(p)}>
                            📩 Ver respuesta
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Link to="/inicio" className="btn btn-outline volver-btn">
              ← Volver
            </Link>
          </div>

          <aside className="pqr-sidebar">
            <div className="card panel-info">
              <h4>Información importante</h4>

              <div className="info-bloque">
                <strong>⏱️ Tiempos de respuesta</strong>
                <div className="fila-info">
                  <span>Petición</span>
                  <strong>5 días hábiles</strong>
                </div>
                <div className="fila-info">
                  <span>Queja</span>
                  <strong>15 días hábiles</strong>
                </div>
                <div className="fila-info">
                  <span>Reclamo</span>
                  <strong>15 días hábiles</strong>
                </div>
              </div>

              <div className="info-bloque">
                <strong>ℹ️ ¿Cuándo usar cada tipo?</strong>
                <p>
                  <strong>Petición:</strong> Cuando necesitas información, un documento o que se realice una acción.
                </p>
                <p>
                  <strong>Queja:</strong> Cuando estás inconforme con la atención o el comportamiento de otro usuario.
                </p>
                <p>
                  <strong>Reclamo:</strong> Cuando un artículo no corresponde a su descripción o un trueque no se
                  completó.
                </p>
              </div>

              <div className="info-bloque">
                <strong>🔒 Tu privacidad</strong>
                <p>Tu PQR es confidencial. Solo el equipo de mediación SENA y las partes involucradas tienen acceso a la información.</p>
              </div>
            </div>

            <div className="mini-stats-grid">
              <div className="card mini-stat">
                <strong>{stats.radicadas}</strong>
                <span>PQR radicadas</span>
              </div>
              <div className="card mini-stat">
                <strong>{stats.resueltas}</strong>
                <span>Resueltas</span>
              </div>
              <div className="card mini-stat">
                <strong>{stats.enProceso}</strong>
                <span>En proceso</span>
              </div>
              <div className="card mini-stat">
                <strong>{stats.satisfaccion}</strong>
                <span>Satisfacción</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {pqrSeleccionada && (
        <Modal titulo="Detalle de la solicitud" icono="📄" ancho={480} onCerrar={() => setPqrSeleccionada(null)}>
          <div className="detalle-header">
            <div className="detalle-titulo-row">
              <strong>{pqrSeleccionada.asunto}</strong>
              <Badge estado={pqrSeleccionada.tipo} />
              <Badge estado={pqrSeleccionada.estado} />
            </div>
            <span className="text-soft">
              Ref. {pqrSeleccionada.referencia} · {pqrSeleccionada.relacionado}
            </span>
          </div>

          <p className="detalle-descripcion">{pqrSeleccionada.descripcion}</p>

          {pqrSeleccionada.respuesta && (
            <div className="respuesta-caja">
              <strong>📩 Respuesta del equipo de mediación</strong>
              <p>{pqrSeleccionada.respuesta}</p>
            </div>
          )}

          <h4 className="titulo-timeline">Seguimiento</h4>
          <div className="timeline">
            {pqrSeleccionada.timeline.map((evento, i) => (
              <div className="timeline-item" key={i}>
                <span className="timeline-punto" />
                <div>
                  <strong>{evento.texto}</strong>
                  <span className="text-soft d-block">{evento.fecha}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-acciones">
            <button type="button" className="btn btn-primary" onClick={() => setPqrSeleccionada(null)}>
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
