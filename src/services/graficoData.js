// services/graphData.js
import api from './api';
import Produtos from './produto';

export const GraphData = {
  /**
   * Busca dados para gráfico de estoque
   * @returns {Promise<Array>} Produtos com quantidade em estoque
   */
  async getDadosEstoque() {
    try {
      const produtos = await Produtos.getProdutosUsuario();
      return produtos.map(p => ({
        ...p,
        quantidadE_PRODUTO: p.quantidade || 0 // Garante que tenha o campo quantidade
      }));
    } catch (error) {
      console.error('Erro ao buscar dados de estoque:', error);
      throw error;
    }
  },

  /**
   * Busca dados para gráfico de vendas
   * @returns {Promise<Array>} Produtos com quantidade vendida
   */
  async getDadosVendas() {
    try {
      const response = await api.get('Vendas/buscar-vendas-usuario');
      return response.data.map(item => ({
        ...item,
        qtS_ITEM_VENDA: item.quantidade || 0
      }));
    } catch (error) {
      console.error('Erro ao buscar dados de vendas:', error);
      throw error;
    }
  },

  /**
   * Busca dados combinados para gráfico de compras vs vendas
   * @returns {Promise<Array>} Produtos com dados de compra e venda
   */
  async getDadosComprasVendas() {
    try {
      const response = await api.get('Estoque/buscar-compras-vendas');
      return response.data.map(item => ({
        nomE_PRODUTO: item.nomeProduto,
        quantidadE_ITEM_COMPRA: item.quantidadeCompra || 0,
        qtS_ITEM_VENDA: item.quantidadeVenda || 0
      }));
    } catch (error) {
      console.error('Erro ao buscar dados de compras/vendas:', error);
      throw error;
    }
  }
};

export default GraphData;