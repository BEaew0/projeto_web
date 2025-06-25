import api from './api.js';

export const getQuantidadeCompradaPorProduto = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Usuário não autenticado');

    // 1. Buscar todos os pedidos
    const pedidosResponse = await api.get('/api/PedidoCompra/buscar-pedidos-usuario', {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*'
      }
    });

    const pedidos = pedidosResponse.data;
    const mapaQuantidade = {}; // { iD_PRODUTO_FK: total }

    // 2. Para cada pedido, buscar os itens
    for (const pedido of pedidos) {
      const itensResponse = await api.get(`/api/PedidoCompra/Itens/${pedido.iD_PEDIDO}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*'
        }
      });

      const itens = itensResponse.data;

      for (const item of itens) {
        const idProduto = item.iD_PRODUTO_FK;
        const qtd = item.quantidadE_ITEM_COMPRA || 0;

        if (!mapaQuantidade[idProduto]) {
          mapaQuantidade[idProduto] = 0;
        }
        mapaQuantidade[idProduto] += qtd;
      }
    }

    return mapaQuantidade; // { 101: 25, 102: 12, ... }

  } catch (error) {
    console.error('Erro ao buscar itens dos pedidos:', error);
    throw new Error('Falha ao calcular quantidade de itens comprados por produto.');
  }
};
