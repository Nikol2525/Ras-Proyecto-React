import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Trueque } from '../types/trueque';
import { TRUEQUES_MOCK } from '../data/mockData';

interface StatsTrueques {
  total: number;
  enCurso: number;
  negociando: number;
  completados: number;
  cancelados: number;
}

interface DatosNuevoTrueque {
  ofreces: Trueque['ofreces'];
  recibes: Trueque['recibes'];
  contraparteNombre: string;
  contraparteSede: string;
  contraparteIniciales: string;
  contraparteColor: string;
}

interface TruequesContextValue {
  trueques: Trueque[];
  stats: StatsTrueques;
  porId: (id: string) => Trueque | undefined;
  subirEvidencia: (id: string) => void;
  cancelar: (id: string, motivo?: string) => void;
  crear: (datos: DatosNuevoTrueque) => Trueque;
  calificar: (id: string) => void;
}

const TruequesContext = createContext<TruequesContextValue | null>(null);

export function TruequesProvider({ children }: { children: ReactNode }) {
  const [trueques, setTrueques] = useState<Trueque[]>([...TRUEQUES_MOCK]);

  const stats = useMemo<StatsTrueques>(() => ({
    total: trueques.length,
    enCurso: trueques.filter((t) => t.estado === 'En curso').length,
    negociando: trueques.filter((t) => t.estado === 'Negociando' || t.estado === 'Esperando respuesta').length,
    completados: trueques.filter((t) => t.estado === 'Completado').length,
    cancelados: trueques.filter((t) => t.estado === 'Cancelado').length
  }), [trueques]);

  const porId = useCallback((id: string) => trueques.find((t) => t.id === id), [trueques]);

  const subirEvidencia = useCallback((id: string): void => {
    setTrueques((lista) =>
      lista.map((t) => (t.id === id ? { ...t, evidenciaSubida: true, pasoActual: 4, actualizado: 'Actualizado ahora' } : t))
    );
  }, []);

  const cancelar = useCallback((id: string, motivo = 'Cancelado por el usuario.'): void => {
    setTrueques((lista) =>
      lista.map((t) =>
        t.id === id ? { ...t, estado: 'Cancelado', motivoCancelacion: motivo, actualizado: 'Cancelado ahora mismo' } : t
      )
    );
  }, []);

  const crear = useCallback((datos: DatosNuevoTrueque): Trueque => {
    const nuevo: Trueque = {
      id: 't-' + Date.now(),
      ofreces: datos.ofreces,
      recibes: datos.recibes,
      contraparteNombre: datos.contraparteNombre,
      contraparteSede: datos.contraparteSede,
      contraparteIniciales: datos.contraparteIniciales,
      contraparteColor: datos.contraparteColor,
      pasoActual: 1,
      estado: 'Negociando',
      actualizado: 'Actualizado ahora'
    };
    setTrueques((lista) => [nuevo, ...lista]);
    return nuevo;
  }, []);

  const calificar = useCallback((id: string): void => {
    setTrueques((lista) => lista.map((t) => (t.id === id ? { ...t, calificado: true } : t)));
  }, []);

  return (
    <TruequesContext.Provider value={{ trueques, stats, porId, subirEvidencia, cancelar, crear, calificar }}>
      {children}
    </TruequesContext.Provider>
  );
}

export function useTrueques(): TruequesContextValue {
  const ctx = useContext(TruequesContext);
  if (!ctx) throw new Error('useTrueques debe usarse dentro de <TruequesProvider>');
  return ctx;
}
