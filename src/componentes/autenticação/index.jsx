import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// Mock centralizado para testes
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
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

  const login = async (email, senha) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = MOCK_USERS.find(u =>
        u.email === email && u.senha === senha
      );

      if (user) {
        const mockToken = "mock-jwt-token";
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/home');
        return { success: true };
      }

      return { success: false, message: "Credenciais inválidas" };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, message: "Erro no login" };
    }
  };

  const logout = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  const updateUserPhoto = async (newPhoto) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedUser = { ...user, photo: newPhoto };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
