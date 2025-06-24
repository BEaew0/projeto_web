import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { AuthContext } from '../../autenticação'
import LogoTS from './logo/index';
import BtnTema from "./../botoes/btn_tema";
import Menu_links from "../menu_/links_menu/index";
import "./menu.css";
import Logo_ts from "../../../assets/Imagens/logo_tcc1.png";

const links_esquerda = [
  { link: "/download", classe: "link_esquerda", text: "Download" },
  { link: "/planos", classe: "link_esquerda", text: "Planos" },
  { link: "/sobre", classe: "link_esquerda", text: "Sobre" },
];

const links_direita = [
  { link: "/login", classe: "link_direita", text: "Login" },
  { link: "/cadastro", classe: "link_direita", text: "Cadastro" },
];

export default function Header() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useContext(AuthContext);
  
  useEffect(() => {
    const fecharSubmenu = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", fecharSubmenu);
    return () => document.removeEventListener("mousedown", fecharSubmenu);
  }, []);

  const handleLogout = async () => {
    setDropdown(false);
    await logout(); // Aguarda o logout completar
    window.location.reload(); // Força recarregar a página para resetar todos os estados
  };

  // Se estiver carregando, não renderiza nada ou renderiza um loader
  if (loading) {
    return null;
  }

  return (
    <div className="menu__">
      <div className="links_esquerda">
        <LogoTS link={isAuthenticated ? "/home" : "/"} logo={Logo_ts} />
        
        {!isAuthenticated && links_esquerda.map((link, index) => (
          <Menu_links key={`left-${index}`} link={link.link} text={link.text} />
        ))}
      </div>

      <div className="links_direita">
        <BtnTema />

        {isAuthenticated ? (
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="btn_usuario" onClick={() => setDropdown(!dropdown)}>
              <FaUserCircle className="icon" />
             
            </button>

            {dropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => {
                  setDropdown(false);
                  navigate('/perfil');
                }}>
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
          links_direita.map((link, index) => (
            <Menu_links key={`right-${index}`} link={link.link} text={link.text} />
          ))
        )}
      </div>
    </div>
  );
}