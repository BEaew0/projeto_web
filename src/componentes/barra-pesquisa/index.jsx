import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import Produtos from '../../services/produto';
import './barra-pesquisa.css';

export default function Barra_pesquisa({ onSearch, onFilterChange }) {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState('todos');
  const [produtos, setProdutos] = useState([]);

  // Carrega produtos da API com timeout e fallback
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );

        const dados = await Promise.race([
          Produtos.getProdutosUsuario(),
          timeout
        ]);

        setProdutos(dados);
      } catch (err) {
        console.warn('API indisponível. Lista de produtos não será exibida.');
        setProdutos([]); // fallback vazio
      }
    };

    carregarProdutos();
  }, []);

  // Busca por nome (dispara onSearch com resultados filtrados)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        const resultado = produtos.filter(produto =>
          produto.nome?.toLowerCase().includes(termoBusca.toLowerCase())
        );
        onSearch(resultado);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [termoBusca, produtos, onSearch]);

  // Gera lista única de tipos dos produtos
  const tiposProduto = useMemo(() => {
    const tipos = new Set();
    produtos.forEach(produto => {
      if (produto.tipo) tipos.add(produto.tipo);
    });
    return Array.from(tipos);
  }, [produtos]);

  // Filtra produtos por tipo (dispara onFilterChange)
  useEffect(() => {
    if (onFilterChange) {
      if (filtroSelecionado === 'todos') {
        onFilterChange(produtos);
      } else {
        const filtrados = produtos.filter(p =>
          p.tipo?.toLowerCase() === filtroSelecionado.toLowerCase()
        );
        onFilterChange(filtrados);
      }
    }
  }, [filtroSelecionado, produtos, onFilterChange]);

  return (
    <div className="barra-pesquisa-container">
      <div className="campo-busca">
        <FiSearch className="icone-busca" />
        <input
          type="text"
          placeholder="Buscar por nome, localização..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          aria-label="Campo de busca"
        />
      </div>

      <div className="filtro-dropdown">
        <select
          value={filtroSelecionado}
          onChange={(e) => setFiltroSelecionado(e.target.value)}
          aria-label="Filtrar por tipo de produto"
        >
          <option value="todos">Todos os tipos</option>
          {tiposProduto.map(tipo => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
