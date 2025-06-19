// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Instale com: npm install jwt-decode

export function useAuth() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setAutenticado(false);
        return;
      }

      try {
        // Verifica se o token está expirado
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp < Date.now() / 1000;
        
        setAutenticado(!isExpired);
        
        if (isExpired) {
          localStorage.removeItem('accessToken');
        }
      } catch (error) {
        setAutenticado
        
    ,(false);
        localStorage.removeItem('accessToken');
      }
    };

    validateToken();
    
    const handleStorageChange = () => validateToken();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return autenticado;
}