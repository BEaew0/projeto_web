import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import './barra-pesquisa.css';

export default function Barra_pesquisa({ onSearch, onFilterChange, estoques }) {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState('todos');

  // Gera tipos únicos de produtos
  const tiposProduto = useMemo(() => {
    const tiposUnicos = new Set();
    estoques.forEach(produto => {
      if (produto.tipO_PRODUTO) {
        tiposUnicos.add(produto.tipO_PRODUTO);
      }
    });
    return Array.from(tiposUnicos);
  }, [estoques]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(termoBusca);
    }, 300);
    return () => clearTimeout(timer);
  }, [termoBusca, onSearch]);

  const handleBuscaChange = (e) => setTermoBusca(e.target.value);

  const handleFiltroChange = (e) => {
    const valor = e.target.value;
    setFiltroSelecionado(valor);
    onFilterChange(valor);
  };

  return (
    <div className="barra-pesquisa-container">
      <div className="campo-busca">
        <FiSearch className="icone-busca" />
        <input type="text" placeholder="Buscar por nome, localização..." value={termoBusca} onChange={handleBuscaChange} aria-label="Campo de busca" />
      </div>

      <div className="filtro-dropdown">
        <select
          value={filtroSelecionado}
          onChange={handleFiltroChange}
          aria-label="Filtrar por tipo de produto">
          <option value="todos">Todos os tipos</option>
          {tiposProduto.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
