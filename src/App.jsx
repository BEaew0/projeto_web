import React from 'react';
import { Routes, Route } from "react-router-dom";

// Layouts
import Layout_i from "./Layout_Inicial"; 
import LayoutLC from "./Layout_Auth"; 
import Layout_user from "./Layout_user";
import Layout_perfil from './layout_perfil';

// Páginas
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
import PerfilUsuario from "./paginas/perfil";

// Auth
import { AuthProvider } from './componentes/autenticação/index';
import { PrivateRoute } from "./componentes/rotas/usuario";

// Estilo
import "./main.css";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rotas Públicas */}
        <Route element={<Layout_i />}>
          <Route path="/" element={<Pag_inicial />} />
          <Route path="/download" element={<Download />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        {/* Rotas de Login/Cadastro */}
        <Route element={<LayoutLC />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        {/* Rotas Privadas */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout_user />}>
            <Route path="/home" element={<Home />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/graficos" element={<VerGraficos />} />  
          </Route>
           <Route element={<Layout_perfil/>}>
                <Route path="/perfil" element={<PerfilUsuario />} />
             </Route>
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </AuthProvider>
  );
}
