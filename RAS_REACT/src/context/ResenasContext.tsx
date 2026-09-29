import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Resena } from '../types/resena';
import { RESENAS_MOCK } from '../data/mockData';
import { useAuth } from './AuthContext';

interface DatosCalificacion {
  nombreContraparte: string;
  estrellas: number;
  comentario: string;
}

interface ResenasContextValue {
  resenas: Resena[];
  promedio: number;
  calificar: (datos: DatosCalificacion) => void;
}

const ResenasContext = createContext<ResenasContextValue | null>(null);

const COLORES = ['#2f9d5b', '#3b82f6', '#d9a441', '#8b5cf6', '#f472b6'];

export function ResenasProvider({ children }: { children: ReactNode }) {
  const { usuario, actualizarPerfil } = useAuth();
  const [resenas, setResenas] = useState<Resena[]>([...RESENAS_MOCK]);

  const promedio = useMemo(() => {
    if (resenas.length === 0) return 0;
    const suma = resenas.reduce((acc, r) => acc + r.estrellas, 0);
    return Math.round((suma / resenas.length) * 10) / 10;
  }, [resenas]);

  const calificar = useCallback(
    (datos: DatosCalificacion): void => {
      const iniciales = datos.nombreContraparte
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p.charAt(0).toUpperCase())
        .join('');
      const nueva: Resena = {
        nombre: datos.nombreContraparte,
        iniciales: iniciales || 'AP',
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        estrellas: datos.estrellas,
        fecha: 'Hoy',
        comentario: datos.comentario || 'Sin comentario adicional.'
      };
      setResenas((lista) => [nueva, ...lista]);

      if (usuario) {
        const totalResenas = usuario.totalResenas + 1;
        const nuevoRating = Math.round(((usuario.rating * usuario.totalResenas + datos.estrellas) / totalResenas) * 10) / 10;
        actualizarPerfil({ totalResenas, rating: nuevoRating });
      }
    },
    [usuario, actualizarPerfil]
  );

  return <ResenasContext.Provider value={{ resenas, promedio, calificar }}>{children}</ResenasContext.Provider>;
}

export function useResenas(): ResenasContextValue {
  const ctx = useContext(ResenasContext);
  if (!ctx) throw new Error('useResenas debe usarse dentro de <ResenasProvider>');
  return ctx;
}
