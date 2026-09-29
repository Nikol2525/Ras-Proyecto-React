import type { Usuario } from '../types/usuario';
import type { Publicacion } from '../types/publicacion';
import type { Trueque } from '../types/trueque';
import type { Conversacion } from '../types/mensaje';
import type { Notificacion } from '../types/notificacion';
import type { Pqr } from '../types/pqr';
import type { Resena } from '../types/resena';

export const USUARIO_ACTUAL: Usuario = {
  id: 'u-jg',
  nombre: 'Johan Gonzalo García W.',
  correo: 'jgarcia@misena.edu.co',
  contrasena: 'Sena2025*',
  programa: 'Análisis y Desarrollo de Software',
  telefono: '+57 312 456 7890',
  sede: 'Sede Kennedy, Bogotá',
  cedula: 'CC 1023456789',
  miembroDesde: 'Ene. 2025',
  etapa: 'Etapa lectiva · Activo',
  iniciales: 'JG',
  colorAvatar: '#1a6b3c',
  rating: 4.8,
  totalResenas: 14,
  totalTrueques: 14,
  totalArticulos: 6
};

export const RESENAS_MOCK: Resena[] = [
  { nombre: 'Laura C. Herrera', iniciales: 'LC', color: '#2f9d5b', estrellas: 5, fecha: '12 mayo 2025', comentario: 'Excelente aprendiz, muy puntual y el artículo estaba tal cual como lo describió. Totalmente recomendado para hacer trueque.' },
  { nombre: 'Andrés M. Torres', iniciales: 'AM', color: '#3b82f6', estrellas: 4, fecha: '28 abr. 2025', comentario: 'Buen trato y artículo en buen estado. El intercambio se realizó sin inconvenientes en la sede acordada.' },
  { nombre: 'Sara R. Muñoz', iniciales: 'SR', color: '#d9a441', estrellas: 5, fecha: '10 abr. 2025', comentario: 'Muy buena persona, responsable y cumplida. El artículo estaba en perfectas condiciones. Sin duda volvería a hacer trueque con ella.' },
  { nombre: 'Camilo P. Ramos', iniciales: 'CP', color: '#8b5cf6', estrellas: 5, fecha: '2 mar. 2025', comentario: 'Todo perfecto, muy claro en la descripción del artículo y super amable en el intercambio. 100% recomendado.' },
  { nombre: 'María V. Ospina', iniciales: 'MV', color: '#f472b6', estrellas: 4, fecha: '15 feb. 2025', comentario: 'Buen intercambio en general, el artículo correspondía a la descripción. Llegó un poco tarde al punto acordado pero avisó con anticipación.' }
];

