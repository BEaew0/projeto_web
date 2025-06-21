import api from './api.js';

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) 
  {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => 
{
  return Promise.reject(error);
});

const ProdutosService = {
  /**
   * Busca todos os produtos do usuário logado
   * @returns {Promise<Array>} Lista de produtos formatados
   */
  async getProdutosUsuario() 
  {
    try 
    {
      const response = await api.get('Produtos/buscar-todos-produtos-users');
      
      return response.data.map(produto => this._formatarProduto(produto));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw this._handleError(error);
    }
  },

  /**
   * Busca detalhes completos de um produto específico
   * @param {number} id - ID do produto
   * @returns {Promise<Object>} Detalhes completos do produto
   */
  async getProdutoDetalhado(id) 
  {
    try 
    {
      const response = await api.get(`Produtos/buscar-produto/${id}`);
      return this._formatarProduto(response.data, true); // true para detalhes completos
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw this._handleError(error);
    }
  },

  /**
   * Formata os dados do produto conforme a estrutura da API
   * @private
   */
  _formatarProduto(produto, detalhesCompletos = false) 
  {
    const produtoFormatado = {
      id: produto.iD_PRODUTO,
      idUsuario: produto.iD_USUARIO_FK,
      codigo: produto.coD_PRODUTO,
      nome: produto.nomE_PRODUTO,
      valor: produto.valoR_PRODUTO,
      tipo: produto.tipO_PRODUTO,
      imagem: produto.imG_PRODUTO,
      fornecedor: produto.fornecedor ? this._formatarFornecedor(produto.fornecedor, detalhesCompletos) : null
    };

    // Adiciona campos específicos para visualização detalhada
    if (detalhesCompletos) {
      produtoFormatado.descricao = produto.desC_PRODUTO;
      produtoFormatado.dataCadastro = produto.datA_CADASTRO_PRODUTO;
      // Adicione outros campos específicos do endpoint detalhado
    }

    return produtoFormatado;
  },

  /**
   * Formata os dados do fornecedor
   * @private
   */
  _formatarFornecedor(fornecedor, detalhesCompletos = false) 
  {
    const fornecedorFormatado = {
      id: fornecedor.iD_FORNECEDOR,
      idUsuario: fornecedor.iD_USUARIO_FK,
      nome: fornecedor.nomE_FORNECEDOR,
      cnpj: fornecedor.cnpJ_FORNECEDOR,
      email: fornecedor.emaiL_FORNECEDOR,
      telefone: fornecedor.teL_FORNECEDOR,
      celular: fornecedor.ceL_FORNECEDOR,
      endereco: fornecedor.enderecO_FORNECEDOR
    };

    if (detalhesCompletos && fornecedor.usuario) {
      fornecedorFormatado.usuario = this._formatarUsuario(fornecedor.usuario);
    }

    return fornecedorFormatado;
  },

  /**
   * Formata os dados do usuário
   * @private
   */
  _formatarUsuario(usuario) 
  {
    return {
      id: usuario.iD_USUARIO,
      nome: usuario.nomE_USUARIO,
      email: usuario.emaiL_USUARIO,
      dataNascimento: usuario.datA_NASC_USUARIO,
      cpf: usuario.cpF_USUARIO,
      cnpj: usuario.cnpJ_USUARIO,
      foto: usuario.fotO_USUARIO,
      status: usuario.statuS_USUARIO,
      assinatura: usuario.assinatura ? this._formatarAssinatura(usuario.assinatura) : null,
      dataInicioAssinatura: usuario.datA_INICIO_ASSINATURA_USUARIO,
      dataValidadeAssinatura: usuario.datA_VALIDADE_ASSINATURA_USUARIO
    };
  },

  /**
   * Formata os dados da assinatura
   * @private
   */
  _formatarAssinatura(assinatura) {
    return {
      id: assinatura.iD_ASSINATURA,
      descricao: assinatura.desC_ASSINATURA,
      valor: assinatura.valoR_ASSINATURA,
      duracaoSegundos: assinatura.duracaO_SEGUNDOS_ASSINATURA,
      tipo: assinatura.tipo_Assinatura ? {
        id: assinatura.tipo_Assinatura.iD_TIPO,
        descricao: assinatura.tipo_Assinatura.desC_TIPO
      } : null
    };
  },

  /**
   * Tratamento centralizado de erros
   * @private
   */
  _handleError(error) {
    if (error.response) {
      switch (error.response.status) 
      {
        case 400: return new Error('Requisição inválida');
        case 401: return new Error('Acesso não autorizado. Faça login novamente.');
        case 404: return new Error('Recurso não encontrado');
        case 500: return new Error('Erro interno no servidor');
        default: return new Error(`Erro na requisição: ${error.response.statusText}`);
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