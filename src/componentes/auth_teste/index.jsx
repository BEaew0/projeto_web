// src/context/AuthContext.js
import { createContext, useState, useContext } from 'react';

// 1. Criar o contexto
const AuthContext = createContext();

// 2. Criar o provedor (Provider)
export function Auth({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  // Função de login (simulada)
  const login = (userData) => 
  {
    setIsLogged(true);
    setUser(userData);
  };

  // Função de logout
  const logout = () => {
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}