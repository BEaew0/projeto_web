import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import LogoTS from './logo/index';
import BtnTema from "./../botoes/btn_tema";
import Menu_links from "../menu_/links_menu/index";
import { logoutUser } from '../../../services/logout';
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
  const [authenticated, setAuthenticated] = useState(isLogged);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Sincroniza com o localStorage e monitora mudanças
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAuthenticated(!!token);
    
    const handleStorageChange = () => {
      const token = localStorage.getItem('accessToken');
      setAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isLogged]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function fecharSubmenu(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", fecharSubmenu);
    return () => document.removeEventListener("mousedown", fecharSubmenu);
  }, []);

  const SubmenuAbrir = () => setDropdown(!dropdown);

  const handleLogout = () => {
    logoutUser();
    setDropdown(false);
    setAuthenticated(false);
  };

  const handleConfiguracoes = () => {
    navigate('/perfil');
    setDropdown(false);
  };

  return (
    <div className="menu__">
      {/* Lado Esquerdo */}
      <div className="links_esquerda">
        <LogoTS link={"/"} logo={Logo_ts} />
        {!authenticated && links_esquerda.map((link, key) => (
          <Menu_links key={key} link={link.link} text={link.text} />
        ))}
      </div>

      {/* Lado Direito */}
      <div className="links_direita">
        <BtnTema />

        {authenticated ? (
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="btn_usuario" onClick={SubmenuAbrir}>
              <FaUserCircle className="icon" />
            </button>

            {dropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleConfiguracoes}>
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
        ) : 
        (
          links_direita.map((link, key) => (
            <Menu_links key={key} link={link.link} text={link.text} />
          ))
        )}
      </div>
    </div>
  );
}