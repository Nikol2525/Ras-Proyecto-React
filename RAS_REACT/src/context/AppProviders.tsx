import type { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { ResenasProvider } from './ResenasContext';
import { PublicacionesProvider } from './PublicacionesContext';
import { TruequesProvider } from './TruequesContext';
import { MensajesProvider } from './MensajesContext';
import { NotificacionesProvider } from './NotificacionesContext';
import { PqrProvider } from './PqrContext';

/** ResenasProvider depende de AuthContext, por eso va anidado justo debajo. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ResenasProvider>
        <PublicacionesProvider>
          <TruequesProvider>
            <MensajesProvider>
              <NotificacionesProvider>
                <PqrProvider>{children}</PqrProvider>
              </NotificacionesProvider>
            </MensajesProvider>
          </TruequesProvider>
        </PublicacionesProvider>
      </ResenasProvider>
    </AuthProvider>
  );
}
