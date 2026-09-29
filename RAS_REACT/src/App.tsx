import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateLayout } from './common/layout/PrivateLayout';
import { Landing } from './components/Landing/Landing';
import { Auth } from './components/Auth/Auth';
import { Inicio } from './components/Inicio/Inicio';
import { Explorar } from './components/Explorar/Explorar';
import { MiPerfil } from './components/MiPerfil/MiPerfil';
import { MisPublicaciones } from './components/MisPublicaciones/MisPublicaciones';
import { MisTrueques } from './components/MisTrueques/MisTrueques';
import { Mensajes } from './components/Mensajes/Mensajes';
import { Notificaciones } from './components/Notificaciones/Notificaciones';
import { Pqr } from './components/Pqr/Pqr';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />

      <Route element={<PrivateLayout />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
        <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
        <Route path="/mis-trueques" element={<MisTrueques />} />
        <Route path="/mensajes" element={<Mensajes />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/pqr" element={<Pqr />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
