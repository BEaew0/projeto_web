import api from './api.js'; // Importação essencial para usar a instância do Axios

export const cadastrarUser = async (userData) => 
{
    try {
        // Validação rápida dos campos obrigatórios
        if (!userData.NOME_USUARIO || !userData.EMAIL_USUARIO || !userData.CPF_USUARIO || !userData.SENHA_USUARIO) 
        {
            return { success: false, message: "Campos obrigatórios faltando." };
        }

        // Prepara o body
        const body = {
            NOME_USUARIO: userData.NOME_USUARIO,
            EMAIL_USUARIO: userData.EMAIL_USUARIO,
            DATA_NASC_USUARIO: userData.DATA_NASC_USUARIO,
            CPF_USUARIO: userData.CPF_USUARIO.replace(/\D/g, ""), // Remove pontuação
            SENHA_USUARIO: userData.SENHA_USUARIO,
            ID_ASSINATURA_FK: userData.ID_ASSINATURA_FK || 1, // Default 1
            ...(userData.CNPJ_USUARIO && { CNPJ_USUARIO: userData.CNPJ_USUARIO.replace(/\D/g, "") }),
            ...(userData.FOTO_USUARIO && { FOTO_USUARIO: userData.FOTO_USUARIO }),
            ...(userData.DATA_VALIDADE_ASSINATURA_USUARIO && { DATA_VALIDADE_ASSINATURA_USUARIO: userData.DATA_VALIDADE_ASSINATURA_USUARIO 
            })
        };

        // Requisição com Axios
        const response = await api.post( "/Usuarios/criar-usuario",  body, { 
            headers: { 'Content-Type': 'application/json' }
         });

        // Salva token e user no localStorage
        if (response.data.token) 
        {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return { success: true, data: response.data };
    }
     catch (error) 
    {
        console.error("Erro ao cadastrar usuário:", error);
        let errorMessage = "Erro ao cadastrar usuário";

        if (error.response) {
            errorMessage = error.response.data?.message || error.response.data?.title ||  error.response.statusText;
            console.error("Detalhes do erro:", error.response.data);
        } 
        else if (error.request) 
        {
            errorMessage = "Sem resposta do servidor";
        }

        return { success: false, message: errorMessage, status: error.response?.status };
    }
};