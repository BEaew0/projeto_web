import { Routes, Route } from "react-router-dom";
import { Auth } from "./componentes/auth_teste";
// Layouts específicos
import Layout_i from "./Layout_Inicial"; 
import LayoutLC from "./Layout_Auth"; 
import Layout_user from "./Layout_user";
// Páginas
import Contato from "./paginas/contato";
import Pag_inicial from "./paginas/pag_inicial";
import Download from "./paginas/download";
import Planos from "./paginas/planos";
import Devs from "./paginas/devs";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Home from "./paginas/home";
import PrivateRoute from "./componentes/rotas/usuario";
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
          <Route path="/devs" element={<Devs />} />
          <Route path="/contato" element={<Contato/>}/>
        </Route>

        {/* Rotas de Autenticação */}
        <Route element={<LayoutLC />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        {/* Rotas Privadas */}
        <Route element={<PrivateRoute><Layout_user /></PrivateRoute>}>
          <Route path="/home" element={<Home />} />
          {/* Adicione outras rotas privadas aqui */}
        </Route>

        {/* Rota de fallback (opcional) */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </Auth>
  );
}

