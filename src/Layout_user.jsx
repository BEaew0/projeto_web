// src/componentes/Layout_user.jsx
import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import Footer from "./componentes/footer";
import Header from "./componentes/header/menu_/links_menu/index";
import { useAuth } from "./componentes/hook/index";
import './main.css';

export default function Layout_user() {
  // Remove a verificação de autenticação aqui
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