export type TipoPublicacion = 'Trueque' | 'Donación';
export type EstadoPublicacion = 'Activa' | 'Pausada' | 'Cerrada';

export interface PropuestaRecibida {
  id: string;
  nombre: string;
  iniciales: string;
  colorAvatar: string;
  ofrece: string;
}

export interface Publicacion {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoPublicacion;
  categoria: string;
  sede: string;
  estado: EstadoPublicacion;
  publicadaHace: string;
  vistas: number;
  icono: string;
  colorFondo: string;
  autorNombre: string;
  autorIniciales: string;
  autorColor: string;
  progreso: number;
  esNueva?: boolean;
  propuestas: PropuestaRecibida[];
}
