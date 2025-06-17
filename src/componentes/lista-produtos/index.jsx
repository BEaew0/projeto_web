export default function ListaEstoquesCompacta({ estoques, loading, error }) {
  if (loading) {
    return <div className="loading-compact">Carregando estoques...</div>;
  }

  if (error) {
    return <div className="error-compact">Erro ao carregar</div>;
  }

  if (!estoques || estoques.length === 0) {
    return <div className="empty-compact">Nenhum item em estoque</div>;
  }

  return (
    <div className="estoques-compact-container">
      {estoques.slice(0, 4).map((estoque) => (
        <div key={estoque.iD_PRODUTO} className="estoque-compact-card">
          <div className="estoque-compact-image">
            {estoque.imG_PRODUTO ? (
              <img src={estoque.imG_PRODUTO} alt={estoque.nomE_PRODUTO} />
            ) : 
            (
              <div className="no-image">📦</div>
            )}
          </div>
          
          <div className="estoque-compact-info">
            <h4>{estoque.nomE_PRODUTO}</h4>
            <p>
              R$ {estoque.valoR_PRODUTO ? typeof estoque.valoR_PRODUTO === 'number' 
                    ? estoque.valoR_PRODUTO.toFixed(2) 
                    : '0.00'
                  : '0.00'
              }
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}