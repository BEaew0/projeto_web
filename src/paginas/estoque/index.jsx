import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import ModalProduto from "../../componentes/modals/MostrarProduto";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import { mockBuscarTodosEstoques } from "../home/estoqueMock";
import "./estoque.css";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidadeFiltrada, setQuantidadeFiltrada] = useState(0); // 👈 Novo estado
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
        if (err.message.includes("401")) {
          navigate("/login");
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

  return (
    <div className="container-estoque">
      <BtnVoltar />

      <div className="estoque-header">
        <div className="estoque-titulo">
          <h1>Todos os Itens em Estoque ({quantidadeFiltrada})</h1>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      <ListaEstoquesCompacta
        mostrarTodos={true}
        estoquesExternos={produtos}
        loadingExternamente={loading}
        errorExternamente={error}
        onCardClick={handleCardClick}
        onQuantidadeFiltradaChange={setQuantidadeFiltrada} // 👈 Envia o setter
      />

      {modalAberto && (
        <ModalProduto
          produto={produtoSelecionado}
          onClose={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
