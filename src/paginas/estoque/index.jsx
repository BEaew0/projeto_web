import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import ModalProduto from "../../componentes/modals/MostrarProduto";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import { exportToExcel } from "../../services/excel";
import { mockBuscarTodosEstoques } from "../home/estoqueMock";
import "./estoque.css";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportSuccess, setExportSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        setError(null);
        const produtosCarregados = await mockBuscarTodosEstoques();
        setProdutos(produtosCarregados);
      } catch (err) {
        setError(err.message || "Erro ao carregar produtos");
        if (err.message.includes('401')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [navigate]);

  const handleCardClick = (produto) => {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  const handleExportExcel = async () => {
    const success = await exportToExcel(produtos, 'relatorio_estoque');
    setExportSuccess(success);
    
    // Esconde a notificação após 3 segundos
    if (success) {
      setTimeout(() => setExportSuccess(null), 3000);
    }
  };

  return (
    <div className="container-estoque">
      <BtnVoltar />
      
      <div className="estoque-header">
        <div className="estoque-titulo">
          <h1>Todos os Itens em Estoque ({produtos.length})</h1>
          {error && <div className="error-message">{error}</div>}
          {exportSuccess && (
            <div className="success-message">
              Arquivo exportado com sucesso!
            </div>
          )}
        </div>
        <button 
          className="exportar-excel-btn" 
          onClick={handleExportExcel}
          disabled={produtos.length === 0 || loading}
        >
          {loading ? 'Carregando...' : 'Exportar para Excel'}
        </button>
      </div>
      
      <div className="grid-produtos">
        {loading ? (
          <div className="loading-spinner">Carregando produtos...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <ListaEstoquesCompacta 
            estoques={produtos}
            loading={loading}
            error={error}
            mostrarTodos={true}
            onCardClick={handleCardClick}
          />
        )}
      </div>

      {modalAberto && (
        <ModalProduto 
          produto={produtoSelecionado} 
          onClose={() => setModalAberto(false)} 
        />
      )}
    </div>
  );
}