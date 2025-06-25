// services/estoquesService.js
import api from './api';

const buscarEstoquesApi = async () => {
  const response = await api.get('/api/Estoque/buscar-estoques-por-usuario');
  return response.data;
};

export const buscarTodosEstoquesUser = async () => {
  try {
    const data = await buscarEstoquesApi();
    return data.map(item => ({ ...item }));
  } catch (error) {
    console.error('Erro ao buscar estoques:', error);
    throw error;
  }
};

export const getResumoFinanceiroEstoque = async () => {
  try {
    const data = await buscarEstoquesApi();
    return data.reduce(
      (resumo, item) => ({
        quantidadeTotal: resumo.quantidadeTotal + (item.qtD_TOTAL_ESTOQUE || 0),
        valorTotalGasto: resumo.valorTotalGasto + (item.valoR_GASTO_TOTAL_ESTOQUE || 0),
        valorPotencialVenda: resumo.valorPotencialVenda + (item.valoR_POTENCIAL_VENDA_ESTOQUE || 0)
      }),
      { quantidadeTotal: 0, valorTotalGasto: 0, valorPotencialVenda: 0 }
    );
  } catch (error) {
    console.error('Erro ao calcular resumo:', error);
    throw new Error('Falha ao obter dados financeiros do estoque');
  }
};
