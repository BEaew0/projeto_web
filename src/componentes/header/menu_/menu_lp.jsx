
import React, { useState } from 'react';
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";
import LogoTS from './logo/index';
import Btn_tema from "./btn_tema/index";
import Menu_header from "../menu_/links_menu/index";
import { FaSun, FaMoon } from "react-icons/fa";
import "./menu.css";

const temas =
  [
    { id: "icon_tema", icon: <FaSun id="icon-r"/>, classe: "tema-claro" },
    { id: "icon_tema", icon: <FaMoon id="icon-r" />, classe: "tema-escuro" }
  ];

const links_esquerda =
  [
    { link: "/download", classe: "link_esquerda", text: "Download" },
    { link: "/planos", classe: "link_esquerda", text: "Planos" },
    { link: "/devs", classe: "link_esquerda", text: "Desenvolvedores" },
  ];

const links_direita =
  [
    { link: "/login", classe: "link_direita", text: "Login" },
    { link: "/cadastro", classe: "link_direita", text: "Cadastro" },
  ];

export default function Menu() {
  const temaClaro = 0;
  const temaEscuro = 1;
  const [temaAtivo, setTemaAtual] = useState(temaClaro);
  const alternarTema = () => {
    setTemaAtual(temaAtivo === temaClaro ? temaEscuro : temaClaro);
  };

  return (
    <div className="menu__">

      <div className="links_esquerda">
        <Link to="/" id="link__"><img className="icon_header" src={Logo} alt="Logo" /></Link>
        <Link to="/download" id="link__">Download</Link>
      
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