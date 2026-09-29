import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Publicacion, PropuestaRecibida, TipoPublicacion, EstadoPublicacion } from '../types/publicacion';
import { PUBLICACIONES_MOCK, PUBLICACIONES_COMUNIDAD_MOCK } from '../data/mockData';

const ICONOS_POR_CATEGORIA: Record<string, string> = {
  Uniformes: '👕',
  Libros: '📚',
  Equipos: '🖥️',
  Ropa: '🎒',
  Herramientas: '🔧',
  Material: '🧮'
};

const FONDOS = ['#e7f5ec', '#eef2ff', '#fef9c3', '#fee2e2', '#e0f2fe', '#ede9fe'];

interface DatosNuevaPublicacion {
  titulo: string;
  descripcion: string;
  tipo: TipoPublicacion;
  categoria: string;
  sede: string;
}

interface StatsPublicaciones {
  total: number;
  activas: number;
  conPropuestas: number;
  pausadas: number;
  cerradas: number;
  vistasSemana: number;
}

interface PublicacionesContextValue {
  misPublicaciones: Publicacion[];
  publicacionesComunidad: Publicacion[];
  publicacionesRecientes: Publicacion[];
  stats: StatsPublicaciones;
  crearPublicacion: (datos: DatosNuevaPublicacion) => Publicacion;
  pausar: (id: string) => void;
  reactivar: (id: string) => void;
  editar: (id: string, cambios: Partial<Pick<Publicacion, 'titulo' | 'descripcion' | 'tipo' | 'categoria' | 'sede'>>) => void;
  aceptarPropuesta: (publicacionId: string, propuestaId: string) => void;
  rechazarPropuesta: (publicacionId: string, propuestaId: string) => void;
  agregarPropuestaComunidad: (publicacionId: string, propuesta: PropuestaRecibida) => void;
}

const PublicacionesContext = createContext<PublicacionesContextValue | null>(null);

export function PublicacionesProvider({ children }: { children: ReactNode }) {
  const [misPublicaciones, setMisPublicaciones] = useState<Publicacion[]>([...PUBLICACIONES_MOCK]);
  const [publicacionesComunidad, setPublicacionesComunidad] = useState<Publicacion[]>([...PUBLICACIONES_COMUNIDAD_MOCK]);

  const publicacionesRecientes = useMemo<Publicacion[]>(
    () => [...misPublicaciones.filter((p) => p.estado === 'Activa').slice(0, 3), ...publicacionesComunidad],
    [misPublicaciones, publicacionesComunidad]
  );

  const stats = useMemo<StatsPublicaciones>(() => ({
    total: misPublicaciones.length,
    activas: misPublicaciones.filter((p) => p.estado === 'Activa').length,
    conPropuestas: misPublicaciones.filter((p) => p.propuestas.length > 0).length,
    pausadas: misPublicaciones.filter((p) => p.estado === 'Pausada').length,
    cerradas: misPublicaciones.filter((p) => p.estado === 'Cerrada').length,
    vistasSemana: misPublicaciones.reduce((acc, p) => acc + p.vistas, 0)
  }), [misPublicaciones]);

  const crearPublicacion = useCallback((datos: DatosNuevaPublicacion): Publicacion => {
    const nueva: Publicacion = {
      id: 'p-' + Date.now(),
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      tipo: datos.tipo,
      categoria: datos.categoria,
      sede: datos.sede,
      estado: 'Activa',
      publicadaHace: 'Publicada hoy',
      vistas: 0,
      icono: ICONOS_POR_CATEGORIA[datos.categoria] ?? '📦',
      colorFondo: FONDOS[Math.floor(Math.random() * FONDOS.length)],
      autorNombre: 'Johan G.',
      autorIniciales: 'JG',
      autorColor: '#1a6b3c',
      progreso: 0,
      esNueva: true,
      propuestas: []
    };
    setMisPublicaciones((lista) => [nueva, ...lista]);
    return nueva;
  }, []);

  const actualizarEstado = useCallback((id: string, estado: EstadoPublicacion): void => {
    setMisPublicaciones((lista) => lista.map((p) => (p.id === id ? { ...p, estado } : p)));
  }, []);

  const pausar = useCallback((id: string) => actualizarEstado(id, 'Pausada'), [actualizarEstado]);
  const reactivar = useCallback((id: string) => actualizarEstado(id, 'Activa'), [actualizarEstado]);

  const editar = useCallback(
    (id: string, cambios: Partial<Pick<Publicacion, 'titulo' | 'descripcion' | 'tipo' | 'categoria' | 'sede'>>) => {
      setMisPublicaciones((lista) => lista.map((p) => (p.id === id ? { ...p, ...cambios } : p)));
    },
    []
  );

  const aceptarPropuesta = useCallback((publicacionId: string, propuestaId: string): void => {
    setMisPublicaciones((lista) =>
      lista.map((p) =>
        p.id === publicacionId
          ? { ...p, estado: 'Cerrada', progreso: 100, propuestas: p.propuestas.filter((pr) => pr.id !== propuestaId) }
          : p
      )
    );
  }, []);

  const rechazarPropuesta = useCallback((publicacionId: string, propuestaId: string): void => {
    setMisPublicaciones((lista) =>
      lista.map((p) =>
        p.id === publicacionId ? { ...p, propuestas: p.propuestas.filter((pr) => pr.id !== propuestaId) } : p
      )
    );
  }, []);

  const agregarPropuestaComunidad = useCallback((publicacionId: string, propuesta: PropuestaRecibida): void => {
    setPublicacionesComunidad((lista) =>
      lista.map((p) => (p.id === publicacionId ? { ...p, propuestas: [...p.propuestas, propuesta] } : p))
    );
  }, []);

  return (
    <PublicacionesContext.Provider
      value={{
        misPublicaciones,
        publicacionesComunidad,
        publicacionesRecientes,
        stats,
        crearPublicacion,
        pausar,
        reactivar,
        editar,
        aceptarPropuesta,
        rechazarPropuesta,
        agregarPropuestaComunidad
      }}
    >
      {children}
    </PublicacionesContext.Provider>
  );
}

export function usePublicaciones(): PublicacionesContextValue {
  const ctx = useContext(PublicacionesContext);
  if (!ctx) throw new Error('usePublicaciones debe usarse dentro de <PublicacionesProvider>');
  return ctx;
}
