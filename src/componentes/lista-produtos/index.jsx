import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Produtos from "../../services/produto";
import Barra_pesquisa from "../barra-pesquisa";
import { exportToExcel } from "../../services/excel";
import "./listaEstoque.css";

export default function ListaProdutosCompacta({
  modoCompacto = false,
  onCardClick,
  onExportClick,
  onQuantidadeFiltradaChange
}) {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProdutos = async () => {
      setLoading(true);
      setErro(null);

      try {
        const produtosData = modoCompacto
          ? await Produtos.getTop5ProdutosUsuario()
          : await Produtos.getProdutosUsuario();

        const produtosFormatados = produtosData.map(p => ({
          id: p.id,
          nome: p.nome,
          valor: p.valor,
          tipo: p.tipo,
          imagem: p.imagem,
          quantidade: p.quantidade || 0
        }));

        setProdutos(produtosFormatados);
        setProdutosFiltrados(produtosFormatados);

        if (onQuantidadeFiltradaChange) {
          onQuantidadeFiltradaChange(produtosFormatados.length);
        }
      } catch (err) {
        console.error("Erro ao carregar produtos:", err.message);
        setErro(err.message || "Erro ao carregar produtos");

        if (err.message.includes('autenticado')) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [modoCompacto, navigate, onQuantidadeFiltradaChange]);

  const handleExportExcel = async () => {
    try {
      const dadosParaExportar = produtosFiltrados.map(p => ({
        'ID': p.id,
        'Nome': p.nome,
        'Tipo': p.tipo,
        'Valor': p.valor,
        'Quantidade': p.quantidade
      }));

      const sucesso = await exportToExcel(
        dadosParaExportar,
        modoCompacto ? 'produtos_compacto' : 'produtos_completo'
      );

      if (onExportClick) {
        onExportClick(sucesso);
      }
    } catch (error) {
      console.error("Erro ao exportar para Excel:", error);
      setErro("Erro ao exportar dados");
    }
  };

  const handleSearch = async (termo) => {
    try {
      let resultados = termo.trim() === ''
        ? (modoCompacto ? await Produtos.getTop5ProdutosUsuario() : await Produtos.getProdutosUsuario())
        : await Produtos.buscarPorNomeSimilar(termo);

      const resultadosFormatados = resultados.map(p => ({
        id: p.id,
        nome: p.nome,
        valor: p.valor,
        tipo: p.tipo,
        imagem: p.imagem,
        quantidade: p.quantidade || 0
      }));

      setProdutosFiltrados(resultadosFormatados);

      if (onQuantidadeFiltradaChange) {
        onQuantidadeFiltradaChange(resultadosFormatados.length);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      setErro(error.message);
    }
  };

  const renderProdutoCompacto = (produto) => (
    <li
      key={produto.id}
      onClick={() => onCardClick && onCardClick(produto)}
      className="produto-compacto-item"
    >
      <div className="produto-info-compacto">
        <strong>{produto.nome}</strong>
        <span>{produto.quantidade} un.</span>
      </div>
      {produto.imagem && (
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="produto-img-compacto"
          onError={(e) => e.target.src = '/imagem-padrao.png'}
        />
      )}
    </li>
  );

  const renderProdutoCompleto = (produto) => (
    <div
      key={produto.id}
      className="produto-completo-card"
      onClick={() => onCardClick && onCardClick(produto)}
    >
      <div className="produto-header">
        {produto.imagem && (
          <img
            src={produto.imagem}
            alt={produto.nome}
            onError={(e) => e.target.src = '/imagem-padrao.png'}
          />
        )}
        <div className="produto-titulo">
          <h3>{produto.nome}</h3>
        </div>
      </div>
      <div className="produto-info">
        <div className="info-row">
          <span>Quantidade: {produto.quantidade}</span>
        </div>
        <div className="info-row">
          <span>Valor: R$ {produto.valor.toFixed(2)}</span>
        </div>
        <div className="info-row">
          <span>Tipo: {produto.tipo}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`lista-container ${modoCompacto ? 'modo-compacto' : 'modo-completo'}`}>
      {!modoCompacto && (
        <div className="header-completo">
          <Barra_pesquisa
            onSearch={handleSearch}
            placeholder="Buscar produtos..."
          />

          <button
            className="exportar-excel-btn"
            onClick={handleExportExcel}
            disabled={produtosFiltrados.length === 0 || loading}
          >
            {loading ? 'Processando...' : 'Exportar Excel'}
          </button>

          {erro && <div className="erro-msg">{erro}</div>}
        </div>
      )}

      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Carregando...</span>
        </div>
      ) : erro ? (
        <div className="erro-carregamento">
          <p>{erro}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className="sem-resultados">
          Nenhum produto encontrado
        </div>
      ) : modoCompacto ? (
        <ul className="lista-compacta">
          {produtosFiltrados.map(renderProdutoCompacto)}
        </ul>
      ) : (
        <div className="grade-produtos">
          {produtosFiltrados.map(renderProdutoCompleto)}
        </div>
      )}
    </div>
  );
}
