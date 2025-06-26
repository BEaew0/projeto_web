import { Chart as ChartJS, registerables } from 'chart.js';
import Produtos from './produto';
import * as ProdutoCompra from './ProdutoCompra'; // ✅ Corrigido
import PedidoVendaService from './pedidoVendas';  // ✅ Corrigido (letra minúscula se seu arquivo for "produtoVenda.js")
import * as LucroService from './lucro';


// ... [imports mantidos como estão]

ChartJS.register(...registerables);

// ========== [Funções de geração de dados para gráficos - mantidas] ==========

// ... [todas as funções generateBarData* estão inalteradas]

// ========== MOCKS ==========

const mockProdutosCompra = [
  { produtoId: 1, produto: { nome: 'Arroz' }, quantidade: 30 },
  { produtoId: 2, produto: { nome: 'Feijão' }, quantidade: 20 },
  { produtoId: 3, produto: { nome: 'Macarrão' }, quantidade: 15 }
];

const mockProdutosVenda = [
  { idProduto: 1, produto: { nome: 'Arroz' }, quantidade: 18 },
  { idProduto: 2, produto: { nome: 'Feijão' }, quantidade: 12 },
  { idProduto: 3, produto: { nome: 'Macarrão' }, quantidade: 10 }
];

const mockLucroPorItem = [
  { nome: 'Arroz', lucro: 90.50 },
  { nome: 'Feijão', lucro: 72.00 },
  { nome: 'Macarrão', lucro: 55.80 }
];

// ========== FUNÇÕES COM MOCK ==========

export const getBarDataCompras = async () => {
  // const dados = await ProdutoCompra.getTodosItensCompra(); // 🔒 Comentado
  const dados = mockProdutosCompra;
  return generateBarDataCompras(dados.map(item => ({
    nomE_PRODUTO: item.produto?.nome || `Produto ${item.produtoId}`,
    quantidadE_ITEM_COMPRA: item.quantidade
  })));
};

export const getBarDataVendas = async () => {
  // const dados = await PedidoVendaService.getItensVendaPorUsuario(); // 🔒 Comentado
  const dados = mockProdutosVenda;
  return generateBarDataVendas(dados.map(item => ({
    nomE_PRODUTO: item.produto?.nome || `Produto ${item.idProduto}`,
    qtS_ITEM_VENDA: item.quantidade
  })));
};

export const getBarDataComprasVendasAgrupado = async () => {
  // const compras = await ProdutoCompra.getTodosItensCompra(); // 🔒 Comentado
  // const vendas = await PedidoVendaService.getItensVendaPorUsuario(); // 🔒 Comentado
  const compras = mockProdutosCompra;
  const vendas = mockProdutosVenda;

  const dadosCombinados = compras.map(compra => {
    const venda = vendas.find(v => v.idProduto === compra.produtoId);
    return {
      nomE_PRODUTO: compra.produto?.nome || `Produto ${compra.produtoId}`,
      quantidadE_ITEM_COMPRA: compra.quantidade,
      qtS_ITEM_VENDA: venda?.quantidade || 0
    };
  });

  return generateBarDataComprasVendasAgrupado(dadosCombinados);
};

export const getBarDataLucroLocal = async () => {
  // const produtos = await Produtos.getProdutosUsuario(); // 🔒 Comentado
  // const { porProduto } = LucroService.calcularLucroLocal(produtos); // 🔒 Comentado

  const porProduto = mockLucroPorItem;

  return {
    labels: porProduto.map(p => p.nome),
    datasets: [{
      label: 'Lucro Estimado (Local)',
      data: porProduto.map(p => p.lucro),
      backgroundColor: 'rgba(153, 102, 255, 0.7)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };
};

export const getBarDataLucroPorItemAPI = async () => {
  // const itens = await ProdutoCompra.getTodosItensCompra(); // 🔒 Comentado

  // const dadosLucro = await Promise.all(itens.map(async item => {
  //   const res = await LucroService.buscarLucroTotalPorItem(item.id);
  //   return {
  //     nome: item.produto?.nome || `Item ${item.id}`,
  //     lucro: res.lucro || 0
  //   };
  // }));

  const dadosLucro = mockLucroPorItem;

  return {
    labels: dadosLucro.map(p => p.nome),
    datasets: [{
      label: 'Lucro Real por Item (API)',
      data: dadosLucro.map(p => p.lucro),
      backgroundColor: 'rgba(255, 206, 86, 0.7)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  };
};