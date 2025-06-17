import React from "react";
import "./modal-produto.css";

export default function ModalProduto({ produto, onClose }) {
  if (!produto) return null;

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
              <img src={produto.imG_PRODUTO} alt={produto.nomE_PRODUTO} />
            ) : (
              <div className="no-image">📦</div>
            )}
          </div>
          
          <div className="modal-details">
            <p><strong>ID:</strong> {produto.id}</p>
            <p><strong>Quantidade:</strong> {produto.quantidadE_PRODUTO}</p>
            <p><strong>Data de Entrada:</strong> {produto.datA_ENTRADA}</p>
            <p><strong>Valor:</strong> R$ {produto.valoR_PRODUTO?.toFixed(2) || '0.00'}</p>
            {/* Adicione mais campos conforme necessário */}
          </div>
        </div>
      </div>
    </div>
  );
}