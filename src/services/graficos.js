import { Chart as ChartJS, registerables } from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(...registerables);

/**
 * Gera dados para gráfico de barras
 * @param {Array} dados - Array de produtos
 * @param {string} label - Label do dataset
 * @param {string} bgColor - Cor de fundo (rgba)
 * @param {string} borderColor - Cor da borda (rgba)
 * @returns {object} Configuração para gráfico de barras
 */
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

/**
 * Gera dados para gráfico de pizza
 * @param {Array} dados - Array de produtos (top 5)
 * @param {Array} bgColors - Cores de fundo (rgba)
 * @param {Array} borderColors - Cores da borda (rgba)
 * @returns {object} Configuração para gráfico de pizza
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
 * Gera dados para gráfico de linha
 * @param {Array} labels - Labels do eixo X
 * @param {Array} values - Valores do eixo Y
 * @param {string} label - Label do dataset
 * @param {string} bgColor - Cor de fundo (rgba)
 * @param {string} borderColor - Cor da borda (rgba)
 * @returns {object} Configuração para gráfico de linha
 */
export const generateLineData = (labels, values, label, bgColor, borderColor) => {
  return {
    labels,
    datasets: [{
      label,
      data: values,
      fill: false,
      backgroundColor: bgColor,
      borderColor,
      tension: 0.1
    }]
  };
};

/**
 * Opções padrão para os gráficos
 * @param {string} tooltipSuffix - Sufixo para o tooltip (ex: "unidades")
 * @returns {object} Opções de configuração
 */
export const defaultChartOptions = (tooltipSuffix = 'unidades') => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} ${tooltipSuffix}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
};