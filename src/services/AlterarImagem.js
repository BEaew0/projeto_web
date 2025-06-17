import api from './api.js';

export const MudarImagem = async (imagemBase64) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Usuário não autenticado');

        const response = await api.patch(
            'https://srv869019.hstgr.cloud/alterar-imagem',
            {
                imagemBase64: imagemBase64
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } 
    catch (error) 
    {
        console.error('Erro ao alterar imagem:', error);
        
        // Melhorando o tratamento de erros
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Não autorizado - faça login novamente');
            } else if (error.response.status === 413) {
                throw new Error('Imagem muito grande');
            } else if (error.response.status === 400) {
                throw new Error('Formato de imagem inválido');
            }
        }
        
        throw error;
    }
};