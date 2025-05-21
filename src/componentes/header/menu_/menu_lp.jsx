import React from 'react';
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";
import LogoTS from './logo/index';
import BtnTema from "./../botoes/btn_tema";
import Menu_links from "../menu_/links_menu/index";

import "./menu.css";

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

  return (
    <div className="menu__">

        <div className="links_esquerda">
            <LogoTS link={"/pag_inicial"} logo={Logo_ts}/>
              {links_esquerda.map((link,key)=> 
              <Menu_links key={key} link={link.link} text={link.text}/>)}
        </div>
     
        <div className="links_direita">
            <BtnTema /> {}
            {links_direita.map((link,key)=> 
              <Menu_links key={key} link={link.link} text={link.text}/>)}
        </div>

    </div>
  );
}