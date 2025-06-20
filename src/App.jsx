import React from 'react';
import { Routes, Route } from "react-router-dom";

// Layout Components
import Layout_i from "./Layout_Inicial"; 
import LayoutLC from "./Layout_Auth"; 
import Layout_user from "./Layout_user";

// Page Components
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

// Auth Components
import { AuthProvider } from './componentes/autenticação/index'
import { PrivateRoute } from "./componentes/rotas/usuario";

// Styles
import "./main.css";

export default function App() {
  return (
    <AuthProvider> {/* Changed from <Auth> to <AuthProvider> */}
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout_i />}>
          <Route path="/" element={<Pag_inicial />} />
          <Route path="/download" element={<Download />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato/>}/>
        </Route>

        {/* Authentication Routes */}
        <Route element={<LayoutLC />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout_user />}>
            <Route path="/home" element={<Home />} />
            <Route path="/estoque" element={<Estoque/>}/>
            <Route path="/graficos" element={<VerGraficos/>}/> 
            <Route path="/perfil" element={<PerfilUsuario />} /> {/* Moved inside PrivateRoute */}
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>}/>
      </Routes>
    </AuthProvider>
  );
}