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

export default function Graficos() {
  const location = useLocation();
  const estoques = location.state?.estoques || [];

  // Filtrar e ordenar dados
  const estoquesValidos = estoques.filter(
    item => item.quantidadE_PRODUTO !== undefined && 
           item.quantidadE_PRODUTO !== null &&
           item.nomE_PRODUTO
  );

  const produtosOrdenados = [...estoquesValidos]
    .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO);

  // Preparar dados para exportação
  const dadosParaExcel = produtosOrdenados.map(item => ({
    'Produto': item.nomE_PRODUTO,
    'Quantidade': item.quantidadE_PRODUTO,
    'Data de Entrada': item.datA_ENTRADA || 'N/A'
  }));

  // Gerar dados para gráficos
  const barData = generateBarData(
    produtosOrdenados, 
    'Quantidade em Estoque'
  );

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

  // Dados fictícios para gráfico de linha
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
  const valores = [5, 8, 12, 15, 18, 22, 25];
  const lineData = generateLineData(
    meses,
    valores,
    'Entrada de Produtos (2023)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(75, 192, 192, 1)'
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
      
      <div className="grafico-section">
        <div className="grafico-header">
          <BtnVoltar/>
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
          <Pie data={pieData} options={options} />
        </div>
      </div>
      
      <div className="grafico-section">
        <div className="grafico-header">
          <h2>Evolução Mensal de Entradas</h2>
          <button  onClick={() => exportToPNG('line-chart', 'grafico_linha')}  className="download-btn">
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper" id="line-chart">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
}