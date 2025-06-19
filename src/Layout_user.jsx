// Layout_user.js
import { Outlet, Navigate } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import Footer from "./componentes/footer";
import Header from "./componentes/header/headers";
import { useAuth } from "./componentes/autenticação";
import './main.css';

export default function Layout_user() {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return <div className="loading-screen">Carregando...</div>;
  }

  if (!autenticado) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return (
    <TemaProvider>
      <Header />
      <div className="usuario-layout">
        <Outlet />
      </div>
      <Footer />
    </TemaProvider>
  );
}