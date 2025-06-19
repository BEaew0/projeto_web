import { Routes, Route } from "react-router-dom";

import Layout_i from "./Layout_Inicial"; 
import LayoutLC from "./Layout_Auth"; 
import Layout_user from "./Layout_user";
import Contato from "./paginas/contato";
import Pag_inicial from "./paginas/pag_inicial";
import Download from "./paginas/download";
import Planos from "./paginas/planos";
import Sobre from "./paginas/Sobre";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Home from "./paginas/home";
import Estoque from "./paginas/estoque";
import VerGraficos from "./paginas/graficos";
import { PrivateRoute } from "./componentes/rotas/usuario";
import PerfilUsuario from "./paginas/perfil";
import LOL from "./paginas/TESTE";
import "./main.css";

export default function App() {
  return (
    <Auth>
      <Routes>
        {/* Rotas Públicas */}
        <Route element={<Layout_i />}>
          <Route path="/" element={<Pag_inicial />} />
          <Route path="/download" element={<Download />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato/>}/>
        </Route>

        {/* Rotas de Autenticação */}
        <Route element={<LayoutLC />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<PerfilUsuario />} /> 
        </Route>

        {/* Rotas Privadas */}
        <Route element={<PrivateRoute />}>
         <Route element={<Layout_user />}>
          <Route path="/home" element={<Home />} />
          <Route path="/estoque" element={<Estoque/>}/>
          <Route path="/graficos" element={<VerGraficos/>}/> 
          </Route>
        </Route>
       
        

        {/* Rota 404 */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>}/>
      </Routes>
    </Auth>
  );
}