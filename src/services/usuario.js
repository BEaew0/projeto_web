import api from './api.js';

export const acharUsuario = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await api.get('buscar-dados-usuario', 
    {
      headers: {
        'accept': 'text/plain', // Header conforme o cURL
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } 
  catch (error) {
    if (error.response) 
    {
      if (error.response.status === 404) 
      {
        console.error('Erro 404: Endpoint não encontrado no backend.');
      } 
      else 
      {
        console.error(`Erro na requisição: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) 
    {
      console.error('Erro: Nenhuma resposta recebida do servidor.');
    } 
    else 
    {
      console.error('Erro ao configurar a requisição:', error.message);
    }
    throw error; 
  }
};