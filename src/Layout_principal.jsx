import { Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom'
import Header from "./componentes/header/headers/index";
import "./main.css";  // Caminho relativo corrigido (sem a barra no início)
import Footer from "./componentes/footer/index";
import Pag_inicial from "./paginas/pag_inicial/index";
import Download from "./paginas/download";
import Planos from "./paginas/planos";
import Devs from "./paginas/devs";


function App() {
  return (
    <>
      <Header/> 

        <main>
        <Routes>
          <Route path="/" element={<Pag_inicial />} />
           <Route path="/download" element={<Download/>}/>    
           <Route path="/planos" element={<Planos/>}/>
           <Route path="/devs" element={<Devs/>}/>
        </Routes>
      </main>  
     <Footer/>
    </>
  );
}

export default App;