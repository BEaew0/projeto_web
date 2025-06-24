import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import "./main.css";

export default function LayoutADM(){
    return(
        <TemaProvider>{}
            <div className="adm-layout">
                <Outlet/>{}
            </div>
        </TemaProvider>
    );
}