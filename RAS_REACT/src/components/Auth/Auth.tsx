import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../common/shared/Modal';
import './Auth.css';

type Pestana = 'login' | 'registro';

export function Auth() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [pestana, setPestana] = useState<Pestana>('login');
  const [error, setError] = useState('');

  // Login
  const [correoLogin, setCorreoLogin] = useState('jgarcia@misena.edu.co');
  const [passwordLogin, setPasswordLogin] = useState('Sena2025*');

  // Registro
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [correoRegistro, setCorreoRegistro] = useState('');
  const [programaRegistro, setProgramaRegistro] = useState('');
  const [passwordRegistro, setPasswordRegistro] = useState('');

  // ---- Recuperar contraseña (RF03) ----
  const [modalRecuperarAbierto, setModalRecuperarAbierto] = useState(false);
  const [vistaRecuperar, setVistaRecuperar] = useState<'form' | 'enviado'>('form');
  const [correoRecuperar, setCorreoRecuperar] = useState('');
  const [errorRecuperar, setErrorRecuperar] = useState('');

  const cambiarPestana = (p: Pestana): void => {
    setPestana(p);
    setError('');
  };

  const abrirRecuperar = (): void => {
    setCorreoRecuperar(correoLogin || '');
    setErrorRecuperar('');
    setVistaRecuperar('form');
    setModalRecuperarAbierto(true);
  };

  const enviarEnlaceRecuperacion = (): void => {
    if (!correoRecuperar.trim() || !correoRecuperar.includes('@')) {
      setErrorRecuperar('Ingresa un correo electrónico válido.');
      return;
    }
    setErrorRecuperar('');
    setVistaRecuperar('enviado');
  };

  const enviarLogin = (e: FormEvent): void => {
    e.preventDefault();
    const ok = auth.iniciarSesion(correoLogin, passwordLogin);
    if (ok) {
      navigate('/inicio');
    } else {
      setError('Correo o contraseña incorrectos. Usa las credenciales de prueba.');
    }
  };

  const enviarRegistro = (e: FormEvent): void => {
    e.preventDefault();
    if (!nombreRegistro || !correoRegistro || !passwordRegistro) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    if (passwordRegistro.length < 8) {
      setError('La contraseña debe tener mínimo 8 caracteres.');
      return;
    }
    auth.registrar({
      nombre: nombreRegistro,
      correo: correoRegistro,
      programa: programaRegistro,
      contrasena: passwordRegistro
    });
    navigate('/inicio');
  };

  return (
    <>
      <div className="auth-layout">
        <div className="auth-panel-izq">
          <span className="marca">RAS Red de Apoyo SENA</span>
          <span className="hero-tag">Plataforma solidaria SENA</span>
          <h1>
            Intercambia y dona
            <br />
            con tu comunidad
          </h1>
          <p>Conecta con otros aprendices del SENA para intercambiar uniformes, libros y materiales académicos.</p>
          <div className="stats-mini">
            <div className="stat-mini">
              <strong>+1.2K</strong>
              <span>Aprendices</span>
            </div>
            <div className="stat-mini">
              <strong>340</strong>
              <span>Trueques</span>
            </div>
            <div className="stat-mini">
              <strong>12</strong>
              <span>Sedes</span>
            </div>
          </div>
        </div>

        <div className="auth-panel-der">
          <div className="auth-form-wrap">
            <h2>Bienvenido</h2>
            <p className="text-muted">Accede con tu cuenta institucional</p>

            <div className="tabs">
              <button
                type="button"
                className={'tab' + (pestana === 'login' ? ' activo' : '')}
                onClick={() => cambiarPestana('login')}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className={'tab' + (pestana === 'registro' ? ' activo' : '')}
                onClick={() => cambiarPestana('registro')}
              >
                Registrarse
              </button>
            </div>

            {error && <div className="alerta-error">{error}</div>}

            {pestana === 'login' ? (
              <>
                <div className="credenciales-prueba">
                  <strong>🔑 Credenciales de prueba</strong>
                  <p>
                    Usuario: <strong>jgarcia&#64;misena.edu.co</strong>
                  </p>
                  <p>
                    Contraseña: <strong>Sena2025*</strong>
                  </p>
                </div>

                <form onSubmit={enviarLogin}>
                  <div className="form-field">
                    <label htmlFor="correoLogin">Correo Mi SENA o personal</label>
                    <input
                      id="correoLogin"
                      type="email"
                      name="correoLogin"
                      value={correoLogin}
                      onChange={(e) => setCorreoLogin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="passwordLogin">Contraseña</label>
                    <input
                      id="passwordLogin"
                      type="password"
                      name="passwordLogin"
                      value={passwordLogin}
                      onChange={(e) => setPasswordLogin(e.target.value)}
                      required
                    />
                  </div>
                  <a href="javascript:void(0)" className="olvido" onClick={abrirRecuperar}>
                    ¿Olvidaste tu contraseña?
                  </a>
                  <button type="submit" className="btn btn-primary btn-block">
                    Iniciar sesión
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={enviarRegistro}>
                <div className="form-field">
                  <label htmlFor="nombreRegistro">Nombre completo</label>
                  <input
                    id="nombreRegistro"
                    type="text"
                    name="nombreRegistro"
                    value={nombreRegistro}
                    onChange={(e) => setNombreRegistro(e.target.value)}
                    placeholder="Johan Gonzalo García W."
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="correoRegistro">Correo Mi SENA o personal</label>
                  <input
                    id="correoRegistro"
                    type="email"
                    name="correoRegistro"
                    value={correoRegistro}
                    onChange={(e) => setCorreoRegistro(e.target.value)}
                    placeholder="usuario@misena.edu.co"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="programaRegistro">Programa de formación</label>
                  <input
                    id="programaRegistro"
                    type="text"
                    name="programaRegistro"
                    value={programaRegistro}
                    onChange={(e) => setProgramaRegistro(e.target.value)}
                    placeholder="Análisis y Desarrollo de Software"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="passwordRegistro">Contraseña</label>
                  <input
                    id="passwordRegistro"
                    type="password"
                    name="passwordRegistro"
                    value={passwordRegistro}
                    onChange={(e) => setPasswordRegistro(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Crear cuenta
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {modalRecuperarAbierto && (
        <Modal titulo="Recuperar contraseña" icono="🔑" ancho={420} onCerrar={() => setModalRecuperarAbierto(false)}>
          {vistaRecuperar === 'form' ? (
            <>
              <p className="text-muted recuperar-intro">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              {errorRecuperar && <div className="alerta-error">{errorRecuperar}</div>}
              <div className="form-field">
                <label htmlFor="correoRecuperar">Correo electrónico</label>
                <input
                  id="correoRecuperar"
                  type="email"
                  name="correoRecuperar"
                  value={correoRecuperar}
                  onChange={(e) => setCorreoRecuperar(e.target.value)}
                  placeholder="usuario@sena.edu.co"
                />
              </div>
              <div className="modal-acciones">
                <button type="button" className="btn btn-outline" onClick={() => setModalRecuperarAbierto(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={enviarEnlaceRecuperacion}>
                  Enviar enlace
                </button>
              </div>
            </>
          ) : (
            <div className="confirmacion-exito">
              <span className="icono-exito">✉️</span>
              <h3>¡Enlace enviado!</h3>
              <p className="text-muted">
                Hemos enviado un enlace a <strong>{correoRecuperar}</strong> para que puedas restablecer tu contraseña.
              </p>
              <p className="text-soft">Revisa tu bandeja de entrada y carpeta de spam.</p>
              <button type="button" className="btn btn-primary" onClick={() => setModalRecuperarAbierto(false)}>
                Volver a inicio de sesión
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
