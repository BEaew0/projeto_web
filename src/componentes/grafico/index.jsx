import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';

import './GraficosCompactos.css';

ChartJS.register(...registerables);

export default function GraficosCompactos({ estoques }) {
  const navigate = useNavigate();

  if (!estoques || estoques.length === 0) return null;

  // Preparar dados para os gráficos
  const topProdutos = [...estoques]
    .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO)
    .slice(0, 3);

  const data = {
    labels: topProdutos.map(item => item.nomE_PRODUTO),
    datasets: [{
      label: 'Top 3 em Estoque',
      data: topProdutos.map(item => item.quantidadE_PRODUTO),
      backgroundColor: [
        'rgba(46, 125, 50, 0.7)',
        'rgba(56, 142, 60, 0.7)',
        'rgba(76, 175, 80, 0.7)'
      ],
      borderColor: [
        'rgba(46, 125, 50, 1)',
        'rgba(56, 142, 60, 1)',
        'rgba(76, 175, 80, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
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
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  const handleVerGraficosCompletos = () => {
    navigate("/graficos", { state: { estoques } });
  };

  return (
    <div className="graficos-compactos-card" onClick={handleVerGraficosCompletos}>
      <h3>Visão Geral do Estoque</h3>
      <div className="grafico-container">
        <Bar data={data} options={options} />
      </div>
      <p className="ver-mais-texto">Clique para ver gráficos completos</p>
    </div>
  );
}