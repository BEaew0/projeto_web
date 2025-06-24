import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockBuscarTodosEstoques } from "../../paginas/home/estoqueMock";
import Barra_pesquisa from "../barra-pesquisa";
import { exportToExcel } from "../../services/excel";
import "./listaEstoque.css";

export default function ListaEstoquesCompacta({ 
  mostrarTodos = false, 
  onCardClick,
  onExportClick,
  onQuantidadeFiltradaChange,
  filtroEstoqueId // para filtrar produtos por ID do estoque
}) {
  const [estoques, setEstoques] = useState([]); // aqui são os produtos do mock
  const [estoquesFiltrados, setEstoquesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState('todos');
  const navigate = useNavigate();

  useEffect(() => {
    const carregarEstoques = async () => {
      try {
        setLoading(true);
        const dados = await mockBuscarTodosEstoques();

        // mockBuscarTodosEstoques pode retornar array ou objeto?
        // Seu código tratava array, vou manter assim:
        const produtosArray = Array.isArray(dados) ? dados : [];

        setEstoques(produtosArray);
        setEstoquesFiltrados(produtosArray);

        if (onQuantidadeFiltradaChange) {
          onQuantidadeFiltradaChange(produtosArray.length);
        }
      } catch (err) {
        console.error("Erro ao buscar estoques:", err);
        if (err.status === 401) navigate("/login");
        setEstoques([]);
        setEstoquesFiltrados([]);
        if (onQuantidadeFiltradaChange) {
          onQuantidadeFiltradaChange(0);
        }
      } finally {
        setLoading(false);
      }
    };

    carregarEstoques();
  }, [navigate, onQuantidadeFiltradaChange]);

  useEffect(() => {
    const filtrados = estoques.filter((produto) => {
      // Filtra pelo estoque se filtroEstoqueId estiver definido
      const estoqueMatch = !filtroEstoqueId || produto.iD_ESTOQUE === filtroEstoqueId;
      
      // Filtra pelo termo de busca (nome do produto ou localização)
      const nomeMatch = produto.nomE_PRODUTO.toLowerCase().includes(termoBusca.toLowerCase()) ||
                        (produto.localizacao?.toLowerCase().includes(termoBusca.toLowerCase()) ?? false);
      
      // Filtra por tipo do produto (ou todos)
      const tipoMatch = filtroSelecionado === 'todos' || produto.tipO_PRODUTO === filtroSelecionado;
      
      return estoqueMatch && nomeMatch && tipoMatch;
    });

    setEstoquesFiltrados(filtrados);

    if (onQuantidadeFiltradaChange) {
      onQuantidadeFiltradaChange(filtrados.length);
    }
  }, [termoBusca, filtroSelecionado, estoques, filtroEstoqueId, onQuantidadeFiltradaChange]);

  const handleSearch = (termo) => setTermoBusca(termo);
  const handleFilter = (tipo) => setFiltroSelecionado(tipo);

  const handleExportExcel = async () => {
    const sucesso = await exportToExcel(estoquesFiltrados, 'relatorio_estoque_filtrado');
    if (onExportClick) {
      onExportClick(sucesso);
    }
  };

  return (
    <div>
      {mostrarTodos && (
        <div className="header-completo">
          <Barra_pesquisa
            estoques={estoques}
            onSearch={handleSearch}
            onFilterChange={handleFilter}
          />
          <button 
            className="exportar-excel-btn" 
            onClick={handleExportExcel}
            disabled={estoquesFiltrados.length === 0 || loading}
          >
            {loading ? 'Carregando...' : 'Exportar para Excel'}
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-compact">Carregando estoques...</div>
      ) : !mostrarTodos ? (
        <ul className="lista-compacta-simples">
          {estoquesFiltrados.slice(0, 4).map((produto) => (
            <li key={produto.id}>
              <strong>{produto.nomE_PRODUTO}</strong> — {produto.nomE_ESTOQUE}
            </li>
          ))}
        </ul>
      ) : (
        <div className="estoques-compact-container">
          {estoquesFiltrados.length > 0 ? (
            estoquesFiltrados.map((produto) => (
              <div 
                key={produto.id}
                className="estoque-compact-card"
                onClick={() => onCardClick && onCardClick(produto)}
                style={{ cursor: onCardClick ? "pointer" : "default" }}
              >
                <div className="produto-header">
                  <h3>{produto.nomE_PRODUTO}</h3>
                  {produto.imG_PRODUTO && <img src={produto.imG_PRODUTO} alt={produto.nomE_PRODUTO} />}
                </div>
                <div className="produto-info">
                  <p><strong>Quantidade:</strong> {produto.quantidadE_PRODUTO}</p>
                  <p><strong>Valor:</strong> R$ {produto.valoR_PRODUTO.toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-compact">Nenhum produto encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
