import { Routes, Route } from "react-router-dom";
import Layout_i from "./Layout_Inicial"; // Layout com Header + Footer
import LayoutLC from "./Layout_Auth"; // Layout sem Header/Footer (para Login/Cadastro)
import Pag_inicial from "./paginas/pag_inicial";
import Download from "./paginas/download";
import Planos from "./paginas/planos";
import Devs from "./paginas/devs";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import "./main.css"; // Corrigido: removi a barra no início

function App() {
  return (
    <Routes>
      
      <Route element={<Layout_i />}>
        <Route path="/" element={<Pag_inicial />} />
        <Route path="/download" element={<Download />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/devs" element={<Devs />} />
      </Route>

      
      <Route element={<LayoutLC />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Route>
    </Routes>
  );
}

export default App;