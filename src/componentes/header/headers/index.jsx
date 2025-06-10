// Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Menu from "../menu_/menu_lp";

export default function Header() {
  const location = useLocation();
  
  // Define se está em rota privada (home)
  const isPrivate = location.pathname.startsWith("/home");

  return (
    <header className="main-header">
      <Menu isLogged={isPrivate} />
    </header>
  );
}
