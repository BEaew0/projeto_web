import React from 'react';
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import LogoTS from './logo/index';
import BtnTema from "./../botoes/btn_tema";
import Menu_links from "../menu_/links_menu/index";
import "./menu.css";

const links_esquerda =[
  { link: "/download", classe: "link_esquerda", text: "Download" },
  { link: "/planos", classe: "link_esquerda", text: "Planos" },
  { link: "/sobre", classe: "link_esquerda", text: "Sobre" },
];

const links_direita =[
  { link: "/login", classe: "link_direita", text: "Login" },
  { link: "/cadastro", classe: "link_direita", text: "Cadastro" },
];

export default function Menu({ isLogged = false }) 
{
  return (
    <div className="menu__">
      

      {/* Lado Esquerdo (sempre mostra os mesmos links) */}
      <div className="links_esquerda">

      {isLogged ? 
      (
          <>
            <IoIosNotifications className="icon" />
             <LogoTS link={"/"} logo={Logo_ts}/>
          </>
        ) : (
          <>
            <LogoTS link={"/"} logo={Logo_ts}/>
            {links_esquerda.map((link, key) => (
              <Menu_links key={key} link={link.link} text={link.text} />
            ))}      
          </>     
        )
      }
     
      </div>

      {/* Lado Direito (condicional) */}
      <div className="links_direita">

        <BtnTema />

        {isLogged ? (// Se logado, mostra os ícones
            <>
              <button>
                <FaUserCircle className="icon"/>
              </button>
            </>
          ): 
          (
          // Se não logado, mostra os links normais
            <>
              {links_direita.map((link, key) => (
              <Menu_links key={key} link={link.link} text={link.text} />
            ))}
            </>

        )}
      </div>
    </div>
  );
}