// componentes/auth_teste.jsx
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export  function Auth({ children }) {
  const [Logado, setLogado] = useState(false);

  const login = () => setLogado(true);
  const logout = () => setLogado(false);

  return (
    <AuthContext.Provider value={{ Logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acessar o contexto
export default function useAuth() {
  return useContext(Logado);
}
