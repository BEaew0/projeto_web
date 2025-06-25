import React, { useEffect, useState } from 'react';
import Produtos from '../../services/produto';

const FiltroProdutos = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos');
  const [produtos, setProdutos] = useState([]);
  const [tiposProdutos, setTiposProdutos] = useState(['Todos']);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const produtosAPI = await Produtos.getProdutosUsuario();
        setProdutos(produtosAPI);

        const tiposUnicos = ['Todos', ...new Set(produtosAPI.map(p => p.tipo))];
        setTiposProdutos(tiposUnicos);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      }
    };

    carregarProdutos();
  }, []);

  const produtosFiltrados = tipoSelecionado === 'Todos'
    ? produtos
    : produtos.filter(produto => produto.tipo === tipoSelecionado);

  return (
    <div>
      <h2>Filtro de Produtos por Tipo</h2>

      {/* ComboBox de tipo */}
      <select
        value={tipoSelecionado}
        onChange={(e) => setTipoSelecionado(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px' }}
      >
        {tiposProdutos.map((tipo, index) => (
          <option key={index} value={tipo}>{tipo}</option>
        ))}
      </select>

      {/* Tabela de produtos filtrados */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={td}>ID</th>
            <th style={td}>Código</th>
            <th style={td}>Nome</th>
            <th style={td}>Tipo</th>
            <th style={td}>Valor</th>
            <th style={td}>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map(produto => (
            <tr key={produto.id}>
              <td style={td}>{produto.id}</td>
              <td style={td}>{produto.codigo}</td>
              <td style={td}>{produto.nome}</td>
              <td style={td}>{produto.tipo}</td>
              <td style={td}>R$ {produto.valor.toFixed(2)}</td>
              <td style={td}>{produto.estoque?.nome || 'Sem estoque'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const td = { padding: '10px', border: '1px solid #ddd' };

export default FiltroProdutos;
