import api from './api.js';

// Configure request interceptor for authentication
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) 
    {
      //pra aceitar texto normal
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.accept = 'text/plain'; 
  }
  return config;
}, 
error => {
  return Promise.reject(error);
});

const ProdutosService = {
  /**
   * Busca todos os produtos do usuário logado
   * @returns {Promise<Array>} Lista de produtos formatados
   */
  async getProdutosUsuario() {
    try {
      const response = await api.get('Produtos/buscar-todos-produtos-users');
      return response.data.map(produto => this._formatarProduto(produto));
    } 
    catch (error) 
    {
      console.error('Erro ao buscar produtos:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca produtos por campo específico
   * @param {string} campo - Nome do campo para busca (ex: "nome", "codigo")
   * @param {string} valor - Valor para busca
   * @returns {Promise<Array>} Lista de produtos encontrados
   */
  async buscarPorCampo(campo, valor) {
    try {
      const response = await api.post('/buscar-produtos-por-campo', {
        campo,
        novoValor: valor
      }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data.map(produto => this._formatarProduto(produto));
    } 
    catch (error) 
    {
      console.error(`Erro ao buscar por ${campo}:`, error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca produtos por nome similar
   * @param {string} nome - Parte do nome do produto
   * @returns {Promise<Array>} Lista de produtos encontrados
   */
  async buscarPorNomeSimilar(nome) {
    try {
      const response = await api.post('/buscar-produtos-por-nome-similar', 
        `"${nome}"`, // Note the quotes as per your API spec
        {
          headers: 
          {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        }
      );
      
      return response.data.map(produto => this._formatarProduto(produto));
    } catch (error) {
      console.error('Erro ao buscar por nome similar:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca detalhes completos de um produto específico
   * @param {number} id - ID do produto
   * @returns {Promise<Object>} Detalhes completos do produto
   */
  async getProdutoDetalhado(id) {
    try {
      const response = await api.get(`Produtos/buscar-produto/${id}`);
      return this._formatarProduto(response.data, true);
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw this._handleError(error);
    }
  },

  /**
   * Formata os dados do produto conforme a estrutura da API
   * @private
   */
  _formatarProduto(produto, detalhesCompletos = false) {
    const produtoFormatado = {
      id: produto.iD_PRODUTO,
      codigo: produto.coD_PRODUTO,
      nome: produto.nomE_PRODUTO,
      valor: produto.valoR_PRODUTO,
      tipo: produto.tipO_PRODUTO,
      imagem: produto.imG_PRODUTO,
      estoque: produto.estoque ? {
        id: produto.estoque.iD_ESTOQUE,
        nome: produto.estoque.nomE_ESTOQUE
      } : null
    };

    if (detalhesCompletos) 
      {
      produtoFormatado.descricao = produto.desC_PRODUTO;
      produtoFormatado.dataCadastro = produto.datA_CADASTRO_PRODUTO;
      produtoFormatado.fornecedor = produto.fornecedor ? this._formatarFornecedor(produto.fornecedor) : null;
    }

    return produtoFormatado;
  },

  /**
   * Formata os dados do fornecedor
   * @private
   */
  _formatarFornecedor(fornecedor) {
    return {
      id: fornecedor.iD_FORNECEDOR,
      nome: fornecedor.nomE_FORNECEDOR,
      contato: fornecedor.teL_FORNECEDOR || fornecedor.ceL_FORNECEDOR,
      email: fornecedor.emaiL_FORNECEDOR
    };
  },

  /**
   * Tratamento centralizado de erros
   * @private
   */
  _handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400: 
          return new Error('Dados inválidos');
        case 401: 
          return new Error('Acesso não autorizado. Faça login novamente.');
        case 404: 
          return new Error('Recurso não encontrado');
        case 500: 
          return new Error('Erro interno no servidor');
        default: 
          return new Error(`Erro na requisição: ${error.response.statusText}`);
      }
    } else if (error.request)
    {
      return new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else 
    {
      return new Error('Erro ao configurar a requisição.');
    }
  }
};

export default ProdutosService;