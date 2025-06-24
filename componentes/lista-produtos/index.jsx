import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarTodosEstoquesUser } from "../../services/estoque";

export default function ListaEstoquesCompacta({ mostrarTodos = false, onCardClick }) {
  const [estoques, setEstoques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarEstoques = async () => {
      try {
        setLoading(true);
        const dados = await buscarTodosEstoquesUser();
        setEstoques(dados);
      } catch (err) {
        console.error("Erro ao buscar estoques:", err);
        setError(err.message);
        
        // Se for erro de autenticação, redireciona para login
        if (err.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    carregarEstoques();
  }, [navigate]);

  if (loading) {
    return <div className="loading-compact">Carregando estoques...</div>;
  }

  if (error) {
    return <div className="error-compact">Erro: {error}</div>;
  }

  if (!estoques || estoques.length === 0) {
    return <div className="empty-compact">Nenhum estoque encontrado</div>;
  }

  // Versão compacta - mostra apenas nomes
  if (!mostrarTodos) {
    return (
      <ul className="lista-compacta-simples">
        {estoques.slice(0, 4).map((estoque) => (
          <li key={estoque.iD_ESTOQUE || estoque.id}>
            {estoque.nomE_ESTOQUE || estoque.nome}
          </li>
        ))}
      </ul>
    );
  }

  // Versão completa - mostra cards detalhados
  return (
    <div className="estoques-compact-container">
      {estoques.map((estoque) => (
        <div key={estoque.iD_ESTOQUE || estoque.id} className="estoque-compact-card"onClick={() => onCardClick && onCardClick(estoque)}style={{ cursor: onCardClick ? "pointer" : "default" }}>
          <div className="estoque-compact-header">
            <h3>{estoque.nomE_ESTOQUE || estoque.nome}</h3>
            <p className="estoque-localizacao">
              {estoque.localizacao || "Localização não informada"}
            </p>
          </div>

          <div className="estoque-compact-info">
            <p>
              <strong>Produtos:</strong> {estoque.quantidadeProdutos || 0}
            </p>
            <p>
              <strong>Valor total:</strong> R${" "}
              {estoque.valorTotal ? estoque.valorTotal.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}