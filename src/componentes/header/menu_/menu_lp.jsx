import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import LogoTS from './logo/index';
import BtnTema from "./../botoes/btn_tema";
import Menu_links from "../menu_/links_menu/index";
import { logoutUser } from '../../../services/logout';  // Importa logout
import PerfilUsuario from '../../../paginas/configurações';
import "./menu.css";

const links_esquerda = [
  { link: "/download", classe: "link_esquerda", text: "Download" },
  { link: "/planos", classe: "link_esquerda", text: "Planos" },
  { link: "/sobre", classe: "link_esquerda", text: "Sobre" },
];

const links_direita = [
  { link: "/login", classe: "link_direita", text: "Login" },
  { link: "/cadastro", classe: "link_direita", text: "Cadastro" },
];


export default function Menu({ isLogged = false }) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function fecharSubmenu(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", fecharSubmenu);
    return () => {
      document.removeEventListener("mousedown", fecharSubmenu);
    };
  }, []);

  const SubmenuAbrir = () => {
    setDropdown(!dropdown);
  };

  // Função para logout
  const handleLogout = () => {
    logoutUser();  
  };

  return (
    <div className="menu__">

      {/* Lado Esquerdo (sempre mostra os mesmos links) */}
      <div className="links_esquerda">
        {isLogged ? (
          <>
            <IoIosNotifications className="icon" />
            <LogoTS link={"/"} logo={Logo_ts} />
          </>
        ) : (
          <>
            <LogoTS link={"/"} logo={Logo_ts} />
            {links_esquerda.map((link, key) => (
              <Menu_links key={key} link={link.link} text={link.text} />
            ))}
          </>
        )}
      </div>

      {/* Links do lado direito*/}
      <div className="links_direita">

        {/* botão para mudança de tema */}
        <BtnTema />

        {isLogged ? (
          // Se logado, mostra os ícones  
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="btn_usuario" onClick={SubmenuAbrir}>
              <FaUserCircle className="icon" />
            </button>

            {dropdown && (
              <div className="dropdown-menu">

                <button className="dropdown-item">
                  <IoSettings className="dropdown-icon" />
                  <span>Configurações</span>
                </button>

                <button className="dropdown-item" onClick={handleLogout}>
                  <IoLogOut className="dropdown-icon" />
                  <span>Sair</span>
                </button>

              </div>
            )}
          </div>
        ) : (
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
