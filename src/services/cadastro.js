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

        // Formatação dos dados conforme a API espera
        const payload = {
            nomE_USUARIO: userData.NOME_USUARIO,
            emaiL_USUARIO: userData.EMAIL_USUARIO,
            cpF_USUARIO: userData.CPF_USUARIO.replace(/\D/g, ''),
            senhA_USUARIO: userData.SENHA_USUARIO,
            iD_ASSINATURA_FK: userData.ID_ASSINATURA_FK || 1,
            // Campos opcionais
            ...(userData.DATA_NASC_USUARIO && { 
                datA_NASC_USUARIO: userData.DATA_NASC_USUARIO 
            }),
            ...(userData.CNPJ_USUARIO && { 
                cnpJ_USUARIO: userData.CNPJ_USUARIO.replace(/\D/g, '') 
            }),
            ...(userData.FOTO_USUARIO && { 
                fotO_USUARIO: userData.FOTO_USUARIO 
            })
        };

        console.log('Payload sendo enviado:', JSON.stringify(payload, null, 2));

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        };

        const response = await api.post('Usuarios/criar-usuario',payload,config);

        // Tratamento da resposta
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return {
            success: true,
            data: response.data,
            message: 'Usuário cadastrado com sucesso!',
            status: response.status
        };

    } catch (error) {
        console.error('Erro detalhado:', error);
        
        let errorMessage = 'Erro ao processar a requisição';
        let statusCode = 500;
        let serverMessage = null;

        if (error.response) {
            statusCode = error.response.status;
            serverMessage = error.response.data?.message || 
                           error.response.data?.error ||
                           JSON.stringify(error.response.data);
            
            errorMessage = `Erro no servidor: ${serverMessage}`;
        } else if (error.request) {
            errorMessage = 'Sem resposta do servidor - verifique sua conexão';
        }

        return {
            success: false,
            message: errorMessage,
            status: statusCode,
            serverMessage: serverMessage,
            error: error.message
        };
    }
};