// src/componentes/Layout_user.jsx
import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import Footer from "./componentes/footer";
import Header from "./componentes/header/headers";
import { AuthProvider } from "./componentes/autenticação/index"; // Adicione esta linha
import './main.css';

export default function Layout_user() {
  return (
    <AuthProvider> {/* Envolva com AuthProvider */}
      <TemaProvider>
        <Header user={true}/>
        <div className="usuario-layout">
          <Outlet />
        </div>
        <Footer />
      </TemaProvider>
    </AuthProvider>
  );
}