export const PUBLICACIONES_MOCK: Publicacion[] = [
  {
    id: 'p1', titulo: 'Uniforme SENA talla M — Camisa + pantalón', descripcion: 'Uniforme completo en buen estado, poco uso. Talla M.',
    tipo: 'Trueque', categoria: 'Uniformes', sede: 'Sede Kennedy', estado: 'Activa',
    publicadaHace: 'Publicada hace 3 días', vistas: 24, icono: '👕', colorFondo: '#e7f5ec',
    autorNombre: 'Laura C.', autorIniciales: 'LC', autorColor: '#2f9d5b', progreso: 60,
    propuestas: [
      { id: 'pr1', nombre: 'Laura C. Herrera', iniciales: 'LC', colorAvatar: '#2f9d5b', ofrece: 'Libro Java básico (10ª edición)' },
      { id: 'pr2', nombre: 'Andrés F. Bonilla', iniciales: 'AF', colorAvatar: '#93c5fd', ofrece: 'Maletín Totto negro Business' },
      { id: 'pr3', nombre: 'Sara R. López', iniciales: 'SR', colorAvatar: '#c4b5fd', ofrece: 'Set de audífonos + cargador USB-C' }
    ]
  },
  {
    id: 'p2', titulo: 'Mouse inalámbrico Logitech + teclado USB', descripcion: 'Combo de mouse y teclado en excelente estado, poco uso.',
    tipo: 'Trueque', categoria: 'Equipos', sede: 'Sede Kennedy', estado: 'Activa',
    publicadaHace: 'Publicada hace 6 días', vistas: 17, icono: '🖱️', colorFondo: '#eef2ff',
    autorNombre: 'Sara R.', autorIniciales: 'SR', autorColor: '#c4b5fd', progreso: 30,
    propuestas: [
      { id: 'pr4', nombre: 'Nikol C. Pardo', iniciales: 'NK', colorAvatar: '#f9a8d4', ofrece: 'Pack de marcadores + resaltadores' }
    ]
  },
  {
    id: 'p3', titulo: 'Pack de libros: Python, Java y Clean Code', descripcion: 'Tres libros de programación en buen estado, ideales para ADSO.',
    tipo: 'Donación', categoria: 'Libros', sede: 'Sede Kennedy', estado: 'Activa',
    publicadaHace: 'Publicada hace 8 días', vistas: 7, icono: '📚', colorFondo: '#fef9c3',
    autorNombre: 'Johan G.', autorIniciales: 'JG', autorColor: '#1a6b3c', progreso: 5,
    propuestas: []
  },
  {
    id: 'p4', titulo: 'Maletín universitario Totto negro talla grande', descripcion: 'Maletín resistente, varios compartimentos.',
    tipo: 'Trueque', categoria: 'Ropa', sede: 'Sede Sur', estado: 'Pausada',
    publicadaHace: 'Pausada hace 2 días', vistas: 12, icono: '🎒', colorFondo: '#fee2e2',
    autorNombre: 'Carlos T.', autorIniciales: 'CM', autorColor: '#d9a441', progreso: 0,
    propuestas: []
  },
  {
    id: 'p5', titulo: 'Calculadora científica Casio fx-991', descripcion: 'Calculadora científica, funciona perfectamente.',
    tipo: 'Trueque', categoria: 'Equipos', sede: 'Sede Kennedy', estado: 'Cerrada',
    publicadaHace: 'Cerrada hace 12 días', vistas: 31, icono: '🧮', colorFondo: '#e0f2fe',
    autorNombre: 'Johan G.', autorIniciales: 'JG', autorColor: '#1a6b3c', progreso: 100,
    propuestas: []
  },
  {
    id: 'p6', titulo: 'Curso intensivo de inglés — material físico', descripcion: 'Material del curso de inglés, cuadernillos y guías.',
    tipo: 'Donación', categoria: 'Libros', sede: 'Sede Kennedy', estado: 'Cerrada',
    publicadaHace: 'Cerrada hace 20 días', vistas: 19, icono: '📖', colorFondo: '#e7f5ec',
    autorNombre: 'Johan G.', autorIniciales: 'JG', autorColor: '#1a6b3c', progreso: 100,
    propuestas: []
  }
];

export const PUBLICACIONES_COMUNIDAD_MOCK: Publicacion[] = [
  {
    id: 'c1', titulo: 'Libro C++ — Programación Orientada a Objetos', descripcion: 'Libro en buen estado, ideal para segundo trimestre.',
    tipo: 'Donación', categoria: 'Libros', sede: 'Sede Norte', estado: 'Activa',
    publicadaHace: 'Publicada hace 2 días', vistas: 14, icono: '📘', colorFondo: '#fef3c7',
    autorNombre: 'Andrés M.', autorIniciales: 'AM', autorColor: '#3b82f6', progreso: 0, propuestas: []
  },
  {
    id: 'c2', titulo: 'Kit de herramientas electrónica básica', descripcion: 'Kit completo: destornilladores, multímetro y cautín.',
    tipo: 'Trueque', categoria: 'Herramientas', sede: 'Sede Centro', estado: 'Activa',
    publicadaHace: 'Publicada hace 4 días', vistas: 22, icono: '🔧', colorFondo: '#f3f4f6',
    autorNombre: 'Nikol P.', autorIniciales: 'NK', autorColor: '#f9a8d4', progreso: 0, propuestas: []
  },
  {
    id: 'c3', titulo: 'Audífonos bluetooth', descripcion: 'Audífonos inalámbricos, batería en buen estado.',
    tipo: 'Trueque', categoria: 'Equipos', sede: 'Sede Centro', estado: 'Activa',
    publicadaHace: 'Publicada hace 1 día', vistas: 9, icono: '🎧', colorFondo: '#ede9fe',
    autorNombre: 'Sara R.', autorIniciales: 'SR', autorColor: '#c4b5fd', progreso: 0, propuestas: []
  }
];

