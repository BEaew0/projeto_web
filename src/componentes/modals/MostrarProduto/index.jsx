import React, { useState, useEffect } from "react";
import "./modal-produto.css";
import Produtos from "../../../services/produto";

const DetailRow = ({ label, value }) => (
  <div className="detail-row">
    <span className="detail-label">{label}:</span>
    <span className="detail-value">{value || 'N/A'}</span>
  </div>
);

export default function ModalProduto({ produtoId, onClose }) {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const produtoDetalhado = await Produtos.getProdutoDetalhado(produtoId);
        setProduto(produtoDetalhado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (produtoId) {
      carregarProduto();
    }
  }, [produtoId]);

  const formatarMoeda = (valor) => {
    return valor?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }) || 'R$ 0,00';
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'Não informada';
    try {
      return new Date(dataString).toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  if (loading) return <div className="modal-overlay">Carregando...</div>;
  if (error) return <div className="modal-overlay">Erro: {error}</div>;
  if (!produto) return null;

  // Dados principais do produto
  const infoProduto = [
    { label: 'Código', value: produto.codigo },
    { label: 'Tipo', value: produto.tipo },
    { label: 'Valor', value: formatarMoeda(produto.valor) },
    { label: 'Data de Cadastro', value: formatarData(produto.dataCadastro) },
    { label: 'Fornecedor', value: produto.fornecedor?.nome },
    { label: 'Descrição', value: produto.descricao }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2>{produto.nome}</h2>
        </div>
        
        <div className="modal-content">
          <div className="modal-image">
            {produto.imagem ? (
              <img 
                src={produto.imagem} 
                alt={produto.nome}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-produto.png';
                }}
              />
            ) : (
              <div className="no-image">📦</div>
            )}
          </div>
          
          <div className="modal-details">
            <div className="detail-section">
              {infoProduto.map((item, index) => (
                <DetailRow key={`produto-${index}`} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}