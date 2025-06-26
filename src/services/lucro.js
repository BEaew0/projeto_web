import api from './api';

/**
 * Envia uma lista de IDs de itens para calcular lucro no backend
 * @param {Array<number>} idsItens
 * @returns {Promise<any>}
 */
export const criarLucro = async (idsItens) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Usuário não autenticado');

    const response = await api.post(
      '/api/Lucro/criar-lucro',
      {
        itens: idsItens.map(id => ({ iD_ITEM: id }))
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao criar lucro:', error);
    throw new Error('Não foi possível calcular o lucro');
  }
};

/**
 * Busca o lucro total do usuário (em texto/plain)
 * @returns {Promise<number>}
 */
export const buscarLucroTotalUsuario = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Usuário não autenticado');

    const response = await api.get('/api/Lucro/buscar-lucro-total-usuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return Number(response.data);
  } catch (error) {
    console.error('Erro ao buscar lucro total:', error);
    throw new Error('Não foi possível obter o lucro total');
  }
};

/**
 * Busca lucro total por item
 * @param {number} idItem - ID do item a ser consultado
 * @returns {Promise<{ iD_ITEM: number, lucro: number }>}
 */
export const buscarLucroTotalPorItem = async (idItem) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Usuário não autenticado');

    const response = await api.get('/api/Lucro/buscar-lucro-total-item-usuario', {
      params: { idItem },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lucro por item:', error);
    throw new Error('Não foi possível obter os lucros por item');
  }
};

/**
 * Calcula o lucro estimado localmente (caso backend esteja indisponível)
 * lucro = quantidade * (valor venda estimado - valor gasto unitário)
 * @param {Array<Object>} produtos
 * @returns {{ totalLucro: number, porProduto: Array<{ nome: string, lucro: number }> }}
 */
export const calcularLucroLocal = (produtos) => {
  const porProduto = produtos.map(prod => {
    const valorGasto = prod.valoR_GASTO_TOTAL_ESTOQUE || 0;
    const valorVenda = prod.valoR_POTENCIAL_VENDA_ESTOQUE || 0;
    const lucro = valorVenda - valorGasto;
    return {
      nome: prod.nomE_PRODUTO || `ID ${prod.iD_PRODUTO_FK}`,
      lucro
    };
  });

  const totalLucro = porProduto.reduce((acc, item) => acc + item.lucro, 0);

  return { totalLucro, porProduto };
};

/**
 * Calcula o lucro por item unitário para cada produto
 * lucro por item = valor venda unitário - valor gasto unitário
 * @param {Array<Object>} produtos
 * @returns {Array<{ nome: string, lucroUnitario: number }>}
 */
export const calcularLucroPorItem = (produtos) => {
  return produtos.map(prod => {
    const nome = prod.nomE_PRODUTO || `ID ${prod.iD_PRODUTO_FK || 'desconhecido'}`;
    const quantidade = prod.qtD_TOTAL_ESTOQUE || 0;

    const valorGastoUnitario = quantidade ? (prod.valoR_GASTO_TOTAL_ESTOQUE / quantidade) : 0;
    const valorVendaUnitario = quantidade ? (prod.valoR_POTENCIAL_VENDA_ESTOQUE / quantidade) : 0;

    const lucroUnitario = valorVendaUnitario - valorGastoUnitario;

    return {
      nome,
      lucroUnitario
    };
  });
};
