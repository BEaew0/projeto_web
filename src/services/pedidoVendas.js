// services/PedidoVendaService.js
import api from './api';

const PedidoVendaService = {
  /**
   * Busca itens de venda por usuário
   * @returns {Promise<Array>} Lista de itens vendidos
   */
  async getItensVendaPorUsuario() {
    try {
      const response = await api.get('/PedidoVenda/buscar-itens-venda-por-usuario');
      return response.data.item.map(item => this._formatarItemVenda(item));
    } catch (error) {
      console.error('Erro ao buscar itens de venda:', error);
      throw error;
    }
  },

  /**
   * Formata os dados do item de venda
   * @private
   */
  _formatarItemVenda(item) {
    return {
      idProduto: item.iD_PRODUTO_FK,
      lote: item.lotE_VENDA,
      quantidade: item.qtS_ITEM_VENDA,
      numeroItem: item.n_ITEM_VENDA,
      desconto: item.descontO_ITEM_VENDA,
      valorTotal: item.valoR_TOTAL_ITEM_VENDA
      // Adicione outros campos conforme necessário
    };
  }
};

export default PedidoVendaService;