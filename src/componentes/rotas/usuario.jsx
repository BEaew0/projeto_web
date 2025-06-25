// Rotas privadas do usuário
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../autenticação'; // <- caminho corrigido

export function PrivateRoute() {
  const { isAuthenticated, loading, user } = useAuth();

  console.log('Auth state:', { isAuthenticated, loading, user });

  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
