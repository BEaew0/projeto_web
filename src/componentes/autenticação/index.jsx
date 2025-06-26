// AuthContext.jsx
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLogin } from '../../services/login';
import { alterarImagemUsuario } from '../../services/alterardados';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificação inicial de autenticação ao carregar o app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('userData');

        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função de login completa
  const login = async (email, password) => {
    try {
      setLoading(true);

      const result = await apiLogin({ email, senha: password });

      if (!result.success) {
        return result;
      }

      // Salva o token e os dados do usuário
      localStorage.setItem('accessToken', result.token);
      localStorage.setItem('userData', JSON.stringify(result.user));
      setUser(result.user);

      return {
        success: true,
        user: result.user,
        message: result.message || 'Login realizado com sucesso'
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: error.message || 'Erro durante o login'
      };
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Atualização da imagem de perfil do usuário
  const updateUserImage = async (imagemBase64) => {
    try {
      const resultado = await alterarImagemUsuario(imagemBase64);

      if (resultado.success) {
        const updatedUser = { ...user, imagem: imagemBase64 };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      }

      return resultado;
    } catch (error) {
      console.error('Erro ao atualizar imagem:', error);
      return {
        success: false,
        message: 'Erro ao atualizar imagem'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: loading,
        login,
        logout,
        updateUserImage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
