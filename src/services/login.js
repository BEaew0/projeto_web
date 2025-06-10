import api from './api.js';

export const loginUser = async (userData) => {
    try {
        // Limpa dados sensíveis antes do envio
        const credentials = {
            email: userData.email.trim().toLowerCase(),
            senha: userData.senha
        };

        const response = await api.post("/Usuarios/login", credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true // Para cookies HTTP-only
        });

        if (response.data.accessToken) {
            // Armazena apenas o token necessário
            localStorage.setItem('accessToken', response.data.accessToken);
            
            // Se usar refresh token (deve ser HTTP-only)
            if (response.data.refreshToken) {
                // O refresh token deve ser armazenado em cookie seguro pelo backend
                console.log('Refresh token recebido e armazenado como HTTP-only cookie');
            }

            return {
                success: true,
                user: response.data.user, // Dados do usuário (sem dados sensíveis)
                accessToken: response.data.accessToken
            };
        }

        throw new Error('Token não recebido na resposta');

    } catch (error) {
        console.error('Erro no login:', error);
        
        let errorMessage = "Erro ao realizar login";
        let statusCode = 500;

        if (error.response) {
            // Erros da API
            statusCode = error.response.status;
            
            switch (statusCode) {
                case 400:
                    errorMessage = "Dados inválidos";
                    break;
                case 401:
                    errorMessage = "Email ou senha incorretos";
                    break;
                case 403:
                    errorMessage = "Conta desativada ou sem permissão";
                    break;
                case 404:
                    errorMessage = "Usuário não encontrado";
                    break;
                case 429:
                    errorMessage = "Muitas tentativas. Tente novamente mais tarde";
                    break;
                default:
                    errorMessage = error.response.data?.message || "Erro no servidor";
            }
        } else if (error.request) {
            errorMessage = "Sem resposta do servidor";
        }

        return {
            success: false,
            message: errorMessage,
            status: statusCode
        };
    }
};

// Função para verificar token armazenado
export const verifyAuth = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) return { isAuthenticated: false };

    try {
        const response = await api.get("/auth/verify", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return {
            isAuthenticated: response.data.isValid,
            user: response.data.user
        };
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return { isAuthenticated: false };
    }
};

// Função para logout
export const logoutUser = async () => {
    try {
        // Chama endpoint de logout no backend para invalidar tokens
        await api.post("/auth/logout", {}, {
            withCredentials: true // Para limpar cookies HTTP-only
        });
        
        // Limpa tokens do frontend
        localStorage.removeItem('accessToken');
        
        return { success: true };
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        return {
            success: false,
            message: error.response?.data?.message || "Erro ao encerrar sessão"
        };
    }
};