import './StatCard.css';

interface StatCardProps {
  icono?: string;
  valor: string | number;
  etiqueta: string;
  className?: string;
}

export function StatCard({ icono, valor, etiqueta, className }: StatCardProps) {
  return (
    <div className={`stat-card ${className ?? ''}`}>
      {icono && <span className="stat-icon">{icono}</span>}
      <div className="stat-body">
        <span className="stat-valor">{valor}</span>
        <span className="stat-etiqueta">{etiqueta}</span>
      </div>
    </div>
  );
}
