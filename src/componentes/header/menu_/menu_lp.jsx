import { Link } from "react-router-dom";
import Logo from "../../../assets/Imagens/logo_tcc1.png";

import Btn_tema from "../btn_tema/index";
import { FaSun,FaMoon } from "react-icons/fa";


import React, { useState } from 'react';
import "./menu.css";

const temas = [
  {id:"icon_tema", icon: <FaSun size={24}/>, classe: "tema-claro" },
  {id:"icon_tema", icon: <FaMoon size={24}/>, classe: "tema-escuro" }
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
        <Link to="/" id="link__"><img className="icon_header" src={Logo} alt="Logo" /></Link>
        <Link to="/cd" id="link__">Download</Link>
      
        <Link to="/planos" id="link__">Planos</Link>
        <Link to="/devs" id="link__">Desenvolvedores</Link> 
        <Link to="/devs" id="link__">Sobre</Link> 
      </div>
     
      <div className="links_direita">
        <Btn_tema  {...temas[temaAtivo]} onClick={alternarTema}/>
        <Link to="/login" id="link__">Login</Link>
        <Link to="/cadastro" id="link__">Cadastro</Link>
      </div>

    </div> 
  );
}