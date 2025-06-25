import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser} from "../../services/login";

export const AuthContext = createContext();

/* Mock comentado - agora usando a API real
export const MOCK_USERS = [
  {
    id: 1,
    nomE_USUARIO: "Usuário Teste",
    email: "teste@example.com",
    senha: "123456",
    photo: "https://example.com/user.jpg",
    role: "user"
  },
  {
    id: 2,
    nomE_USUARIO: "Admin Teste",
    email: "admin@example.com",
    senha: "admin123",
    photo: "https://example.com/admin.jpg",
    role: "admin"
  }
];
*/

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('userData');
        const storedToken = localStorage.getItem('accessToken');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Substituído o mock por chamada real à API
      /* Mock comentado
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = MOCK_USERS.find(u => u.email === email && u.senha === password);
      if (user) {
        const mockToken = "mock-jwt-token";
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/home');
        return { success: true };
      }
      return { success: false, message: "Credenciais inválidas" };
      */
      
      // Implementação real
      const result = await loginUser({
        email: email,
        senha: password
      });

      if (result.success) {
        setUser(result.user);
        navigate('/home');
      }

      return {
        success: result.success,
        message: result.message || (result.success ? 'Login bem-sucedido' : 'Credenciais inválidas')
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: 'Erro ao conectar com o servidor'
      };
    }
  };

  const logout = async () => {
    try {
      // Implementação real (não havia mock aqui)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  const updateUserPhoto = async (newPhoto) => {
    try {
      // Mock comentado - implementação real deve chamar a API
      /*
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedUser = { ...user, photo: newPhoto };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
      */
      
      // Implementação real (substitua por chamada à API quando disponível)
      const updatedUser = { ...user, photo: newPhoto };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      return { success: false, error: 'Falha ao atualizar foto' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        updateUserPhoto
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}