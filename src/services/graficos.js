import { Chart as ChartJS, registerables } from 'chart.js';
import Produtos from './produto';
import * as ProdutoCompra from './ProdutoCompra'; // ✅ Corrigido
import PedidoVendaService from './pedidoVendas';  // ✅ Corrigido (letra minúscula se seu arquivo for "produtoVenda.js")
import * as LucroService from './lucro';


ChartJS.register(...registerables);

// ========== GERADORES DE DADOS DE GRÁFICOS ==========

export const generateBarData = (dados, label, bgColor = 'rgba(54, 162, 235, 0.7)', borderColor = 'rgba(54, 162, 235, 1)') => {
  return {
    labels: dados.map(item => item.nomE_PRODUTO),
    datasets: [{
      label,
      data: dados.map(item => item.quantidadE_PRODUTO),
      backgroundColor: bgColor,
      borderColor,
      borderWidth: 1
    }]
  };
};

export const generateBarDataCompras = (dados, label = 'Quantidade Comprada') => {
  return {
    labels: dados.map(item => item.nomE_PRODUTO),
    datasets: [{
      label,
      data: dados.map(item => item.quantidadE_ITEM_COMPRA || 0),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
};

export const generateBarDataVendas = (dados, label = 'Itens Vendidos') => {
  return {
    labels: dados.map(item => item.nomE_PRODUTO),
    datasets: [{
      label,
      data: dados.map(item => item.qtS_ITEM_VENDA || 0),
      backgroundColor: 'rgba(255, 159, 64, 0.7)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };
};

export const generatePieData = (dados, bgColors, borderColors) => {
  return {
    labels: dados.map(item => item.nomE_PRODUTO),
    datasets: [{
      data: dados.map(item => item.quantidadE_PRODUTO),
      backgroundColor: bgColors,
      borderColor: borderColors,
      borderWidth: 1
    }]
  };
};

export const generateBarDataLucro = (dados) => {
  const labels = dados.map(p => p.nomE_PRODUTO);
  const lucros = dados.map(p => (p.quantidadE_PRODUTO || 0) * (p.valoR_PRODUTO || 0));

  return {
    labels,
    datasets: [{
      label: 'Lucro Estimado (R$)',
      data: lucros,
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };
};

export const defaultChartOptions = (tooltipSuffix = 'unidades', chartType = 'bar') => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: chartType === 'pie' ? 'right' : 'top',
        labels: {
          font: { size: 20 },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12
        }
      },
      tooltip: {
        callbacks: {
          label: context => `${context.parsed.y ?? context.raw} ${tooltipSuffix}`
        }
      }
    },
    scales: chartType === 'pie' ? {} : {
      y: { beginAtZero: true }
    },
    layout: chartType === 'pie' 
      ? { padding: { right: 12, top: 30 } }
      : { padding: { bottom: 50 } }
  };
};

export const generateBarDataComprasVendasAgrupado = (dados) => {
  const agregados = {};
  dados.forEach(item => {
    const nome = item.nomE_PRODUTO;
    const compra = Number(item.quantidadE_ITEM_COMPRA) || 0;
    const venda = Number(item.qtS_ITEM_VENDA) || 0;
    if (!agregados[nome]) agregados[nome] = { compra: 0, venda: 0 };
    agregados[nome].compra += compra;
    agregados[nome].venda += venda;
  });
  const labels = Object.keys(agregados);
  return {
    labels,
    datasets: [
      {
        label: 'Compras',
        data: labels.map(nome => agregados[nome].compra),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Vendas',
        data: labels.map(nome => agregados[nome].venda),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };
};

// ========== FUNÇÕES ASSÍNCRONAS DE API ==========

export const getBarDataCompras = async () => {
  const dados = await ProdutoCompra.getTodosItensCompra();
  return generateBarDataCompras(dados.map(item => ({
    nomE_PRODUTO: item.produto?.nome || `Produto ${item.produtoId}`,
    quantidadE_ITEM_COMPRA: item.quantidade
  })));
};

export const getBarDataVendas = async () => {
  const dados = await PedidoVendaService.getItensVendaPorUsuario();
  return generateBarDataVendas(dados.map(item => ({
    nomE_PRODUTO: item.produto?.nome || `Produto ${item.idProduto}`,
    qtS_ITEM_VENDA: item.quantidade
  })));
};

export const getBarDataComprasVendasAgrupado = async () => {
  const compras = await ProdutoCompra.getTodosItensCompra();
  const vendas = await PedidoVendaService.getItensVendaPorUsuario();

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
  const produtos = await Produtos.getProdutosUsuario();
  const { porProduto } = LucroService.calcularLucroLocal(produtos);

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
  const itens = await ProdutoCompra.getTodosItensCompra();

  const dadosLucro = await Promise.all(itens.map(async item => {
    const res = await LucroService.buscarLucroTotalPorItem(item.id);
    return {
      nome: item.produto?.nome || `Item ${item.id}`,
      lucro: res.lucro || 0
    };
  }));

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
