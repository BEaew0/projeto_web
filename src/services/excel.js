import * as XLSX from 'xlsx';

export const exportToExcel = (estoques, fileName = 'estoque', sheetName = 'Estoque') => {
  if (!estoques || estoques.length === 0) {
    console.warn('Nenhum dado para exportar');
    return false;
  }

  try {
    const dadosParaExportar = estoques.map(item => ({
      "ID": item.id || item.iD_PRODUTO || '',
      "Produto": item.nomE_PRODUTO || '',
      "Quantidade": item.quantidadE_PRODUTO || 0,
      "Valor Unitário": item.valoR_PRODUTO || 0,
      "Data Entrada": item.datA_ENTRADA || 'N/A',
      "Localização": item.localizacao || 'N/A'
    }));

    // Converter números para formato brasileiro
    dadosParaExportar.forEach(item => {
      if (typeof item['Valor Unitário'] === 'number') {
        item['Valor Unitário'] = item['Valor Unitário'].toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      }
    });

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

export const exportChartDataToExcel = (dados, fileName = 'graficos', sheetName = 'Dados') => {
  return exportToExcel(dados, fileName, sheetName);
};