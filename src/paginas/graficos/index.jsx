import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useLocation } from 'react-router-dom';
import BtnVoltar from '../../componentes/header/botoes/btn_voltar';
import { exportToExcel } from '../../services/excel';
import { exportToPNG } from '../../services/canva';
import {
  generateBarData,
  generatePieData,
  generateBarDataLucro,
  generateBarDataCompras,
  generateBarDataVendas
} from '../../services/graficos';
import Produtos from '../../services/produto';
import './grafico.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Graficos() {
  const location = useLocation();
  const estoquesOriginais = location.state?.estoques || [];

  const [tipoSelecionado, setTipoSelecionado] = useState('Todos');
  const [tiposProdutos, setTiposProdutos] = useState(['Todos']);
  const [barDataEstoque, setBarDataEstoque] = useState(null);
  const [barDataLucro, setBarDataLucro] = useState(null);
  const [barDataCompras, setBarDataCompras] = useState(null);
  const [barDataVendas, setBarDataVendas] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [lucroTotal, setLucroTotal] = useState(0);
  const [totalItensEstoque, setTotalItensEstoque] = useState(0);
  const [produtosDiferentes, setProdutosDiferentes] = useState(0);
  const [dadosParaExcel, setDadosParaExcel] = useState([]);

  useEffect(() => {
    const carregarTipos = async () => {
      try {
        const dados = await Produtos.getProdutosUsuario();
        const tipos = [...new Set(dados.map(p => p.tipO_PRODUTO))];
        setTiposProdutos(['Todos', ...tipos]);
      } catch (error) {
        console.error('Erro ao carregar tipos de produtos:', error);
      }
    };
    carregarTipos();
  }, []);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = tipoSelecionado === 'Todos'
          ? await Produtos.getProdutosUsuario()
          : await Produtos.filtrarPorTipo(tipoSelecionado);

        const produtosOrdenados = [...dados].sort(
          (a, b) => (b.quantidadE_PRODUTO || 0) - (a.quantidadE_PRODUTO || 0)
        );

        setBarDataEstoque(generateBarData(produtosOrdenados, 'Quantidade em Estoque'));
        setBarDataLucro(generateBarDataLucro(produtosOrdenados));
        setBarDataCompras(generateBarDataCompras(produtosOrdenados));
        setBarDataVendas(generateBarDataVendas(produtosOrdenados));

        setPieData(generatePieData(
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
        ));

        const lucro = produtosOrdenados.reduce(
          (total, p) => total + ((p.quantidadE_PRODUTO || 0) * (p.valoR_PRODUTO || 0)), 0);
        const totalEstoque = produtosOrdenados.reduce(
          (total, p) => total + (p.quantidadE_PRODUTO || 0), 0);
        const diferentes = new Set(produtosOrdenados.map(p => p.nomE_PRODUTO)).size;

        setLucroTotal(lucro);
        setTotalItensEstoque(totalEstoque);
        setProdutosDiferentes(diferentes);

        setDadosParaExcel(produtosOrdenados.map(item => ({
          'Produto': item.nomE_PRODUTO,
          'Quantidade em Estoque': item.quantidadE_PRODUTO,
          'Quantidade Comprada': item.quantidadE_ITEM_COMPRA || 0,
          'Quantidade Vendida': item.qtS_ITEM_VENDA || 0,
          'Data de Entrada': item.datA_ENTRADA || 'N/A',
          'Valor Unitário (R$)': (item.valoR_PRODUTO || 0).toFixed(2),
          'Lucro Estimado (R$)': ((item.quantidadE_PRODUTO || 0) * (item.valoR_PRODUTO || 0)).toFixed(2)
        })));

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    carregarDados();
  }, [tipoSelecionado]);

  return (
    <div className="graficos-container">
      <div className="header-graficos">
        <BtnVoltar />
        <h1>Gráficos de Estoque</h1>

        <div className="filtro-container">
          <label htmlFor="filtro">Filtrar por tipo:</label>
          <select
            id="filtro"
            value={tipoSelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
          >
            {tiposProdutos.map((tipo, index) => (
              <option key={index} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div className="botoes-exportacao">
          <button
            onClick={() => exportFilteredProducts(dadosParaExcel, 'dados_graficos')}
            className="exportar-excel-btn"
            disabled={!dadosParaExcel.length}
          >
            Exportar para Excel
          </button>
        </div>
      </div>

      {(!barDataEstoque || !barDataLucro || !barDataCompras || !barDataVendas || !pieData) ? (
        <div className="carregando-msg">
          <p>Carregando gráficos...</p>
        </div>
      ) : (
        <>
          <div className="resumo-financeiro">
            <div className="resumo-card">
              <h2>Resumo Financeiro</h2>
              <div className="resumo-item">
                <span className="resumo-label">Lucro Total Estimado:</span>
                <span className="resumo-valor positivo">
                  R$ {lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Total em Estoque:</span>
                <span className="resumo-valor">{totalItensEstoque} itens</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Produtos Diferentes:</span>
                <span className="resumo-valor">{produtosDiferentes} tipos</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Valor Médio por Item:</span>
                <span className="resumo-valor">
                  R$ {(lucroTotal / totalItensEstoque || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="grafico-section">
            <div className="grafico-header">
              <h2>Quantidade de Produtos em Estoque</h2>
              <button onClick={() => exportToPNG('bar-chart', 'grafico_estoque')}className="download-btn">
                Baixar Gráfico
              </button>
            </div>
            <div className="grafico-wrapper" id="bar-chart">
              <Bar data={barDataEstoque} options={{ responsive: true }} />
            </div>
          </div>

          <div className="grafico-section">
            <div className="grafico-header">
              <h2>Quantidade de Itens Vendidos</h2>
              <button onClick={() => exportToPNG('vendidos-chart', 'grafico_vendas')}className="download-btn">
                Baixar Gráfico
              </button>
            </div>
            <div className="grafico-wrapper" id="vendidos-chart">
              <Bar data={barDataVendas} options={{ responsive: true }} />
            </div>
          </div>

          <div className="grafico-section">
            <div className="grafico-header">
              <h2>Lucro Estimado por Produto</h2>
              <button onClick={() => exportToPNG('lucro-chart', 'grafico_lucro')}className="download-btn">
                Baixar Gráfico
              </button>
            </div>
            <div className="grafico-wrapper" id="lucro-chart">
              <Bar data={barDataLucro} options={{ responsive: true }} />
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
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
