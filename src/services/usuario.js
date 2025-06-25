import api from './api.js';

// Função original para buscar dados do usuário
export const acharUsuario = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await api.get('buscar-dados-usuario', {
      headers: {
        'accept': 'text/plain',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error); // Tratamento de erro reaproveitado
    throw error;
  }
};

// NOVA FUNÇÃO para buscar a imagem do usuário
export const buscarImagemUsuario = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await api.get('/Usuarios/Buscar-Imagem', {
      headers: {
        'accept': 'text/plain',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error); // Tratamento de erro reaproveitado
    throw error;
  }
};

// Função auxiliar para evitar repetição de código (opcional)
function handleApiError(error) {
  if (error.response) {
    if (error.response.status === 404) {
      console.error('Erro 404: Endpoint não encontrado.');
    } else {
      console.error(`Erro na requisição: ${error.response.status} - ${error.response.statusText}`);
    }
  } else if (error.request) {
    console.error('Erro: Nenhuma resposta recebida do servidor.');
  } else {
    console.error('Erro ao configurar a requisição:', error.message);
  }
}