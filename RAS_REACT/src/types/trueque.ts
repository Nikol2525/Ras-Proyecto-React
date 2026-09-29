export type EstadoTrueque =
  | 'En curso'
  | 'Negociando'
  | 'Esperando respuesta'
  | 'Completado'
  | 'Cancelado';

export interface ArticuloTrueque {
  icono: string;
  nombre: string;
  categoria: string;
}

export interface Trueque {
  id: string;
  ofreces: ArticuloTrueque;
  recibes: ArticuloTrueque;
  contraparteNombre: string;
  contraparteSede: string;
  contraparteIniciales: string;
  contraparteColor: string;
  pasoActual: 1 | 2 | 3 | 4 | 5;
  estado: EstadoTrueque;
  puntoEncuentro?: string;
  fechaAcordada?: string;
  actualizado: string;
  fechaCierre?: string;
  motivoCancelacion?: string;
  evidenciaSubida?: boolean;
  calificado?: boolean;
}
