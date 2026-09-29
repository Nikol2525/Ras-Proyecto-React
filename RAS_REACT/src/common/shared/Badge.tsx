import './Badge.css';

type ColorBadge = 'blue' | 'amber' | 'green' | 'red' | 'gray' | 'purple';

const MAPA_ESTADOS: Record<string, ColorBadge> = {
  Activa: 'green',
  Trueque: 'blue',
  Donación: 'amber',
  'En curso': 'blue',
  Negociando: 'amber',
  'Esperando respuesta': 'amber',
  Completado: 'green',
  Completada: 'green',
  Cerrada: 'gray',
  Pausada: 'gray',
  Cancelado: 'red',
  Cancelada: 'red',
  Radicada: 'purple',
  'En revisión': 'purple',
  Resuelta: 'green',
  Petición: 'blue',
  Queja: 'amber',
  Reclamo: 'red'
};

interface BadgeProps {
  estado: string;
  conPunto?: boolean;
}

export function Badge({ estado, conPunto = false }: BadgeProps) {
  const color = MAPA_ESTADOS[estado] ?? 'gray';
  return (
    <span className={`badge badge-${color}`}>
      {conPunto && <span className="dot" />}
      {estado}
    </span>
  );
}
