import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Adicionando validação de props
import './GraficosCompactos.css';

ChartJS.register(...registerables);

export default function GraficosCompactos({ estoques }) {
  const navigate = useNavigate();

  // Melhor tratamento para estoques vazios
  if (!estoques || !Array.isArray(estoques)){
    return (
      <div className="graficos-compactos-card">
        <p>Nenhum dado de estoque disponível</p>
      </div>
    );
  }

  // Filtrar itens com quantidade válida
  const estoquesValidos = estoques.filter(
    item => item.quantidadE_PRODUTO !== undefined && 
           item.quantidadE_PRODUTO !== null &&
           item.nomE_PRODUTO
  );

  if (estoquesValidos.length === 0) {
    return (
      <div className="graficos-compactos-card">
        <p>Nenhum dado válido para exibir</p>
      </div>
    );
  }

  // Ordenar e pegar top 3
  const topProdutos = [...estoquesValidos]
    .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO)
    .slice(0, 3);

  // Dados do gráfico
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
    maintainAspectRatio: false, // Permite melhor responsividade
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
          stepSize: 5,
          precision: 0 // Garante números inteiros
        }
      },
      x: {
        grid: {
          display: false // Remove linhas de grid verticais
        }
      }
    }
  };

  return (
    <div className="graficos-compactos-card">
      <h3>Visão Geral do Estoque</h3>
      <div className="grafico-container">
        <Bar 
          data={data} 
          options={options}
          height={250} // Altura fixa para melhor consistência
        />
      </div>
      <button 
        className="ver-mais-btn" 
        onClick={() => navigate("/graficos", { state: { estoques: estoquesValidos } })}
      >
        Ver todos os gráficos
      </button>
    </div>
  );
}

// Validação das props
GraficosCompactos.propTypes = {
  estoques: PropTypes.arrayOf(
    PropTypes.shape({
      nomE_PRODUTO: PropTypes.string.isRequired,
      quantidadE_PRODUTO: PropTypes.number.isRequired
    })
  )
};

// Valores padrão para as props
GraficosCompactos.defaultProps = {
  estoques: []
};