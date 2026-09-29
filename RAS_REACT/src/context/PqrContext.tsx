import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Pqr, TipoPqr } from '../types/pqr';
import { PQR_MOCK } from '../data/mockData';

interface DatosNuevaPqr {
  tipo: TipoPqr;
  asunto: string;
  descripcion: string;
  relacionado: string;
}

interface StatsPqr {
  radicadas: number;
  resueltas: number;
  enProceso: number;
  satisfaccion: number;
}

interface PqrContextValue {
  pqrs: Pqr[];
  stats: StatsPqr;
  radicar: (datos: DatosNuevaPqr) => Pqr;
}

const PqrContext = createContext<PqrContextValue | null>(null);

export function PqrProvider({ children }: { children: ReactNode }) {
  const [pqrs, setPqrs] = useState<Pqr[]>([...PQR_MOCK]);

  const stats = useMemo<StatsPqr>(() => {
    const resueltas = pqrs.filter((p) => p.estado === 'Resuelta').length;
    return { radicadas: pqrs.length, resueltas, enProceso: pqrs.length - resueltas, satisfaccion: 4.8 };
  }, [pqrs]);

  const radicar = useCallback(
    (datos: DatosNuevaPqr): Pqr => {
      const numero = String(pqrs.length + 43).padStart(4, '0');
      const nueva: Pqr = {
        id: 'pqr-' + Date.now(),
        referencia: `#PQR-2026-${numero}`,
        tipo: datos.tipo,
        asunto: datos.asunto,
        descripcion: datos.descripcion,
        relacionado: datos.relacionado || 'Consulta general',
        estado: 'Radicada',
        fechaRadicada: 'Radicada hoy',
        timeline: [{ texto: 'PQR radicada exitosamente', fecha: 'Hoy · pendiente de asignación' }]
      };
      setPqrs((lista) => [nueva, ...lista]);
      return nueva;
    },
    [pqrs]
  );

  return <PqrContext.Provider value={{ pqrs, stats, radicar }}>{children}</PqrContext.Provider>;
}

export function usePqr(): PqrContextValue {
  const ctx = useContext(PqrContext);
  if (!ctx) throw new Error('usePqr debe usarse dentro de <PqrProvider>');
  return ctx;
}
