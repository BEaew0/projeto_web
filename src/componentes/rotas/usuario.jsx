// Rotas privadasdo usuário
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hook';

export function PrivateRoute() {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}