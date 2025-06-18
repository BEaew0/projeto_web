import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";
import ModalProduto from "../../componentes/modals/MostrarProduto";
import BtnVoltar from "../../componentes/header/botoes/btn_voltar";
import "./estoque.css";

export default function Estoque() {
  const location = useLocation();
  const { state } = location;
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const handleCardClick = (produto) => {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  const exportToExcel = () => {
    if (!state?.estoques || state.estoques.length === 0) return;
    
    const dadosParaExportar = state.estoques.map(item => ({
      "ID": item.id || item.iD_PRODUTO,
      "Produto": item.nomE_PRODUTO,
      "Quantidade": item.quantidadE_PRODUTO,
      "Data Entrada": item.datA_ENTRADA,
      "Preço": item.valoR_PRODUTO ? 
               (typeof item.valoR_PRODUTO === "number" ? 
                `R$ ${item.valoR_PRODUTO.toFixed(2)}` : "R$ 0,00") : "R$ 0,00"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estoque");
    XLSX.writeFile(workbook, `estoque_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="container-estoque">
      <BtnVoltar />
      
      <div className="estoque-header">
        <div className="estoque-titulo">
          <h1>Todos os Itens em Estoque ({state?.estoques?.length || 0})</h1>
        </div>
        <button className="exportar-excel-btn" onClick={exportToExcel}disabled={!state?.estoques || state.estoques.length === 0}>
          Exportar para Excel
        </button>
      </div>
      
      <div className="grid-produtos">
        <ListaEstoquesCompacta estoques={state?.estoques || []}loading={false}error={null}mostrarTodos={true}onCardClick={handleCardClick}/>
      </div>

      {modalAberto && (
        <ModalProduto produto={produtoSelecionado} onClose={() => setModalAberto(false)} />
      )}
    </div>
  );
}