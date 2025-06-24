import React from "react";
import "./modal-produto.css";

const DetailRow = ({ label, value }) => (
  <div className="detail-row">
    <span className="detail-label">{label}:</span>
    <span className="detail-value">{value || 'N/A'}</span>
  </div>
);

export default function ModalProduto({ produto, onClose }) {
  if (!produto) return null;

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

  // Dados principais do produto (incluindo apenas o nome do fornecedor)
  const infoProduto = [
    { label: 'Código', value: produto.coD_PRODUTO || produto.iD_PRODUTO },
    { label: 'Tipo', value: produto.tipO_PRODUTO },
    { label: 'Valor', value: formatarMoeda(produto.valoR_PRODUTO) },
    { label: 'Data de Entrada', value: formatarData(produto.datA_ENTRADA) },
    { label: 'Fornecedor', value:  produto.fornecedor?.nomE_FORNECEDOR }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2>{produto.nomE_PRODUTO}</h2>
        </div>
        
        <div className="modal-content">
          <div className="modal-image">
            {produto.imG_PRODUTO ? (
              <img 
                src={produto.imG_PRODUTO} 
                alt={produto.nomE_PRODUTO}
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