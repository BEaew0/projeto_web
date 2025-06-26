import api from './api';

const PedidoVendaService = {
  /**
   * Verifica autenticação antes de fazer requisições
   * @private
   * @throws {Error} Se não estiver autenticado
   */
  _verificarAutenticacao() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Usuário não autenticado. Faça login primeiro.');
    }
  },

  /**
   * Busca todos os pedidos de venda do usuário
   * @returns {Promise<Array>} Lista de pedidos formatados
   */
  async getPedidosVenda() {
    try {
      this._verificarAutenticacao();
      
      const response = await api.get('/api/PedidoVenda/buscar-pedidos-por-usuario');
      
      return response.data.map(pedido => ({
        id: pedido.iD_PEDIDO,
        data: pedido.datA_PEDIDO,
        status: pedido.statuS_PEDIDO,
        valorTotal: pedido.valoR_TOTAL_PEDIDO,
        cliente: pedido.cliente ? {
          id: pedido.cliente.iD_CLIENTE,
          nome: pedido.cliente.nomE_CLIENTE
        } : null
      }));
      
    } catch (error) {
      console.error('Erro ao buscar pedidos de venda:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca itens de venda por usuário
   * @returns {Promise<Array>} Lista de itens vendidos formatados
   */
  async getItensVendaPorUsuario() {
    try {
      this._verificarAutenticacao();
      
      const response = await api.get('/api/PedidoVenda/buscar-itens-venda-por-usuario');
      
      return response.data.map(item => this._formatarItemVenda(item));
      
    } catch (error) {
      console.error('Erro ao buscar itens de venda:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Formata os dados do item de venda
   * @private
   */
  _formatarItemVenda(item) {
    return {
      id: item.iD_ITEM_VENDA,
      idProduto: item.iD_PRODUTO_FK,
      idPedido: item.iD_PEDIDO_FK,
      lote: item.lotE_VENDA || '',
      quantidade: item.qtS_ITEM_VENDA || 0,
      numeroItem: item.n_ITEM_VENDA || 0,
      desconto: item.descontO_ITEM_VENDA || 0,
      valorTotal: item.valoR_TOTAL_ITEM_VENDA || 0,
      produto: item.produto ? {
        nome: item.produto.nomE_PRODUTO,
        codigo: item.produto.coD_PRODUTO
      } : null
    };
  },

  /**
   * Tratamento padronizado de erros
   * @private
   */
  _handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('accessToken');
          return new Error('Sessão expirada. Faça login novamente.');
        case 403:
          return new Error('Acesso não autorizado');
        case 404:
          return new Error('Nenhum pedido encontrado');
        case 500:
          return new Error('Erro interno no servidor');
        default:
          return new Error(error.response.data?.message || 'Erro ao processar requisição');
      }
    } else if (error.request) {
      return new Error('Sem resposta do servidor. Verifique sua conexão.');
    }
    return new Error(error.message || 'Erro ao configurar a requisição');
  }
};

export default PedidoVendaService;