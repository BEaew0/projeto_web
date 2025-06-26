import api from './api';

/**
 * Verifica e obtém o token de autenticação
 * @returns {string} Token JWT
 * @throws {Error} Se não estiver autenticado
 */
const obterToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Usuário não autenticado. Faça login primeiro.');
  }
  return token;
};

/**
 * Busca dados completos do usuário autenticado
 * @returns {Promise<{
 *   nome: string, 
 *   email: string,
 *   senha: string,
 *   dataNascimento: string,
 *   imagem: string|null
 * }>}
 * @throws {Error} Quando ocorre erro na requisição
 */
export const acharUsuario = async () => {
  try {
    // Verifica autenticação antes de prosseguir
    const token = obterToken();
    
    // Configuração dos headers com o token
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    };

    // 1. Busca dados básicos do usuário
    const response = await api.get('/buscar-dados-usuario', config);
    
    const dados = response.data;

    // 2. Busca imagem do usuário
    let imagem = null;
    try {
      const imgResponse = await api.get('/api/Usuarios/Buscar-Imagem', config);
      if (imgResponse.data && imgResponse.data !== '') {
        imagem = imgResponse.data;
      }
    } catch (imgErr) {
      console.warn('Aviso: Não foi possível obter a imagem do usuário', imgErr.message);
      imagem = dados.fotO_USUARIO || null;
    }

    return {
      nome: dados.nomE_USUARIO || '',
      email: dados.emaiL_USUARIO || '',
      senha: dados.senhA_USUARIO || '',
      dataNascimento: dados.datA_NASC_USUARIO || '',
      imagem: imagem
    };

  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    
    if (error.response?.status === 401) {
      // Remove token inválido e redireciona
      localStorage.removeItem('accessToken');
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    }
    
    throw new Error(error.message || 'Não foi possível carregar os dados do usuário');
  }
};

/**
 * Função auxiliar para formatar dados do usuário
 */
export const formatarDadosUsuario = (dados) => {
  if (!dados) return null;
  
  return {
    nome: dados.nomE_USUARIO || '',
    email: dados.emaiL_USUARIO || '',
    senha: dados.senhA_USUARIO || '',
    dataNascimento: dados.datA_NASC_USUARIO || '',
    imagem: dados.fotO_USUARIO || null
  };
};

/**
 * Validação básica de senha (6 caracteres)
 */
export const validarSenhaBasica = (senha) => {
  return senha?.length >= 6;
};