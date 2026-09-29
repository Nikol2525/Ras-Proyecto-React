export interface MensajeChat {
  id: string;
  texto: string;
  hora: string;
  propio: boolean;
}

export interface Conversacion {
  id: string;
  contactoNombre: string;
  contactoIniciales: string;
  contactoColor: string;
  contactoPrograma: string;
  contactoSede: string;
  enLinea: boolean;
  ultimaConexion: string;
  ultimoMensaje: string;
  hora: string;
  etiquetaArticulo: string;
  noLeidos: number;
  intercambioArticulo: string;
  intercambioEstado: string;
  mensajes: MensajeChat[];
}
