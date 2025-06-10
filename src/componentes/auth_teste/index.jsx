// componentes/auth_teste.jsx
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// Changed from AuthProvider to just Auth
export function Auth({ children }) {
  const [logado, setLogado] = useState(false);

  const login = () => setLogado(true);
  const logout = () => setLogado(false);

  return (
    <AuthContext.Provider value={{ logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}