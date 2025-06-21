// Rotas privadas do usuário
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../autenticação'; // <- caminho corrigido

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth(); // <- nomes corretos do seu AuthContext

  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
