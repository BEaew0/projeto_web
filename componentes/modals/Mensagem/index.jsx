import React from 'react';
import "./mensagem.css";

export default function Mensagem({ titulo, texto, botoes, onClick }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{titulo}</h2>
        <p>{texto}</p>
        
        <div className="modal-botoes">
          {botoes?.map((botao, index) => (
            <button key={index}className={`btn-${botao.tipo}`}onClick={() => onClick(botao.texto)}>
              {botao.texto}
            </button>))
          }
   
        </div>
      </div>
    </div>
  );
}