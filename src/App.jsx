import { Routes, Route } from "react-router-dom";
import Header from "./componentes/header/headers/index";
import "./main.css";
import Footer from "./componentes/footer/index";
import Pag_inicial from "./paginas/pag_inicial/index";
import Download from "./paginas/download";
import Planos from "./paginas/planos";
import Devs from "./paginas/devs";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema"; // Importe o TemaProvider
import LayoutLC from "./Layout_Auth";

function App() {
  return (
    <TemaProvider> {}
      <div className="app"> {/* Substitui a tag body por div - mais adequado para React */}
        <Header/>
        <Routes>
          <Route path="/" element={<Pag_inicial />} />
          <Route path="/download" element={<Download/>}/>    
          <Route path="/planos" element={<Planos/>}/>
          <Route path="/devs" element={<Devs/>}/>

          <Route element={<LayoutLC/>}>
             <Route path="/login" element={<Login/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>
          </Route>
         
          
        </Routes>
        <main>
   
        </main>  
        <Footer/>
      </div>
    </TemaProvider>
  );
}

export default App;