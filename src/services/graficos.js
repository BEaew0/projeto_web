import { Chart as ChartJS, registerables } from 'chart.js';
import Produtos from './produto';

// Registrar componentes do Chart.js
ChartJS.register(...registerables);

/**
 * Gera dados para gráfico de barras - Quantidade em Estoque
 */
export const generateBarData = (
  dados,
  label,
  bgColor = 'rgba(54, 162, 235, 0.7)',
  borderColor = 'rgba(54, 162, 235, 1)'
) => {
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

/**
 * Gera dados para gráfico de compras (quantidade comprada)
 */
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

/**
 * Gera dados para gráfico de itens vendidos
 */
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

/**
 * Gera dados para gráfico de pizza
 */
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

/**
 * Gera dados para gráfico de lucro
 */
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

/**
 * Opções padrão para os gráficos
 */
export const defaultChartOptions = (tooltipSuffix = 'unidades', chartType = 'bar') => {
  const options = {
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

  return options;
};

/**
 * Gera dados agrupados de compras e vendas por produto
 */
export const generateBarDataComprasVendasAgrupado = (dados) => {
  const agregados = {};

  dados.forEach(item => {
    const nome = item.nomE_PRODUTO;
    const compra = Number(item.quantidadE_ITEM_COMPRA) || 0;
    const venda = Number(item.qtS_ITEM_VENDA) || 0;

    if (!agregados[nome]) {
      agregados[nome] = { compra: 0, venda: 0 };
    }

    agregados[nome].compra += compra;
    agregados[nome].venda += venda;
  });

  const labels = Object.keys(agregados);
  const compras = labels.map(nome => agregados[nome].compra);
  const vendas = labels.map(nome => agregados[nome].venda);

  return {
    labels,
    datasets: [
      {
        label: 'Compras',
        data: compras,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Vendas',
        data: vendas,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };
};

// ============================
// FUNÇÕES ASSÍNCRONAS COM API
// ============================

export const getBarDataCompras = async () => {
  const dados = await Produtos.getProdutosUsuario();
  return generateBarDataCompras(dados);
};

export const getBarDataVendas = async () => {
  const dados = await Produtos.getProdutosUsuario();
  return generateBarDataVendas(dados);
};

export const getBarDataComprasVendasAgrupado = async () => {
  const dados = await Produtos.getProdutosUsuario();
  return generateBarDataComprasVendasAgrupado(dados);
};

/**
 * Com filtro por tipo (opcional)
 */
export const getBarDataComprasPorTipo = async (tipo) => {
  const dados = await Produtos.filtrarPorTipo(tipo);
  return generateBarDataCompras(dados, `Compras de ${tipo}`);
};

export const getBarDataVendasPorTipo = async (tipo) => {
  const dados = await Produtos.filtrarPorTipo(tipo);
  return generateBarDataVendas(dados, `Vendas de ${tipo}`);
};

export const getBarDataComprasVendasAgrupadoPorTipo = async (tipo) => {
  const dados = await Produtos.filtrarPorTipo(tipo);
  return generateBarDataComprasVendasAgrupado(dados);
};
