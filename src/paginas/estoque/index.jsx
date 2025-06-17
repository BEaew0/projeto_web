// Estoque.jsx
import React from "react";
import ListaEstoquesCompacta from "../../componentes/lista-produtos";

export default function EstoqueFull({ estoques, loading, error }) {
  return (
    <div className="estoque-inteiro">
      <h1>Todos os Itens em Estoque</h1>
      <ListaEstoquesCompacta 
        estoques={estoques} // Mostra TODOS os itens (sem slice)
        loading={loading}
        error={error}/>
    </div>
  );
}