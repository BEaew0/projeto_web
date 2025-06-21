import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import { AuthProvider } from "./componentes/autenticação/index";
import './main.css';

export default function Layout_perfil() {
  return ( // Adicione o return aqui
    <AuthProvider>
      <TemaProvider>
        <div className="layout-perfil">
          <Outlet />
        </div>
      </TemaProvider>
    </AuthProvider>
  );
}