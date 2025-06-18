import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import './Graficos.css';

ChartJS.register(...registerables);

export default function Graficos() {
  const location = useLocation();
  const { state } = location;
  const estoques = state?.estoques || [];

  const exportToExcel = () => {
    if (estoques.length === 0) return;
    
    const dadosParaExportar = estoques.map(item => ({
      "ID": item.id || item.iD_PRODUTO,
      "Produto": item.nomE_PRODUTO,
      "Quantidade": item.quantidadE_PRODUTO,
      "Data Entrada": item.datA_ENTRADA
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados_Gráficos");
    XLSX.writeFile(workbook, `dados_graficos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Dados para gráficos (mantido igual)
  const topProdutos = [...estoques]
    .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO)
    .slice(0, 5);

  const barChartData = {
    labels: topProdutos.map(item => item.nomE_PRODUTO),
    datasets: [{
      label: 'Top 5 Produtos em Estoque',
      data: topProdutos.map(item => item.quantidadE_PRODUTO),
      backgroundColor: 'rgba(46, 125, 50, 0.7)',
      borderColor: 'rgba(46, 125, 50, 1)',
      borderWidth: 1
    }]
  };

  const pieChartData = {
    labels: topProdutos.map(item => item.nomE_PRODUTO),
    datasets: [{
      data: topProdutos.map(item => item.quantidadE_PRODUTO),
      backgroundColor: [
        'rgba(46, 125, 50, 0.7)',
        'rgba(56, 142, 60, 0.7)',
        'rgba(76, 175, 80, 0.7)',
        'rgba(104, 159, 56, 0.7)',
        'rgba(139, 195, 74, 0.7)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="graficos-container">
      <div className="graficos-content">
        <BtnVoltar />
        
        <div className="graficos-header">
          <h1>Análise de Estoque</h1>
          <button 
            onClick={exportToExcel} 
            className="exportar-excel-btn"
            disabled={estoques.length === 0}
          >
            Exportar Dados para Excel
          </button>
        </div>

        <div className="graficos-grid">
          <div className="grafico-section">
            <div className="grafico-card">
              <h2>Top 5 Produtos (Quantidade)</h2>
              <div className="chart-container">
                <Bar 
                  data={barChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="grafico-section">
            <div className="grafico-card">
              <h2>Distribuição de Estoque</h2>
              <div className="chart-container">
                <Pie 
                  data={pieChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'right' } }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}