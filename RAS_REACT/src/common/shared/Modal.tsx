import type { MouseEvent, ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  titulo: string;
  subtitulo?: string;
  icono?: string;
  ancho?: number;
  cerrarAlClickFuera?: boolean;
  onCerrar: () => void;
  children: ReactNode;
}

export function Modal({
  titulo,
  subtitulo,
  icono,
  ancho = 480,
  cerrarAlClickFuera = true,
  onCerrar,
  children
}: ModalProps) {
  const onOverlayClick = (evento: MouseEvent<HTMLDivElement>): void => {
    if (cerrarAlClickFuera && evento.target === evento.currentTarget) {
      onCerrar();
    }
  };

  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal-box" style={{ maxWidth: ancho }} role="dialog" aria-modal="true">
        <header className="modal-header">
          <h2>
            {icono && <span className="modal-icon">{icono}</span>} {titulo}
          </h2>
          <button className="modal-close" type="button" onClick={onCerrar} aria-label="Cerrar">
            ✕
          </button>
        </header>
        {subtitulo && <p className="modal-subtitulo">{subtitulo}</p>}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
