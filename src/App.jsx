import { Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom'
import Header from "./componentes/header/headers/index";
import "./main.css";  // Caminho relativo corrigido (sem a barra no início)
import Footer from "./componentes/footer/index";





function App() {
  return (
    <>
      <Header /> 
     
        <main>
        <Routes>
              
                  
        </Routes>
   
      </main>
    
      
     <Footer/>
      
   
    </>
  );
}

export default App;