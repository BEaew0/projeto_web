import { Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom'
import Header from "./componentes/header/headers/index";
import Menu from "./componentes/header/menu_/menu_lp";
import "./main.css";  // Caminho relativo corrigido (sem a barra no início)
import Footer from "./componentes/footer/index";
import Pag_inicial from "./paginas/pag_inicial/index";
import Download from "./paginas/download";


function App() {
  return (
    <>
      <Header /> 
     
        <main>
        <Routes>
          <Route path="/" element={<Pag_inicial />} />
           <Route path="/download" element={<Download />} />
                  
        </Routes>
   
      </main>
    
      
     <Footer/>
      
   
    </>
  );
}

export default App;