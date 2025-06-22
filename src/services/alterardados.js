import api from './api'; // Importa a instância configurada do axios

export const alterarCampoUsuario = async (campo, novoValor, token) => {
  try {
    // Validação dos parâmetros
    if (!campo || typeof campo !== 'string') {
      throw new Error('Nome do campo é obrigatório e deve ser uma string');
    }
    
    if (novoValor === undefined || novoValor === null) {
      throw new Error('Novo valor é obrigatório');
    }

    const payload = {
      campo: campo,
      novoValor: String(novoValor) // Garante conversão para string
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    console.log('[API] Alterar campo - Enviando:', { campo, novoValor });

    const response = await api.patch('/alterar-campo', payload, config);

    console.log('[API] Alterar campo - Resposta:', response.data);

    return {
      success: true,
      data: response.data,
      status: response.status,
      message: 'Campo atualizado com sucesso'
    };

  } catch (error) {
    console.error('[API] Erro ao alterar campo:', error);

    const errorResponse = {
      success: false,
      message: 'Erro ao atualizar campo',
      status: error.response?.status || 500,
      details: error.response?.data || error.message
    };

    // Tratamento específico para erros comuns
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorResponse.message = 'Dados inválidos';
          break;
        case 401:
          errorResponse.message = 'Não autorizado - faça login novamente';
          break;
        case 403:
          errorResponse.message = 'Acesso negado';
          break;
        case 404:
          errorResponse.message = 'Endpoint não encontrado';
          break;
        case 422:
          errorResponse.message = 'Validação falhou: ' + 
            (error.response.data?.errors?.join(', ') || 'Dados inválidos');
          break;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorResponse.message = 'Tempo de conexão esgotado';
    } else if (!error.response) {
      errorResponse.message = 'Sem resposta do servidor';
    }

    return errorResponse;
  }
};

// Funções especializadas
export const alterarEmailUsuario = async (novoEmail, token) => {
  if (!novoEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
    return {
      success: false,
      message: 'Formato de email inválido',
      status: 400
    };
  }
  return await alterarCampoUsuario('emaiL_USUARIO', novoEmail, token);
};

export const alterarSenhaUsuario = async (novaSenha, token) => {
  if (!novaSenha || novaSenha.length < 8) {
    return {
      success: false,
      message: 'Senha deve ter no mínimo 8 caracteres',
      status: 400
    };
  }
  return await alterarCampoUsuario('senhA_USUARIO', novaSenha, token);
};

export const alterarImagemUsuario = async (imagemBase64, token) => {
  try {
    // Validação do parâmetro
    if (!imagemBase64 || typeof imagemBase64 !== 'string') {
      return {
        success: false,
        message: 'Imagem em formato Base64 é obrigatória',
        status: 400
      };
    }

    // Verifica se é um Base64 válido ou uma URL data
    if (!imagemBase64.startsWith('data:image/') && !/^[A-Za-z0-9+/]+={0,2}$/.test(imagemBase64)) {
      return {
        success: false,
        message: 'Formato de imagem inválido. Deve ser um Base64 válido ou uma URL data',
        status: 400
      };
    }

    const payload = {
      imagemBase64: imagemBase64
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
      timeout: 15000 // Timeout maior para upload de imagens
    };

    console.log('[API] Alterar imagem - Enviando requisição');

    const response = await api.patch('/alterar-imagem', payload, config);

    console.log('[API] Alterar imagem - Resposta:', response.data);

    return {
      success: true,
      data: response.data,
      status: response.status,
      message: 'Imagem atualizada com sucesso'
    };

  } catch (error) {
    console.error('[API] Erro ao alterar imagem:', error);

    const errorResponse = {
      success: false,
      message: 'Erro ao atualizar imagem',
      status: error.response?.status || 500,
      details: error.response?.data || error.message
    };

    // Tratamento específico para erros comuns
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorResponse.message = 'Dados da imagem inválidos';
          break;
        case 401:
          errorResponse.message = 'Não autorizado - faça login novamente';
          break;
        case 403:
          errorResponse.message = 'Acesso negado';
          break;
        case 413:
          errorResponse.message = 'Imagem muito grande';
          break;
        case 415:
          errorResponse.message = 'Formato de imagem não suportado';
          break;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorResponse.message = 'Tempo de conexão esgotado';
    } else if (!error.response) {
      errorResponse.message = 'Sem resposta do servidor';
    }

    return errorResponse;
  }
};