import * as XLSX from 'xlsx';
// import api from './api.js'; // ❌ API comentada
// import { getQuantidadeCompradaPorProduto } from './ProdutoCompra.js'; // ❌ API comentada

// ✅ MOCK de produtos com campos esperados
const mockProdutos = [
  {
    iD_PRODUTO: 1,
    coD_PRODUTO: '001',
    nomE_PRODUTO: 'Arroz',
    tipO_PRODUTO: 'Alimento',
    valoR_PRODUTO: 4.5,
    quantidadeComprada: 150
  },
  {
    iD_PRODUTO: 2,
    coD_PRODUTO: '002',
    nomE_PRODUTO: 'Detergente',
    tipO_PRODUTO: 'Limpeza',
    valoR_PRODUTO: 2.3,
    quantidadeComprada: 100
  },
  {
    iD_PRODUTO: 3,
    coD_PRODUTO: '003',
    nomE_PRODUTO: 'Sabonete',
    tipO_PRODUTO: 'Higiene',
    valoR_PRODUTO: 1.8,
    quantidadeComprada: 120
  }
];

export const exportToExcel = async (dadosExternos = null, fileName = 'produtos_compras', sheetName = 'Produtos') => {
  try {
    // const token = localStorage.getItem('accessToken'); // ❌ Não necessário com mock
    // if (!token) throw new Error('Usuário não autenticado');

    let dadosParaExportar = [];

    if (dadosExternos) {
      // ✅ Usa dados externos se fornecidos
      dadosParaExportar = dadosExternos;
    } else {
      // ❌ BLOCO COMENTADO: requisição real
      /*
      const produtosResponse = await api.get('/Produto', {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 
        }
      });
      const produtos = produtosResponse.data;

      const mapaQuantidade = await getQuantidadeCompradaPorProduto();
      

      dadosParaExportar = produtos.map(produto => ({
        "Código do Produto": produto.coD_PRODUTO || '',
        "Nome do Produto": produto.nomE_PRODUTO || '',
        "Tipo do Produto": produto.tipO_PRODUTO || '',
        "Valor Unitário": produto.valoR_PRODUTO || 0,
        "Quantidade Comprada": mapaQuantidade[produto.iD_PRODUTO] || 0
      }));*/
     

      // ✅ Usando dados mock
      dadosParaExportar = mockProdutos.map(produto => ({
        "Código do Produto": produto.coD_PRODUTO,
        "Nome do Produto": produto.nomE_PRODUTO,
        "Tipo do Produto": produto.tipO_PRODUTO,
        "Valor Unitário": produto.valoR_PRODUTO,
        "Quantidade Comprada": produto.quantidadeComprada
      }));
    }

    // Formata valores em BRL
    dadosParaExportar.forEach(item => {
      if (typeof item['Valor Unitário'] === 'number') {
        item['Valor Unitário'] = item['Valor Unitário'].toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      }
    });

    // Cria e exporta Excel
    const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const dateStr = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    XLSX.writeFile(workbook, `${fileName}_${dateStr}.xlsx`);

    return true;
  } catch (error) {
    console.error('Erro ao exportar para Excel:', error);
    return false;
  }
};