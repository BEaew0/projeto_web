// services/estoquesService.js
import api from './api';

/**
 * Configura a instância da API com o token de autenticação
 * @param {string} token - Token JWT para autenticação
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Requisição principal da API com tratamento de autenticação
const buscarEstoquesApi = async () => {
  try {
    const response = await api.get('/api/Estoque/buscar-estoques-por-usuario');
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || error.message;
    
    if (status === 401) {
      console.error('[Estoque] Não autorizado (401) - Token inválido ou expirado');
      // Aqui você pode adicionar lógica para renovar o token se necessário
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    } else if (status === 403) {
      console.error('[Estoque] Acesso negado (403) - Permissões insuficientes');
      throw new Error('Você não tem permissão para acessar este recurso.');
    }
    
    console.error('[Estoque] Erro ao buscar estoques:', errorMessage);
    throw new Error('Falha ao buscar estoques. Tente novamente mais tarde.');
  }
};

// Exporta todos os estoques do usuário
export const buscarTodosEstoquesUser = async (token) => {
  try {
    // Configura o token antes de fazer a requisição
    setAuthToken(token);
    const data = await buscarEstoquesApi();
    
    return Array.isArray(data) 
      ? data.map(item => ({ 
          ...item,
          qtD_TOTAL_ESTOQUE: Number(item.qtD_TOTAL_ESTOQUE) || 0,
          valoR_GASTO_TOTAL_ESTOQUE: Number(item.valoR_GASTO_TOTAL_ESTOQUE) || 0,
          valoR_POTENCIAL_VENDA_ESTOQUE: Number(item.valoR_POTENCIAL_VENDA_ESTOQUE) || 0
        })) 
      : [];
  } catch (error) {
    console.error('Erro ao buscar estoques:', error.message);
    throw error;
  }
};

// Gera um resumo financeiro com base nos estoques
export const getResumoFinanceiroEstoque = async (token) => {
  try {
    // Configura o token antes de fazer a requisição
    setAuthToken(token);
    const data = await buscarEstoquesApi();
    
    const estoquesValidos = Array.isArray(data) ? data : [];
    
    return estoquesValidos.reduce(
      (resumo, item) => ({
        quantidadeTotal: Number(resumo.quantidadeTotal) + (Number(item.qtD_TOTAL_ESTOQUE) || 0),
        valorTotalGasto: Number(resumo.valorTotalGasto) + (Number(item.valoR_GASTO_TOTAL_ESTOQUE) || 0),
        valorPotencialVenda: Number(resumo.valorPotencialVenda) + (Number(item.valoR_POTENCIAL_VENDA_ESTOQUE) || 0),
      }),
      {
        quantidadeTotal: 0,
        valorTotalGasto: 0,
        valorPotencialVenda: 0,
      }
    );
  } catch (error) {
    console.error('Erro ao calcular resumo financeiro:', error.message);
    throw new Error('Falha ao obter dados financeiros do estoque');
  }
};