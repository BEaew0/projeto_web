import api from './api.js';

export const buscarTodosEstoquesUser = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Usuário não autenticado');

        const response = await api.get(
            'https://srv869019.hstgr.cloud/api/Estoque/buscar-estoques-por-usuario',
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        // Transforma os dados para formato mais amigável se necessário
        return response.data.map(item => ({
            ...item,
            // Adicione transformações se necessário
        }));
        
    } catch (error) {
        console.error('Erro ao buscar estoques:', error);
        
        let errorMessage = 'Erro ao buscar estoques';
        let statusCode = null;

        if (error.response) {
            statusCode = error.response.status;
            
            switch(statusCode) {
                case 401:
                    errorMessage = 'Não autorizado - faça login novamente';
                    break;
                case 403:
                    errorMessage = 'Acesso negado - sem permissão';
                    break;
                case 404:
                    errorMessage = 'Endpoint não encontrado';
                    break;
                case 500:
                    errorMessage = 'Erro interno no servidor';
                    break;
                default:
                    errorMessage = error.response.data?.message || errorMessage;
            }
        } else if (error.request) {
            errorMessage = 'Sem resposta do servidor - verifique sua conexão';
        }

        const errorToThrow = new Error(errorMessage);
        errorToThrow.status = statusCode;
        throw errorToThrow;
    }
};