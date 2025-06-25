import * as XLSX from 'xlsx';
import api from './api.js';
import { getQuantidadeCompradaPorProduto } from './ProdutoCompra.js'; // ajuste se estiver em outro arquivo

export const exportToExcel = async (dadosExternos = null, fileName = 'produtos_compras', sheetName = 'Produtos') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Usuário não autenticado');

    let dadosParaExportar = [];

    if (dadosExternos) {
      // Se dados foram passados manualmente, usa eles diretamente
      dadosParaExportar = dadosExternos;
    } else {
      // 1. Buscar produtos
      const produtosResponse = await api.get('/Produto', {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        }
      });
      const produtos = produtosResponse.data;

      // 2. Buscar quantidades por produto
      const mapaQuantidade = await getQuantidadeCompradaPorProduto();

      // 3. Montar dados
      dadosParaExportar = produtos.map(produto => ({
        "Código do Produto": produto.coD_PRODUTO || '',
        "Nome do Produto": produto.nomE_PRODUTO || '',
        "Tipo do Produto": produto.tipO_PRODUTO || '',
        "Valor Unitário": produto.valoR_PRODUTO || 0,
        "Quantidade Comprada": mapaQuantidade[produto.iD_PRODUTO] || 0
      }));
    }

    // 4. Formatar valores em BRL
    dadosParaExportar.forEach(item => {
      if (typeof item['Valor Unitário'] === 'number') {
        item['Valor Unitário'] = item['Valor Unitário'].toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      }
    });

    // 5. Criar e exportar Excel
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
