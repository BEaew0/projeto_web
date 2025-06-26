import api from './api.js';

/**
 * Serviço para gerenciamento de pedidos de compra
 */

/**
 * Verifica se o usuário está autenticado
 * @private
 * @throws {Error} Se não estiver autenticado
 */
const _verificarAutenticacao = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Usuário não autenticado. Faça login primeiro.');
  }
  return token;
};

/**
 * Obtém todos os itens de compra do usuário
 * @returns {Promise<Array>} Lista de itens de compra formatados
 * @throws {Error} Em caso de falha na requisição
 */
export const getTodosItensCompra = async () => {
  try {
    _verificarAutenticacao();
    
    const { data } = await api.get('/api/PedidoCompra/buscar-todos-itens-compra-por-usuario');
    
    return data.map(item => ({
      id: item.iD_ITEM_COMPRA,
      produtoId: item.iD_PRODUTO_FK,
      pedidoId: item.iD_PEDIDO_FK,
      data: item.vaL_ITEM_COMPRA,
      lote: item.lotE_COMPRA,
      quantidade: item.quantidadE_ITEM_COMPRA,
      numeroItem: item.n_ITEM_COMPRA,
      valorTotal: item.valoR_TOTAL_ITEM_COMPRA,
      estado: item.estadO_ITEM_COMPRA,
      produto: {
        id: item.produto?.iD_PRODUTO,
        codigo: item.produto?.coD_PRODUTO,
        nome: item.produto?.nomE_PRODUTO,
        valor: item.produto?.valoR_PRODUTO,
        tipo: item.produto?.tipO_PRODUTO,
        imagem: item.produto?.imG_PRODUTO
      },
      pedido: {
        id: item.pedidoCompra?.iD_PEDIDO,
        data: item.pedidoCompra?.datA_PEDIDO,
        valorTotal: item.pedidoCompra?.valoR_PEDIDO
      }
    }));

  } catch (error) {
    console.error('Erro ao buscar itens de compra:', error);
    throw _handleError(error);
  }
};

/**
 * Obtém a quantidade comprada por produto
 * @returns {Promise<Object>} Mapa { idProduto: quantidade }
 * @throws {Error} Em caso de falha na requisição
 */
export const getQuantidadeCompradaPorProduto = async () => {
  try {
    const itens = await getTodosItensCompra();
    const mapaQuantidade = {};

    itens.forEach(item => {
      const idProduto = item.produtoId;
      const qtd = item.quantidade || 0;
      mapaQuantidade[idProduto] = (mapaQuantidade[idProduto] || 0) + qtd;
    });

    return mapaQuantidade;

  } catch (error) {
    console.error('Erro ao calcular quantidade por produto:', error);
    throw new Error('Falha ao calcular quantidade de itens comprados por produto.');
  }
};

/**
 * Obtém os pedidos de compra do usuário
 * @param {number} pagina - Número da página
 * @param {number} itensPorPagina - Itens por página
 * @returns {Promise<Array>} Lista de pedidos formatados
 */
export const getPedidosCompra = async (pagina = 1, itensPorPagina = 10) => {
  try {
    _verificarAutenticacao();
    
    const { data } = await api.get('/api/PedidoCompra/buscar-pedidos-por-usuario', {
      params: {
        pagina,
        itensPorPagina
      }
    });
    
    return data.map(pedido => ({
      id: pedido.iD_PEDIDO,
      data: pedido.datA_PEDIDO,
      valorTotal: pedido.valoR_PEDIDO,
      fornecedor: {
        id: pedido.fornecedor?.iD_FORNECEDOR,
        nome: pedido.fornecedor?.nomE_FORNECEDOR,
        cnpj: pedido.fornecedor?.cnpJ_FORNECEDOR
      }
    }));

  } catch (error) {
    console.error('Erro ao buscar pedidos de compra:', error);
    throw _handleError(error);
  }
};

/**
 * Tratamento padronizado de erros
 * @private
 */
const _handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('accessToken');
        return new Error('Sessão expirada. Faça login novamente.');
      case 403:
        return new Error('Acesso não autorizado');
      case 404:
        return new Error('Recurso não encontrado');
      default:
        return new Error(error.response.data?.message || 'Erro ao processar requisição');
    }
  } else if (error.request) {
    return new Error('Sem resposta do servidor. Verifique sua conexão.');
  }
  return new Error(error.message || 'Erro ao configurar a requisição');
};