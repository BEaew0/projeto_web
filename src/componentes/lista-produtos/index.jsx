import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Produtos from "../../services/produto";
import Barra_pesquisa from "../barra-pesquisa";
import { exportToExcel } from "../../services/excel";
import "./listaEstoque.css";

export default function ListaEstoquesCompacta({ 
  mostrarTodos = false, 
  onCardClick,
  onExportClick,
  onQuantidadeFiltradaChange,
  filtroEstoqueId
}) {
  const [estoques, setEstoques] = useState([]);
  const [estoquesFiltrados, setEstoquesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null); // ⬅️ novo estado para erro
  const navigate = useNavigate();

  useEffect(() => {
    const carregarEstoques = async () => {
      setLoading(true);
      setErro(null); // limpa erro anterior
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 3000); // timeout em 3s

      try {
        const produtos = await Produtos.getProdutosUsuario();

        const produtosFormatados = produtos.map(p => ({
          ...p,
          iD_ESTOQUE: p.estoque?.id,
          iD_PRODUTO: p.id,
          nomE_PRODUTO: p.nome,
          valoR_PRODUTO: p.valor,
          tipO_PRODUTO: p.tipo,
          imG_PRODUTO: p.imagem,
          quantidadE_PRODUTO: p.quantidade || 0,
          localizacao: p.localizacao || ''
        }));

        setEstoques(produtosFormatados);
        setEstoquesFiltrados(produtosFormatados);

        if (onQuantidadeFiltradaChange) {
          onQuantidadeFiltradaChange(produtosFormatados.length);
        }
      } catch (err) {
        console.warn("Erro ao carregar produtos:", err.message);
        setErro("Erro ao carregar produtos. Tente novamente mais tarde.");
        setEstoques([]);
        setEstoquesFiltrados([]);

        if (onQuantidadeFiltradaChange) {
          onQuantidadeFiltradaChange(0);
        }
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };

    carregarEstoques();
  }, [onQuantidadeFiltradaChange]);

  const handleExportExcel = async () => {
    const dadosParaExportar = estoquesFiltrados.map(p => ({
      'ID': p.iD_PRODUTO,
      'Nome': p.nomE_PRODUTO,
      'Tipo': p.tipO_PRODUTO,
      'Valor': p.valoR_PRODUTO,
      'Quantidade': p.quantidadE_PRODUTO,
      'Localização': p.localizacao || 'N/A'
    }));

    const sucesso = await exportToExcel(dadosParaExportar, 'relatorio_produtos_filtrados');
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
            onSearchResults={(resultados) => {
              setEstoquesFiltrados(resultados);
              if (onQuantidadeFiltradaChange) {
                onQuantidadeFiltradaChange(resultados.length);
              }
            }}
          />
          <button 
            className="exportar-excel-btn"  
            onClick={handleExportExcel} 
            disabled={estoquesFiltrados.length === 0 || loading}>
            {loading ? 'Carregando...' : 'Exportar para Excel'}
          </button>

          {/* Mensagem de erro amigável */}
          {erro && <div className="erro-msg">{erro}</div>}
        </div>
      )}

      {loading ? (
        <div className="loading-compact">Carregando produtos...</div>
      ) : !mostrarTodos ? (
        <ul className="lista-compacta-simples">
          {estoquesFiltrados.slice(0, 4).map((produto) => (
            <li key={produto.iD_PRODUTO}>
              <strong>{produto.nomE_PRODUTO}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <div className="estoques-compact-container">
          {estoquesFiltrados.length > 0 ? (
            estoquesFiltrados.map((produto) => (
              <div 
                key={produto.iD_PRODUTO}
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
                  <p><strong>Tipo:</strong> {produto.tipO_PRODUTO}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="estoque-vazio">
              <span>Nenhum produto encontrado</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
