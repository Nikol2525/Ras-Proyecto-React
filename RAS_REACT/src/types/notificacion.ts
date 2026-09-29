export type TipoNotificacion = 'propuesta' | 'mensaje' | 'trueque' | 'pqr' | 'sistema';

export interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  icono: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  leida: boolean;
  conversacionId?: string;
  truequeId?: string;
  publicacionId?: string;
}
