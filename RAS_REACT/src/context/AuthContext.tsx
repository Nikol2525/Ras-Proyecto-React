import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Usuario } from '../types/usuario';
import { USUARIO_ACTUAL } from '../data/mockData';

const STORAGE_KEY = 'ras_auth_usuario';

interface DatosRegistro {
  nombre: string;
  correo: string;
  programa: string;
  contrasena: string;
}

interface AuthContextValue {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  iniciarSesion: (correo: string, contrasena: string) => boolean;
  registrar: (datos: DatosRegistro) => boolean;
  cerrarSesion: () => void;
  actualizarPerfil: (cambios: Partial<Usuario>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function calcularIniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/);
  const iniciales = partes.slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('');
  return iniciales || 'AP';
}

function recuperarSesion(): Usuario | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  } catch {
    return null;
  }
}

function guardarSesion(usuario: Usuario): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
  } catch {
    /* almacenamiento no disponible: se ignora en el prototipo */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => recuperarSesion());

  const iniciarSesion = useCallback((correo: string, contrasena: string): boolean => {
    const correoOk = correo.trim().toLowerCase() === USUARIO_ACTUAL.correo.toLowerCase();
    const passOk = contrasena === USUARIO_ACTUAL.contrasena;
    if (correoOk && passOk) {
      setUsuario(USUARIO_ACTUAL);
      guardarSesion(USUARIO_ACTUAL);
      return true;
    }
    return false;
  }, []);

  const registrar = useCallback((datos: DatosRegistro): boolean => {
    const nuevoUsuario: Usuario = {
      ...USUARIO_ACTUAL,
      id: 'u-' + Date.now(),
      nombre: datos.nombre || USUARIO_ACTUAL.nombre,
      correo: datos.correo || USUARIO_ACTUAL.correo,
      programa: datos.programa || USUARIO_ACTUAL.programa,
      contrasena: datos.contrasena || USUARIO_ACTUAL.contrasena,
      iniciales: calcularIniciales(datos.nombre || USUARIO_ACTUAL.nombre),
      totalTrueques: 0,
      totalArticulos: 0,
      rating: 0,
      totalResenas: 0
    };
    setUsuario(nuevoUsuario);
    guardarSesion(nuevoUsuario);
    return true;
  }, []);

  const cerrarSesion = useCallback((): void => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const actualizarPerfil = useCallback((cambios: Partial<Usuario>): void => {
    setUsuario((actual) => {
      if (!actual) return actual;
      const actualizado = { ...actual, ...cambios };
      guardarSesion(actualizado);
      return actualizado;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: usuario !== null,
        iniciarSesion,
        registrar,
        cerrarSesion,
        actualizarPerfil
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
