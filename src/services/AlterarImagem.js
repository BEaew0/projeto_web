import api from './api.js';

export const MudarImagem = async (imagemBase64) => {
    try {
        const response = await api.patch('Usuarios/alterar-imagem', {
            imagemBase64: imagemBase64
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        });
        return response.data;
    } 
    catch (error) 
    {
        console.error('Erro ao alterar imagem:', error);
        throw error; // Rejeita a promise para que o chamador possa lidar com o erro
    }
};