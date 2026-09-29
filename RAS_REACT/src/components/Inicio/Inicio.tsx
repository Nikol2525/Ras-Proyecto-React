import { Link } from 'react-router-dom';
import { StatCard } from '../../common/shared/StatCard';
import { Badge } from '../../common/shared/Badge';
import { usePublicaciones } from '../../context/PublicacionesContext';
import './Inicio.css';

const STATS = [
  { icono: '📋', valor: 342, etiqueta: 'Total publicaciones' },
  { icono: '👤', valor: 89, etiqueta: 'Aprendices activos' },
  { icono: '🔄', valor: 127, etiqueta: 'Intercambios' },
  { icono: '❤️', valor: 58, etiqueta: 'Donaciones' }
];

const PASOS = [
  { numero: 1, icono: '📝', titulo: 'Regístrate', texto: 'Crea tu cuenta con tu correo Mi SENA o personal. Es gratis y toma menos de 2 minutos.' },
  { numero: 2, icono: '📦', titulo: 'Publica o busca', texto: 'Publica artículos que ya no uses o busca lo que necesitas entre los artículos de tu comunidad.' },
  { numero: 3, icono: '🤝', titulo: 'Propón un trueque', texto: 'Envía una propuesta de intercambio, negocia por chat y coordina el punto de encuentro en tu sede.' },
  { numero: 4, icono: '⭐', titulo: 'Califica y listo', texto: 'Sube la evidencia del intercambio, califica al otro aprendiz y ¡disfruta lo que obtuviste!' }
];

export function Inicio() {
  const { publicacionesRecientes } = usePublicaciones();
  const publicaciones = publicacionesRecientes.slice(0, 6);

  return (
    <div className="container-page">
      <section className="banner-bienvenida">
        <div className="banner-texto">
          <h1>
            Bienvenido a RAS
            <br />
            Red de Apoyo SENA
          </h1>
          <p>
            Plataforma oficial del SENA para interconectar aprendices. Intercambia uniformes, útiles y
            materiales académicos con tu comunidad.
          </p>
        </div>
        <div className="banner-ilustracion" aria-hidden="true">
          <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="46" r="24" fill="#ffe3c4" />
            <path d="M36 96c4-20 20-30 24-30s20 10 24 30v20H36z" fill="#3b6ea5" />
            <circle cx="160" cy="50" r="24" fill="#ffcf9e" />
            <path d="M136 100c4-20 20-30 24-30s20 10 24 30v20h-48z" fill="#2f9d5b" />
            <rect x="86" y="86" width="48" height="40" rx="4" fill="#c98a4b" />
            <rect x="86" y="86" width="48" height="10" fill="#a86f38" />
            <line x1="110" y1="86" x2="110" y2="126" stroke="#a86f38" strokeWidth="3" />
          </svg>
        </div>
      </section>

      <section className="stats-grid">
        {STATS.map((s) => (
          <StatCard key={s.etiqueta} icono={s.icono} valor={s.valor} etiqueta={s.etiqueta} className="card" />
        ))}
      </section>

      <section>
        <h2>Publicaciones recientes</h2>
        <p className="text-muted subtitulo">Artículos disponibles en tu comunidad</p>

        <div className="grid-publicaciones">
          {publicaciones.map((pub) => (
            <article className="card pub-card" key={pub.id}>
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
                  <Link to="/explorar" className="link-ver">
                    Ver
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>¿Cómo funciona RAS?</h2>
        <p className="text-muted subtitulo">Tres pasos para empezar a intercambiar con tu comunidad</p>

        <div className="grid-pasos">
          {PASOS.map((paso) => (
            <div className="card paso-card" key={paso.numero}>
              <span className="paso-numero">{paso.numero}</span>
              <span className="paso-icono">{paso.icono}</span>
              <h4>{paso.titulo}</h4>
              <p className="text-muted">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
