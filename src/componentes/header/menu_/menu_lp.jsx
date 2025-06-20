import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from '../../hook/index';
import LogoTS from './logo/index';
import BtnTema from "./../botoes/btn_tema";
import Menu_links from "../menu_/links_menu/index";
import { logoutUser } from '../../../services/logout';
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

export default function Menu() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { autenticado } = useAuth(); // Use o hook aqui

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
    // Não precisa mais do setAuthenticated - o hook vai lidar com isso
    window.location.reload(); // Força a atualização do estado de autenticação
  };

  const handleConfiguracoes = () => {
    navigate('/perfil');
    setDropdown(false);
  };

  return (
    <div className="menu__">
      {/* Lado Esquerdo */}
      <div className="links_esquerda">
        <LogoTS link={autenticado ? "/home" : "/"} logo={Logo_ts} />
        {!autenticado && links_esquerda.map((link, key) => (
          <Menu_links key={key} link={link.link} text={link.text} />
        ))}
      </div>

      {/* Lado Direito */}
      <div className="links_direita">
        <BtnTema />

        {autenticado ? (
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
        ) : (
          links_direita.map((link, key) => (
            <Menu_links key={key} link={link.link} text={link.text} />
          ))
        )}
      </div>
    </div>
  );
}