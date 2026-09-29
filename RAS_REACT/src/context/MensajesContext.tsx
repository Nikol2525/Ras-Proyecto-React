import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Conversacion } from '../types/mensaje';
import { CONVERSACIONES_MOCK } from '../data/mockData';

interface DatosNuevaConversacion {
  contactoNombre: string;
  contactoIniciales: string;
  contactoColor: string;
  contactoSede: string;
  etiquetaArticulo: string;
  intercambioArticulo: string;
  mensajeInicial: string;
}

interface MensajesContextValue {
  conversaciones: Conversacion[];
  totalNoLeidos: number;
  porId: (id: string) => Conversacion | undefined;
  marcarLeida: (id: string) => void;
  enviarMensaje: (conversacionId: string, texto: string) => void;
  iniciarConversacion: (datos: DatosNuevaConversacion) => string;
}

const MensajesContext = createContext<MensajesContextValue | null>(null);

function horaActual(): string {
  return new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

export function MensajesProvider({ children }: { children: ReactNode }) {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>(() =>
    JSON.parse(JSON.stringify(CONVERSACIONES_MOCK))
  );

  const totalNoLeidos = useMemo(
    () => conversaciones.reduce((acc, c) => acc + c.noLeidos, 0),
    [conversaciones]
  );

  const porId = useCallback((id: string) => conversaciones.find((c) => c.id === id), [conversaciones]);

  const marcarLeida = useCallback((id: string): void => {
    setConversaciones((lista) => lista.map((c) => (c.id === id ? { ...c, noLeidos: 0 } : c)));
  }, []);

  const enviarMensaje = useCallback((conversacionId: string, texto: string): void => {
    const hora = horaActual();
    setConversaciones((lista) =>
      lista.map((c) => {
        if (c.id !== conversacionId) return c;
        const nuevoMensaje = { id: 'm-' + Date.now(), texto, hora, propio: true };
        return { ...c, mensajes: [...c.mensajes, nuevoMensaje], ultimoMensaje: texto, hora: 'Ahora' };
      })
    );
  }, []);

  const iniciarConversacion = useCallback(
    (datos: DatosNuevaConversacion): string => {
      const existente = conversaciones.find((c) => c.contactoNombre === datos.contactoNombre);
      if (existente) {
        enviarMensaje(existente.id, datos.mensajeInicial);
        return existente.id;
      }
      const id = 'conv-' + Date.now();
      const hora = horaActual();
      const nueva: Conversacion = {
        id,
        contactoNombre: datos.contactoNombre,
        contactoIniciales: datos.contactoIniciales,
        contactoColor: datos.contactoColor,
        contactoPrograma: 'Aprendiz SENA',
        contactoSede: datos.contactoSede,
        enLinea: false,
        ultimaConexion: 'Última vez recientemente',
        ultimoMensaje: datos.mensajeInicial,
        hora,
        etiquetaArticulo: datos.etiquetaArticulo,
        noLeidos: 0,
        intercambioArticulo: datos.intercambioArticulo,
        intercambioEstado: 'Negociando',
        mensajes: [{ id: 'm-' + Date.now(), texto: datos.mensajeInicial, hora, propio: true }]
      };
      setConversaciones((lista) => [nueva, ...lista]);
      return id;
    },
    [conversaciones, enviarMensaje]
  );

  return (
    <MensajesContext.Provider
      value={{ conversaciones, totalNoLeidos, porId, marcarLeida, enviarMensaje, iniciarConversacion }}
    >
      {children}
    </MensajesContext.Provider>
  );
}

export function useMensajes(): MensajesContextValue {
  const ctx = useContext(MensajesContext);
  if (!ctx) throw new Error('useMensajes debe usarse dentro de <MensajesProvider>');
  return ctx;
}
