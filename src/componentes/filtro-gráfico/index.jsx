import React, { useEffect, useState } from 'react';
// import Produtos from '../../services/produto'; // ❌ API comentada

const FiltroProdutos = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos');
  const [produtos, setProdutos] = useState([]);
  const [tiposProdutos, setTiposProdutos] = useState(['Todos']);

  // ✅ Mock de produtos (interna)
  const mockProdutos = [
    {
      id: 1,
      codigo: 'A001',
      nome: 'Arroz',
      tipo: 'Alimento',
      valor: 5.5,
      estoque: { nome: 'Estoque Central' }
    },
    {
      id: 2,
      codigo: 'B002',
      nome: 'Feijão',
      tipo: 'Alimento',
      valor: 7.9,
      estoque: { nome: 'Estoque Central' }
    },
    {
      id: 3,
      codigo: 'C003',
      nome: 'Detergente',
      tipo: 'Limpeza',
      valor: 2.5,
      estoque: { nome: 'Estoque 2' }
    },
    {
      id: 4,
      codigo: 'D004',
      nome: 'Sabonete',
      tipo: 'Higiene',
      valor: 3.0,
      estoque: null
    }
  ];

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        // const produtosAPI = await Produtos.getProdutosUsuario(); // ❌ Comentado
        const produtosAPI = mockProdutos; // ✅ Usando mock local
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

      <select
        value={tipoSelecionado}
        onChange={(e) => setTipoSelecionado(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px' }}
      >
        {tiposProdutos.map((tipo, index) => (
          <option key={index} value={tipo}>{tipo}</option>
        ))}
      </select>

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