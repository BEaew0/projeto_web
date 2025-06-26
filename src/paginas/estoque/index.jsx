import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import ModalProduto from "../../componentes/modals/MostrarProduto";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
// import Produtos from "../../services/produto"; // ❌ Comentado
import "./estoque.css";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidadeFiltrada, setQuantidadeFiltrada] = useState(0);
  const navigate = useNavigate();

  // ✅ Mock de produtos
  const mockProdutos = [
    {
      id: 1,
      nome: "Arroz",
      valor: 5.5,
      tipo: "Alimento",
      imagem: "https://via.placeholder.com/100",
      quantidade: 20
    },
    {
      id: 2,
      nome: "Feijão",
      valor: 7.9,
      tipo: "Alimento",
      imagem: "https://via.placeholder.com/100",
      quantidade: 15
    },
    {
      id: 3,
      nome: "Sabão",
      valor: 2.5,
      tipo: "Limpeza",
      imagem: "",
      quantidade: 8
    }
  ];

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        setError(null);

        // const produtosCarregados = await Produtos.getProdutosUsuario(); // ❌ Comentado
        const produtosCarregados = mockProdutos; // ✅ Usando mock local

        const formatados = produtosCarregados.map(p => ({
          id: p.id,
          nome: p.nome,
          valor: p.valor,
          tipo: p.tipo,
          imagem: p.imagem,
          quantidade: p.quantidade || 0
        }));

        setProdutos(formatados);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
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
        onQuantidadeFiltradaChange={setQuantidadeFiltrada}
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