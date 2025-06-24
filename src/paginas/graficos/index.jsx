import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import { exportToExcel } from '../../services/excel';
import { exportToPNG } from '../../services/canva';
import {
  generateBarData,
  generatePieData,
  generateLineData,
  defaultChartOptions
} from '../../services/graficos';
import "./grafico.css";

// Função para gerar dados do gráfico de lucro
function generateBarDataLucro(produtos) {
  const labels = produtos.map(p => p.nomE_PRODUTO);
  const lucros = produtos.map(p => p.quantidadE_PRODUTO * p.valoR_PRODUTO);

  return {
    labels,
    datasets: [
      {
        label: 'Lucro Estimado (R$)',
        data: lucros,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };
}

// Função para agrupar entradas por mês (quantidade de produtos em estoque entrados)
function agruparEntradasPorMes(estoques) {
  const agrupado = {};

  estoques.forEach(item => {
    if (!item.datA_ENTRADA || !item.quantidadE_PRODUTO) return;

    const data = new Date(item.datA_ENTRADA);
    if (isNaN(data)) return;

    const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;

    if (!agrupado[chave]) agrupado[chave] = 0;
    agrupado[chave] += item.quantidadE_PRODUTO;
  });

  const mesesOrdenados = Object.keys(agrupado).sort();

  const labels = mesesOrdenados.map(m => {
    const [ano, mes] = m.split("-");
    const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${nomesMeses[parseInt(mes, 10) - 1]}/${ano}`;
  });

  const valores = mesesOrdenados.map(m => agrupado[m]);

  return { meses: labels, valores };
}

// Nova função para agrupar entradas e saídas (vendas) por mês
function agruparEntradasESaidasPorMes(estoques) {
  const agrupadoEntradas = {};
  const agrupadoSaidas = {};

  estoques.forEach(item => {
    // Entradas - mesma lógica anterior
    if (item.datA_ENTRADA && item.quantidadE_PRODUTO) {
      const dataEntrada = new Date(item.datA_ENTRADA);
      if (!isNaN(dataEntrada)) {
        const chave = `${dataEntrada.getFullYear()}-${String(dataEntrada.getMonth() + 1).padStart(2, '0')}`;
        agrupadoEntradas[chave] = (agrupadoEntradas[chave] || 0) + item.quantidadE_PRODUTO;
      }
    }

    // Saídas - vendas (supondo que tem qtS_ITEM_VENDA e dataV_VENDA)
    if (item.datA_VENDA && item.qtS_ITEM_VENDA) {
      const dataVenda = new Date(item.datA_VENDA);
      if (!isNaN(dataVenda)) {
        const chave = `${dataVenda.getFullYear()}-${String(dataVenda.getMonth() + 1).padStart(2, '0')}`;
        agrupadoSaidas[chave] = (agrupadoSaidas[chave] || 0) + item.qtS_ITEM_VENDA;
      }
    }
  });

  // União das chaves para labels
  const todasChaves = Array.from(new Set([
    ...Object.keys(agrupadoEntradas),
    ...Object.keys(agrupadoSaidas)
  ])).sort();

  const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const labels = todasChaves.map(m => {
    const [ano, mes] = m.split("-");
    return `${nomesMeses[parseInt(mes, 10) - 1]}/${ano}`;
  });

  const valoresEntradas = todasChaves.map(m => agrupadoEntradas[m] || 0);
  const valoresSaidas = todasChaves.map(m => agrupadoSaidas[m] || 0);

  return { meses: labels, valoresEntradas, valoresSaidas };
}

export default function Graficos() {
  const location = useLocation();
  const estoques = location.state?.estoques || [];

  const estoquesValidos = estoques.filter(
    item => item.quantidadE_PRODUTO !== undefined &&
            item.quantidadE_PRODUTO !== null &&
            item.nomE_PRODUTO
  );

  const produtosOrdenados = [...estoquesValidos]
    .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO);

  const dadosParaExcel = produtosOrdenados.map(item => ({
    'Produto': item.nomE_PRODUTO,
    'Quantidade': item.quantidadE_PRODUTO,
    'Data de Entrada': item.datA_ENTRADA || 'N/A',
    'Valor Unitário (R$)': item.valoR_PRODUTO.toFixed(2),
    'Lucro Estimado (R$)': (item.quantidadE_PRODUTO * item.valoR_PRODUTO).toFixed(2)
  }));

  const barData = generateBarData(
    produtosOrdenados,
    'Quantidade em Estoque'
  );

  const barDataLucro = generateBarDataLucro(produtosOrdenados);

  const pieData = generatePieData(
    produtosOrdenados.slice(0, 5),
    [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)'
    ],
    [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ]
  );

  // Dados do gráfico de linhas para entradas e saídas
  const { meses, valoresEntradas, valoresSaidas } = agruparEntradasESaidasPorMes(produtosOrdenados);
  const lineDataEntradasSaidas = generateLineData(
    meses,
    [
      {
        label: 'Entradas',
        data: valoresEntradas,
        bgColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Saídas (Vendas)',
        data: valoresSaidas,
        bgColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }
    ]
  );

  const options = defaultChartOptions();

  if (estoquesValidos.length === 0) {
    return (
      <div className="graficos-container">
        <h1>Gráficos de Estoque</h1>
        <p>Nenhum dado válido para exibir</p>
      </div>
    );
  }

  return (
    <div className="graficos-container">
      <div className="header-graficos">
        <h1>Gráficos de Estoque</h1>
        <div className="botoes-exportacao">
          <button
            onClick={() => exportToExcel(dadosParaExcel, 'dados_graficos')}
            className="exportar-excel-btn"
          >
            Exportar para Excel
          </button>
        </div>
      </div>

      {/* Gráfico de Quantidade */}
      <div className="grafico-section">
        <div className="grafico-header">
          <BtnVoltar />
          <h2>Quantidade de Produtos em Estoque</h2>
          <button
            onClick={() => exportToPNG('bar-chart', 'grafico_barras')}
            className="download-btn"
          >
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper" id="bar-chart">
          <Bar data={barData} options={options} />
        </div>
      </div>

      {/* Gráfico de Lucro */}
      <div className="grafico-section">
        <div className="grafico-header">
          <h2>Lucro Estimado por Produto</h2>
          <button
            onClick={() => exportToPNG('bar-lucro-chart', 'grafico_lucro')}
            className="download-btn"
          >
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper" id="bar-lucro-chart">
          <Bar data={barDataLucro} options={defaultChartOptions('R$', 'bar')} />
        </div>
      </div>

      {/* Gráfico de Pizza */}
      <div className="grafico-section">
        <div className="grafico-header">
          <h2>Top 5 Produtos em Estoque</h2>
          <button
            onClick={() => exportToPNG('pie-chart', 'grafico_pizza')}
            className="download-btn"
          >
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper pie-chart" id="pie-chart">
          <Pie data={pieData} options={defaultChartOptions('unidades', 'pie')} />
        </div>
      </div>

      {/* Gráfico de Linha Entradas x Saídas */}
      <div className="grafico-section">
        <div className="grafico-header">
          <h2>Evolução Mensal de Entradas e Saídas (Vendas)</h2>
          <button
            onClick={() => exportToPNG('line-entradas-saidas-chart', 'grafico_linha_entradas_saidas')}
            className="download-btn"
          >
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper" id="line-entradas-saidas-chart">
          <Line data={lineDataEntradasSaidas} options={options} />
        </div>
      </div>

      {/* Gráfico de Linha Entradas Simples (Opcional) */}
      {/* 
      <div className="grafico-section">
        <div className="grafico-header">
          <h2>Evolução Mensal de Entradas</h2>
          <button
            onClick={() => exportToPNG('line-chart', 'grafico_linha')}
            className="download-btn"
          >
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper" id="line-chart">
          <Line data={lineData} options={options} />
        </div>
      </div>
      */}
    </div>
  );
}
