import api from './api.js';

const Produtos = {
  /**
   * Verifica se o usuário está autenticado antes de fazer requisições
   * @private
   * @throws {Error} Se não estiver autenticado
   */
  _verificarAutenticacao() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Usuário não autenticado. Faça login primeiro.');
    }
    return token;
  },

  /**
   * Busca todos os produtos do usuário autenticado
   * @returns {Promise<Array>} Lista de produtos formatados
   * @throws {Error} Em caso de falha na requisição
   */
  async getProdutosUsuario() {
    try {
      this._verificarAutenticacao();
      const response = await api.get('/api/Produtos/buscar-todos-produtos-users');
      return response.data.map(produto => this._formatarProduto(produto));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca os 5 primeiros produtos do usuário
   * @returns {Promise<Array>} Lista com 5 produtos formatados
   */
  async getTop5ProdutosUsuario() {
    try {
      const produtos = await this.getProdutosUsuario();
      return produtos.slice(0, 5);
    } catch (error) {
      console.error('Erro ao buscar os 5 primeiros produtos:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Filtra produtos por tipo
   * @param {string} tipo - Tipo para filtrar
   * @param {Array} [produtos=null] - Lista opcional de produtos para filtrar
   * @returns {Promise<Array>} Produtos filtrados
   */
  async filtrarPorTipo(tipo, produtos = null) {
    try {
      const listaProdutos = produtos || await this.getProdutosUsuario();
      return listaProdutos.filter(produto => 
        produto.tipo && produto.tipo.toLowerCase() === tipo.toLowerCase()
      );
    } catch (error) {
      console.error(`Erro ao filtrar por tipo ${tipo}:`, error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca produtos por campo específico
   * @param {string} campo - Campo para buscar
   * @param {string} valor - Valor para comparar
   * @returns {Promise<Array>} Produtos encontrados
   */
  async buscarPorCampo(campo, valor) {
    try {
      this._verificarAutenticacao();
      const response = await api.post('/api/Produtos/buscar-produtos-por-campo', {
        campo,
        novoValor: valor
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.map(produto => this._formatarProduto(produto));
    } catch (error) {
      console.error(`Erro ao buscar por ${campo}:`, error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca produtos por nome similar
   * @param {string} nome - Nome ou parte do nome para buscar
   * @returns {Promise<Array>} Produtos encontrados
   */
  async buscarPorNomeSimilar(nome) {
    try {
      this._verificarAutenticacao();
      const response = await api.post(
        '/api/Produtos/buscar-produtos-por-nome-similar', 
        { nome },
        {
          headers: {
            'Content-Type': 'application/json'
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
   * @returns {Promise<Object>} Produto detalhado
   */
  async getProdutoDetalhado(id) {
    try {
      this._verificarAutenticacao();
      const response = await api.get(`/api/Produtos/buscar-produto/${id}`);
      return this._formatarProduto(response.data, true);
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw this._handleError(error);
    }
  },

  /**
   * Formata os dados do produto para o frontend
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

    if (detalhesCompletos) {
      produtoFormatado.descricao = produto.desC_PRODUTO || '';
      produtoFormatado.dataCadastro = produto.datA_CADASTRO_PRODUTO || null;
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
      contato: fornecedor.teL_FORNECEDOR || fornecedor.ceL_FORNECEDOR || '',
      email: fornecedor.emaiL_FORNECEDOR || ''
    };
  },

  /**
   * Trata erros da API de forma padronizada
   * @private
   */
  _handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400: 
          return new Error(error.response.data?.message || 'Dados inválidos');
        case 401:
          // Remove token inválido
          localStorage.removeItem('accessToken');
          return new Error('Sessão expirada. Faça login novamente.');
        case 403:
          return new Error('Acesso não autorizado');
        case 404:
          return new Error('Recurso não encontrado');
        case 500:
          return new Error('Erro interno no servidor');
        default:
          return new Error(error.response.data?.message || `Erro na requisição: ${error.response.statusText}`);
      }
    } else if (error.request) {
      return new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      return new Error(error.message || 'Erro ao configurar a requisição.');
    }
  }
};

export default Produtos;