import { Outlet } from "react-router-dom";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import Header from "./componentes/header/headers";
import Footer from "./componentes/footer";


export default function Layout_i() {
    return (
        <TemaProvider>
            <Header />
            <main>
                <Outlet /> {}
            </main>
            <Footer />
        </TemaProvider>
    );
}