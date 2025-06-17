import api from './api.js';

export const cadastrarUser = async (userData) => {
    try {
        // Validação dos campos obrigatórios
        const requiredFields = ['NOME_USUARIO', 'EMAIL_USUARIO', 'CPF_USUARIO', 'SENHA_USUARIO'];
        const missingFields = requiredFields.filter(field => !userData[field]);
        
        if (missingFields.length > 0) {
            return { 
                success: false, 
                message: `Campos obrigatórios faltando: ${missingFields.join(', ')}`,
                status: 400
            };
        }

        // Formatação dos dados para a API (com nomes de campos consistentes)
        const body = {
            nomE_USUARIO: userData.NOME_USUARIO,
            emaiL_USUARIO: userData.EMAIL_USUARIO,
            cpF_USUARIO: userData.CPF_USUARIO.replace(/\D/g, ""),
            senhA_USUARIO: userData.SENHA_USUARIO,
            datA_NASC_USUARIO: userData.DATA_NASC_USUARIO || null,
            iD_ASSINATURA_FK: userData.ID_ASSINATURA_FK || 1,
            ...(userData.CNPJ_USUARIO && { 
                cnpJ_USUARIO: userData.CNPJ_USUARIO.replace(/\D/g, "") 
            })
        };

        console.log('Enviando para API:', body); // Debug

        const response = await api.post("/api/Usuarios/criar-usuario", body);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return { 
            success: true, 
            data: response.data,
            message: "Cadastro realizado com sucesso!",
            status: response.status
        };
    } catch (error) {
        console.error("Erro detalhado:", error);
        
        let errorMessage = "Erro ao conectar com o servidor";
        let status = 500;

        if (error.response) {
            status = error.response.status;
            errorMessage = error.response.data?.message || 
                         error.response.data?.title ||
                         error.response.statusText;
        } else if (error.request) {
            errorMessage = "O servidor não respondeu. Verifique sua conexão.";
        }

        return { 
            success: false, 
            message: errorMessage,
            status: status,
            error: error.message
        };
    }
};