export const TRUEQUES_MOCK: Trueque[] = [
  {
    id: 't1',
    ofreces: { icono: '👕', nombre: 'Uniforme SENA talla M', categoria: 'Uniformes' },
    recibes: { icono: '📗', nombre: 'Libro Java básico', categoria: 'Libros' },
    contraparteNombre: 'Laura C. Herrera', contraparteSede: 'Sede Kennedy', contraparteIniciales: 'LC', contraparteColor: '#2f9d5b',
    pasoActual: 3, estado: 'En curso',
    puntoEncuentro: 'Sede Kennedy — Recepción principal', fechaAcordada: 'Jueves 29 mayo, 10:00 am',
    actualizado: 'Actualizado hace 30 min'
  },
  {
    id: 't2',
    ofreces: { icono: '⌨️', nombre: 'Teclado inalámbrico', categoria: 'Equipos' },
    recibes: { icono: '🎒', nombre: 'Maletín universitario', categoria: 'Ropa' },
    contraparteNombre: 'Andrés M. Torres', contraparteSede: 'Sede Norte', contraparteIniciales: 'AM', contraparteColor: '#3b82f6',
    pasoActual: 2, estado: 'Negociando',
    actualizado: 'Actualizado ayer'
  },
  {
    id: 't3',
    ofreces: { icono: '🛠️', nombre: 'Kit de electrónica', categoria: 'Equipos' },
    recibes: { icono: '🎧', nombre: 'Audífonos bluetooth', categoria: 'Equipos' },
    contraparteNombre: 'Carlos M. Torres', contraparteSede: 'Sede Centro', contraparteIniciales: 'CM', contraparteColor: '#d9a441',
    pasoActual: 5, estado: 'Completado',
    actualizado: 'Completado el 10 abr. 2025', fechaCierre: '10 abr. 2025', evidenciaSubida: true
  },
  {
    id: 't4',
    ofreces: { icono: '🎒', nombre: 'Maletín Totto negro', categoria: 'Ropa' },
    recibes: { icono: '📓', nombre: 'Pack de marcadores', categoria: 'Libros' },
    contraparteNombre: 'Nikol C. Pardo', contraparteSede: 'Sede Kennedy', contraparteIniciales: 'NK', contraparteColor: '#f9a8d4',
    pasoActual: 1, estado: 'Cancelado',
    actualizado: 'Cancelado el 18 mar. 2025', motivoCancelacion: 'La contraparte no asistió al punto de encuentro acordado.'
  }
];

