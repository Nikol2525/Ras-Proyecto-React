export type TipoPqr = 'Petición' | 'Queja' | 'Reclamo';
export type EstadoPqr = 'Radicada' | 'En revisión' | 'Resuelta';

export interface EventoPqr {
  texto: string;
  fecha: string;
}

export interface Pqr {
  id: string;
  referencia: string;
  tipo: TipoPqr;
  asunto: string;
  descripcion: string;
  relacionado: string;
  estado: EstadoPqr;
  fechaRadicada: string;
  fechaResuelta?: string;
  respuesta?: string;
  timeline: EventoPqr[];
}
