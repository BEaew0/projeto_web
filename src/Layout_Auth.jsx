// Layout_Auth.jsx (deve ser algo assim)
import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import "./main.css";
function LayoutLC() {
  return (
     <TemaProvider> {}
      <div className="auth-layout">
        <Outlet /> {}
      </div>
    </TemaProvider>
  );
}

export default LayoutLC;