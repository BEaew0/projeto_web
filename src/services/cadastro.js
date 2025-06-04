import api from './api.js';

export const cadastrarUser = async (userData) => {
    try {
        const response = await api.post("/Usuarios/criar-usuario", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        
        // Tratamento mais detalhado de erros
        let errorMessage = "Erro ao cadastrar usuário";
        
        if (error.response) {
            // Erros 4xx/5xx
            errorMessage = error.response.data?.message || 
                         error.response.data?.title || 
                         error.response.statusText;
            
            console.error("Detalhes do erro:", error.response.data);
        } else if (error.request) {
      
            errorMessage = "Sem resposta do servidor";
        }
        
        return {
            success: false,
            message: errorMessage,
            status: error.response?.status
        };
    }
};