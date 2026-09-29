import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../common/shared/Modal';
import { useAuth } from '../../context/AuthContext';
import { useResenas } from '../../context/ResenasContext';
import './MiPerfil.css';

function estrellas(cantidad: number): string[] {
  return Array.from({ length: 5 }, (_, i) => (i < Math.round(cantidad) ? '★' : '☆'));
}

export function MiPerfil() {
  const { usuario, actualizarPerfil } = useAuth();
  const { resenas } = useResenas();

  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [nombreEditado, setNombreEditado] = useState('');
  const [programaEditado, setProgramaEditado] = useState('');
  const [telefonoEditado, setTelefonoEditado] = useState('');
  const [sedeEditada, setSedeEditada] = useState('');

  const abrirEditar = (): void => {
    if (!usuario) return;
    setNombreEditado(usuario.nombre);
    setProgramaEditado(usuario.programa);
    setTelefonoEditado(usuario.telefono);
    setSedeEditada(usuario.sede);
    setModalEditarAbierto(true);
  };

  const guardarPerfil = (): void => {
    actualizarPerfil({
      nombre: nombreEditado,
      programa: programaEditado,
      telefono: telefonoEditado,
      sede: sedeEditada
    });
    setModalEditarAbierto(false);
  };

  if (!usuario) return null;

  return (
    <>
      <div className="container-page">
        <div className="perfil-grid">
          <div className="card perfil-card">
            <div className="perfil-portada" />
            <div className="perfil-info">
              <div className="perfil-avatar" style={{ background: usuario.colorAvatar }}>
                {usuario.iniciales}
              </div>
              <h2>{usuario.nombre}</h2>
              <p className="text-muted">{usuario.programa}</p>
              <p className="etapa">● {usuario.etapa}</p>

              <div className="perfil-stats">
                <div>
                  <strong>{usuario.totalTrueques}</strong>
                  <span>Trueques</span>
                </div>
                <div>
                  <strong>{usuario.rating}</strong>
                  <span>Rating</span>
                </div>
                <div>
                  <strong>{usuario.totalArticulos}</strong>
                  <span>Artículos</span>
                </div>
              </div>

              <button className="btn btn-outline btn-block" type="button" onClick={abrirEditar}>
                ✏️ Editar perfil
              </button>

              <ul className="perfil-datos">
                <li>✉️ {usuario.correo}</li>
                <li>📱 {usuario.telefono}</li>
                <li>📍 {usuario.sede}</li>
                <li>🪪 {usuario.cedula}</li>
                <li>📅 Miembro desde {usuario.miembroDesde}</li>
              </ul>

              <Link to="/pqr" className="btn btn-outline-danger btn-block">
                Radicar PQR
              </Link>
            </div>
          </div>

          <div className="resenas-col">
            <div className="resenas-header">
              <div>
                <h2>Calificaciones recibidas</h2>
                <p className="text-muted">Lo que dicen otros aprendices de ti</p>
              </div>
              <div className="card rating-grande">
                <strong>{usuario.rating}</strong>
                <span className="estrellas-mini">★★★★★</span>
                <span className="text-soft">{usuario.totalResenas} reseñas</span>
              </div>
            </div>

            <div className="lista-resenas">
              {resenas.map((r, i) => (
                <div className="resena-item" key={i}>
                  <div className="resena-cabecera">
                    <span className="avatar-mini" style={{ background: r.color }}>
                      {r.iniciales}
                    </span>
                    <div>
                      <strong>{r.nombre}</strong>
                      <div className="estrellas">
                        {estrellas(r.estrellas).map((e, j) => (
                          <span key={j}>{e}</span>
                        ))}
                        <span className="text-soft fecha">{r.fecha}</span>
                      </div>
                    </div>
                  </div>
                  <p className="resena-comentario">{r.comentario}</p>
                </div>
              ))}
            </div>

            <Link to="/inicio" className="btn btn-outline volver-btn">
              ← Volver
            </Link>
          </div>
        </div>
      </div>

      {modalEditarAbierto && (
        <Modal titulo="Editar perfil" icono="✏️" ancho={440} onCerrar={() => setModalEditarAbierto(false)}>
          <div className="form-field">
            <label htmlFor="nombreEditado">Nombre completo</label>
            <input id="nombreEditado" type="text" value={nombreEditado} onChange={(e) => setNombreEditado(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="programaEditado">Programa de formación</label>
            <input
              id="programaEditado"
              type="text"
              value={programaEditado}
              onChange={(e) => setProgramaEditado(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="telefonoEditado">Teléfono</label>
            <input
              id="telefonoEditado"
              type="text"
              value={telefonoEditado}
              onChange={(e) => setTelefonoEditado(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="sedeEditada">Sede</label>
            <input id="sedeEditada" type="text" value={sedeEditada} onChange={(e) => setSedeEditada(e.target.value)} />
          </div>

          <div className="modal-acciones">
            <button type="button" className="btn btn-outline" onClick={() => setModalEditarAbierto(false)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={guardarPerfil}>
              💾 Guardar cambios
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
