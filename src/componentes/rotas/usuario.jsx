// src/components/PrivateRoute.js
import { useAuth } from '../autenticação';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const { autenticado } = useAuth();

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}