export const CONVERSACIONES_MOCK: Conversacion[] = [
  {
    id: 'conv1', contactoNombre: 'Laura Camila Herrera', contactoIniciales: 'LC', contactoColor: '#2f9d5b',
    contactoPrograma: 'Análisis y Desarrollo', contactoSede: 'Sede Kennedy', enLinea: true, ultimaConexion: 'En línea',
    ultimoMensaje: '¿Te parece el jueves a las 10?', hora: '10:41 am', etiquetaArticulo: 'Uniforme SENA', noLeidos: 0,
    intercambioArticulo: 'Uniforme SENA talla M a cambio de: Libro Java básico', intercambioEstado: 'En curso',
    mensajes: [
      { id: 'm1', texto: 'Hola Johan! Vi tu publicación del uniforme, me interesa mucho. Tengo el libro de Java que mencionas.', hora: '9:58 am', propio: false },
      { id: 'm2', texto: 'Hola Laura! Qué bueno, cuéntame más del libro, ¿qué edición es?', hora: '10:00 am', propio: true },
      { id: 'm3', texto: 'Es la 10ª edición, en muy buen estado. Te mando fotos:', hora: '10:05 am', propio: false },
      { id: 'm4', texto: 'Perfecto, se ve bien. Te envío propuesta formal entonces.', hora: '10:20 am', propio: true },
      { id: 'm5', texto: '¿Te parece el jueves a las 10?', hora: '10:41 am', propio: false }
    ]
  },
  {
    id: 'conv2', contactoNombre: 'Andrés M. Torres', contactoIniciales: 'AM', contactoColor: '#3b82f6',
    contactoPrograma: 'Análisis y Desarrollo', contactoSede: 'Sede Norte', enLinea: false, ultimaConexion: 'Última vez ayer',
    ultimoMensaje: 'Ok, te envío fotos del maletín', hora: 'Ayer', etiquetaArticulo: 'Teclado inalámbrico', noLeidos: 2,
    intercambioArticulo: 'Teclado inalámbrico a cambio de: Maletín universitario', intercambioEstado: 'Negociando',
    mensajes: [
      { id: 'm6', texto: 'Hola! Me interesa tu teclado, ¿sigue disponible?', hora: 'Ayer 3:10 pm', propio: false },
      { id: 'm7', texto: 'Sí, disponible. ¿Qué me ofreces?', hora: 'Ayer 3:20 pm', propio: true },
      { id: 'm8', texto: 'Ok, te envío fotos del maletín', hora: 'Ayer 3:45 pm', propio: false }
    ]
  },
  {
    id: 'conv3', contactoNombre: 'Nikol C. Pardo', contactoIniciales: 'NK', contactoColor: '#f9a8d4',
    contactoPrograma: 'Contabilización de operaciones', contactoSede: 'Sede Kennedy', enLinea: false, ultimaConexion: 'Última vez el lunes',
    ultimoMensaje: 'Perfecto, muchas gracias!', hora: 'Lun', etiquetaArticulo: 'Pack libros', noLeidos: 0,
    intercambioArticulo: 'Pack de libros a cambio de: Donación', intercambioEstado: 'Completado',
    mensajes: [
      { id: 'm9', texto: 'Hola! Vi el pack de libros de programación. ¿Siguen disponibles?', hora: 'Lun 11:00 am', propio: false },
      { id: 'm10', texto: 'Hola Nikol! Sí, todos disponibles. ¿Cuáles te interesan?', hora: 'Lun 11:05 am', propio: true },
      { id: 'm11', texto: 'Principalmente el de Python y Clean Code. ¿Los donas o propones trueque?', hora: 'Lun 11:15 am', propio: false },
      { id: 'm12', texto: 'Son donación, puedes llevártelos el miércoles en la sede.', hora: 'Lun 12:00 pm', propio: true },
      { id: 'm13', texto: 'Perfecto, muchas gracias!', hora: 'Lun 12:30 pm', propio: false }
    ]
  },
  {
    id: 'conv4', contactoNombre: 'Carlos M. Torres', contactoIniciales: 'CM', contactoColor: '#d9a441',
    contactoPrograma: 'Análisis y Desarrollo', contactoSede: 'Sede Centro', enLinea: false, ultimaConexion: 'Última vez el sábado',
    ultimoMensaje: 'Trueque completado, fue genial', hora: 'Sáb', etiquetaArticulo: 'Kit electrónica', noLeidos: 0,
    intercambioArticulo: 'Kit de electrónica a cambio de: Audífonos bluetooth', intercambioEstado: 'Completado',
    mensajes: [
      { id: 'm14', texto: 'Todo listo por mi parte, gracias por el trueque!', hora: 'Sáb 5:00 pm', propio: false },
      { id: 'm15', texto: 'Trueque completado, fue genial', hora: 'Sáb 5:02 pm', propio: false }
    ]
  },
  {
    id: 'conv5', contactoNombre: 'Sara R. López', contactoIniciales: 'SR', contactoColor: '#c4b5fd',
    contactoPrograma: 'Multimedia', contactoSede: 'Sede Centro', enLinea: false, ultimaConexion: 'Última vez el viernes',
    ultimoMensaje: '¿El artículo sigue disponible?', hora: 'Vie', etiquetaArticulo: 'Mouse + teclado', noLeidos: 1,
    intercambioArticulo: 'Mouse inalámbrico + teclado', intercambioEstado: 'Sin iniciar',
    mensajes: [
      { id: 'm16', texto: '¿El artículo sigue disponible?', hora: 'Vie 4:30 pm', propio: false }
    ]
  }
];

