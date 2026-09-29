import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Notificacion } from '../types/notificacion';
import { NOTIFICACIONES_MOCK } from '../data/mockData';

interface NotificacionesContextValue {
  notificaciones: Notificacion[];
  noLeidas: number;
  marcarLeida: (id: string) => void;
  marcarTodasLeidas: () => void;
}

const NotificacionesContext = createContext<NotificacionesContextValue | null>(null);

export function NotificacionesProvider({ children }: { children: ReactNode }) {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([...NOTIFICACIONES_MOCK]);

  const noLeidas = useMemo(() => notificaciones.filter((n) => !n.leida).length, [notificaciones]);

  const marcarLeida = useCallback((id: string): void => {
    setNotificaciones((lista) => lista.map((n) => (n.id === id ? { ...n, leida: true } : n)));
  }, []);

  const marcarTodasLeidas = useCallback((): void => {
    setNotificaciones((lista) => lista.map((n) => ({ ...n, leida: true })));
  }, []);

  return (
    <NotificacionesContext.Provider value={{ notificaciones, noLeidas, marcarLeida, marcarTodasLeidas }}>
      {children}
    </NotificacionesContext.Provider>
  );
}

export function useNotificaciones(): NotificacionesContextValue {
  const ctx = useContext(NotificacionesContext);
  if (!ctx) throw new Error('useNotificaciones debe usarse dentro de <NotificacionesProvider>');
  return ctx;
}
