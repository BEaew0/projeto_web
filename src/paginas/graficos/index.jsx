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
// import Produtos from '../../services/produto'; // ❌ Comentado
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

// ✅ MOCK local de produtos
const mockProdutos = [
  {
    id: 1,
    nomE_PRODUTO: 'Arroz',
    tipO_PRODUTO: 'Alimento',
    quantidadE_PRODUTO: 120,
    valoR_PRODUTO: 4.5,
    quantidadE_ITEM_COMPRA: 150,
    qtS_ITEM_VENDA: 30,
    datA_ENTRADA: '2024-05-10'
  },
  {
    id: 2,
    nomE_PRODUTO: 'Detergente',
    tipO_PRODUTO: 'Limpeza',
    quantidadE_PRODUTO: 60,
    valoR_PRODUTO: 2.3,
    quantidadE_ITEM_COMPRA: 100,
    qtS_ITEM_VENDA: 40,
    datA_ENTRADA: '2024-04-20'
  },
  {
    id: 3,
    nomE_PRODUTO: 'Sabonete',
    tipO_PRODUTO: 'Higiene',
    quantidadE_PRODUTO: 90,
    valoR_PRODUTO: 1.8,
    quantidadE_ITEM_COMPRA: 120,
    qtS_ITEM_VENDA: 20,
    datA_ENTRADA: '2024-06-01'
  },
  {
    id: 4,
    nomE_PRODUTO: 'Café',
    tipO_PRODUTO: 'Bebida',
    quantidadE_PRODUTO: 40,
    valoR_PRODUTO: 9.9,
    quantidadE_ITEM_COMPRA: 50,
    qtS_ITEM_VENDA: 10,
    datA_ENTRADA: '2024-03-15'
  },
  {
    id: 5,
    nomE_PRODUTO: 'Feijão',
    tipO_PRODUTO: 'Alimento',
    quantidadE_PRODUTO: 75,
    valoR_PRODUTO: 6.2,
    quantidadE_ITEM_COMPRA: 90,
    qtS_ITEM_VENDA: 15,
    datA_ENTRADA: '2024-01-12'
  }
];

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
        // const dados = await Produtos.getProdutosUsuario(); // ❌ API real comentada
        const dados = mockProdutos; // ✅ Mock
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
        // const dados = tipoSelecionado === 'Todos'
        //   ? await Produtos.getProdutosUsuario()
        //   : await Produtos.filtrarPorTipo(tipoSelecionado);

        const dados = tipoSelecionado === 'Todos'
          ? mockProdutos
          : mockProdutos.filter(p => p.tipO_PRODUTO === tipoSelecionado);

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
            onClick={() => exportToExcel(dadosParaExcel, 'dados_graficos')}
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
          {/* Mesma estrutura de gráficos conforme original */}
          {/* ... (BarChart, PieChart, etc.) */}
        </>
      )}
    </div>
  );
}