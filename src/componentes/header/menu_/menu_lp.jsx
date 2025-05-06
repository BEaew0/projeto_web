import { Link } from "react-router-dom";
import Logo from "../../../assets/Imagens/logo_tcc1.png";
import sol from "../../../assets/Imagens/sun-solid.svg";
import lua from "../../../assets/Imagens/moon-solid.svg";
import Btn_tema from "../btn_tema/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import  { faSun } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react';
import "./menu.css";


const temas = [
  { icon: sol, classe: "tema-claro" },
  { icon: lua, classe: "tema-escuro" }
];

export default function Menu() {

  const temaClaro=0;
  const temaEscuro=1;

  const [temaAtivo, setTemaAtual] = useState(temaClaro); 

  const alternarTema = () => 
  {
    setTemaAtual(temaAtivo === temaClaro ? temaEscuro: temaClaro);
  };

  return (
    <div className="menu__">
      <div className="links_esquerda">
        <Link to="/" id="link__">
          <img className="icon_header" src={Logo} alt="Logo" />
        </Link>
        <Link to="/download" id="link__">Download</Link>
        <Link to="/planos" id="link__">Planos</Link>
        <Link to="/devs" id="link__">Desenvolvedores</Link> 
        
      </div>
     
      <div className="links_direita">
         {/* Usando spread operator para passar todas as props */}
        <Btn_tema  {...temas[temaAtivo]} 
          onClick={alternarTema}/>
        
        <Link to="/login" id="link__">Login</Link>
        <Link to="/cadastro" id="link__">Cadastro</Link>
      </div>
    </div> 
  );
}