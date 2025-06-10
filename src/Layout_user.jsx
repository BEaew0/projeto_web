import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import Footer from "./componentes/footer";
import './main.css';

//layout do usuário
export default function Layout_user(){
 return(
    <TemaProvider>{}
        <div className="usuario-layout">
            <Outlet/>{}
        </div>
         <Footer />
    </TemaProvider>

 );

}

