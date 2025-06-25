import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './GraficosCompactos.css';

ChartJS.register(...registerables);

export default function GraficosCompactos({ estoques }) {
  const navigate = useNavigate();

  // Processamento dos dados
  const { temDados, data, topProdutos } = React.useMemo(() => {
    const validos = (estoques || [])
      .filter(item => item.quantidadE_PRODUTO > 0 && item.nomE_PRODUTO)
      .sort((a, b) => b.quantidadE_PRODUTO - a.quantidadE_PRODUTO)
      .slice(0, 3);

    return {
      temDados: validos.length > 0,
      topProdutos: validos,
      data: {
        labels: validos.map(() => ''), // Labels vazios para ocultar
        datasets: [{
          data: validos.map(item => item.quantidadE_PRODUTO),
          backgroundColor: 'rgba(46, 125, 50, 0.7)',
          borderColor: 'rgba(46, 125, 50, 1)',
          borderWidth: 1,
          barPercentage: 0.8 // Barras mais largas
        }]
      }
    };
  }, [estoques]);

  if (!temDados) return null;

  return (
    <div className="graficos-compactos-card">
      <h3>Visão Geral do Estoque</h3>
      
      <div className="grafico-container" style={{ height: '60px' }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            },
            scales: {
              x: { display: false },
              y: { display: false }
            }
          }}
        />
      </div>

      {/* Legenda em baixo */}
   

      <button className="ver-graficos" onClick={() => navigate("/graficos")}>
        Ver todos os gráficos
      </button>
    </div>
  );
}

GraficosCompactos.propTypes = {
  estoques: PropTypes.arrayOf(
    PropTypes.shape({
      nomE_PRODUTO: PropTypes.string,
      quantidadE_PRODUTO: PropTypes.number
    })
  )
};

GraficosCompactos.defaultProps = {
  estoques: []
};