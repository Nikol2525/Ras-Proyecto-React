import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import './PrivateLayout.css';

export function PrivateLayout() {
  const { estaAutenticado } = useAuth();
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout">
      <Navbar onMenuToggle={() => setSidebarAbierto((v) => !v)} />
      <div className="layout-body">
        {sidebarAbierto && <div className="overlay-movil" onClick={() => setSidebarAbierto(false)} />}
        <div className={'sidebar-slot' + (sidebarAbierto ? ' visible' : '')}>
          <Sidebar onItemClick={() => setSidebarAbierto(false)} />
        </div>
        <main className="contenido">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
