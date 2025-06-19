import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import "./grafico.css";

ChartJS.register(...registerables);

export default function Graficos() {
  const location = useLocation();
  const estoques = location.state?.estoques || [];

  // Filtrar itens com quantidade válida
  const estoquesValidos = estoques.filter(
    item => item.quantidadE_PRODUTO !== undefined && 
           item.quantidadE_PRODUTO !== null &&
           item.nomE_PRODUTO
  );

  // Ordenar por quantidade
  const produtosOrdenados = [...estoquesValidos]
    .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO);

  // Exportar para Excel
  const exportToExcel = () => {
    const data = produtosOrdenados.map(item => ({
      'Produto': item.nomE_PRODUTO,
      'Quantidade': item.quantidadE_PRODUTO,
      'Data de Entrada': item.datA_ENTRADA || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estoque");
    XLSX.writeFile(workbook, "estoque.xlsx");
  };

  // Baixar gráfico como imagem
  const downloadChart = async (chartId, fileName) => {
    const chartElement = document.getElementById(chartId);
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      canvas.toBlob((blob) => {
        saveAs(blob, fileName);
      });
    }
  };

  // Dados para os gráficos
  const barData = {
    labels: produtosOrdenados.map(item => item.nomE_PRODUTO),
    datasets: [{
      label: 'Quantidade em Estoque',
      data: produtosOrdenados.map(item => item.quantidadE_PRODUTO),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const pieData = {
    labels: produtosOrdenados.slice(0, 5).map(item => item.nomE_PRODUTO),
    datasets: [{
      data: produtosOrdenados.slice(0, 5).map(item => item.quantidadE_PRODUTO),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Criando dados fictícios para o gráfico de linha (evolução temporal)
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
  const lineData = {
    labels: meses,
    datasets: [{
      label: 'Entrada de Produtos (2023)',
      data: [5, 8, 12, 15, 18, 22, 25],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} unidades`;
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
          <button onClick={exportToExcel} className="export-btn">
            Exportar para Excel
          </button>
        </div>
      </div>
      
      <div className="grafico-section">
        <div className="grafico-header">
          <BtnVoltar/>
          <h2>Quantidade de Produtos em Estoque</h2>
          <button 
            onClick={() => downloadChart('bar-chart', 'grafico-barras.png')}
            className="download-btn"
          >
            Baixar Gráfico
          </button>
        </div>
        <div className="grafico-wrapper" id="bar-chart">
          <Bar data={barData} options={options} />
        </div>
      </div>
      
      <div className='graficos-container'>
         <div className="grafico-section">

        <div className="grafico-header">
          <h2>Top 5 Produtos em Estoque</h2>
          <button onClick={() => downloadChart('pie-chart', 'grafico-pizza.png')} className="download-btn">
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
                <button onClick={() => downloadChart('line-chart', 'grafico-linha.png')}className="download-btn">
                     Baixar Gráfico
                </button>
                </div>
                <div className="grafico-wrapper" id="line-chart">
                    <Line data={lineData} options={options} />
                </div>
        </div>
     </div>

</div>
     
  );
}