
import React, { useState } from 'react';
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";
import LogoTS from './logo/index';
import Btn_tema from "./btn_tema/index";
import Menu_links from "../menu_/links_menu/index";
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
        <LogoTS link={"/"} logo={Logo_ts}/>
         {links_esquerda.map((link,key)=> 
         <Menu_links key={key} link={link.link} text={link.text}/>)}

      </div>
     
      <div className="links_direita">
        <Btn_tema  {...temas[temaAtivo]} onClick={alternarTema}/>
        {links_direita.map((link,key)=> 
         <Menu_links key={key} link={link.link} text={link.text}/>)}
     
      </div>


    </div>
  );
}