export const NOTIFICACIONES_MOCK: Notificacion[] = [
  { id: 'n1', tipo: 'propuesta', icono: '🤝', titulo: 'Nueva propuesta recibida', descripcion: 'Andrés F. Bonilla propuso un intercambio por tu publicación "Uniforme SENA talla M".', fecha: 'Hace 10 min', leida: false, publicacionId: 'p1' },
  { id: 'n2', tipo: 'mensaje', icono: '💬', titulo: 'Nuevo mensaje de Laura C. Herrera', descripcion: '¿Te parece el jueves a las 10?', fecha: 'Hace 25 min', leida: false, conversacionId: 'conv1' },
  { id: 'n3', tipo: 'trueque', icono: '🔄', titulo: 'Trueque actualizado', descripcion: 'Tu trueque con Andrés M. Torres pasó a estado "Negociando".', fecha: 'Hace 1 hora', leida: false, truequeId: 't2' },
  { id: 'n4', tipo: 'pqr', icono: '📮', titulo: 'PQR radicada exitosamente', descripcion: 'Referencia #PQR-2026-0043 · Recibirás respuesta en máx. 24h.', fecha: 'Hoy', leida: false },
  { id: 'n5', tipo: 'sistema', icono: '⭐', titulo: 'Nueva calificación recibida', descripcion: 'María V. Ospina te calificó con 4 estrellas por el intercambio de calculadora.', fecha: 'Ayer', leida: true },
  { id: 'n6', tipo: 'trueque', icono: '✅', titulo: 'Intercambio completado', descripcion: 'Tu trueque con Carlos M. Torres se marcó como completado.', fecha: 'Hace 3 días', leida: true, truequeId: 't3' }
];

export const PQR_MOCK: Pqr[] = [
  {
    id: 'pqr1', referencia: '#PQR-2026-0043', tipo: 'Petición', asunto: 'El artículo recibido no coincide con la descripción',
    descripcion: 'El artículo recibido no coincide completamente con la descripción publicada.',
    relacionado: 'Intercambio no completado', estado: 'En revisión', fechaRadicada: 'Radicada hoy',
    timeline: [{ texto: 'PQR radicada exitosamente', fecha: 'Hoy · pendiente de asignación' }]
  },
  {
    id: 'pqr2', referencia: '#PQR-2025-0018', tipo: 'Petición', asunto: 'Solicitud de información sobre política de trueques',
    descripcion: 'Solicito información detallada sobre las políticas de trueque de la plataforma.',
    relacionado: 'Consulta general', estado: 'Resuelta', fechaRadicada: 'Radicada: 5 abr. 2025', fechaResuelta: 'Resuelta: 7 abr. 2025',
    respuesta: 'Estimado aprendiz, las políticas de trueque están disponibles en el reglamento interno de RAS, sección 4. Cualquier duda adicional puede radicar una nueva petición.',
    timeline: [
      { texto: 'PQR radicada', fecha: '5 abr. 2025' },
      { texto: 'PQR resuelta', fecha: '7 abr. 2025' }
    ]
  }
];
