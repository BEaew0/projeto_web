import api from './api'; // Importa a instância configurada do axios

export const alterarCampoUsuario = async (campo, novoValor) => {
  try {
    if (!campo || typeof campo !== 'string') {
      throw new Error('Nome do campo é obrigatório e deve ser uma string');
    }

    if (novoValor === undefined || novoValor === null) {
      throw new Error('Novo valor é obrigatório');
    }

    const payload = {
      campo: campo,
      novoValor: String(novoValor)
    };

    console.log('[API] Alterar campo - Enviando:', { campo, novoValor });

    const response = await api.patch('/alterar-campo', payload);

    console.log('[API] Alterar campo - Resposta:', response.data);

    return {
      success: true,
      data: response.data,
      status: response.status,
      message: 'Campo atualizado com sucesso'
    };

  } catch (error) {
    console.error('[API] Erro ao alterar campo:', error);

    const status = error.response?.status || 500;
    let message = 'Erro ao atualizar campo';

    switch (status) {
      case 400: message = 'Dados inválidos'; break;
      case 401: message = 'Não autorizado - faça login novamente'; break;
      case 403: message = 'Acesso negado'; break;
      case 404: message = 'Endpoint não encontrado'; break;
      case 422: message = 'Validação falhou: ' +
        (error.response.data?.errors?.join(', ') || 'Dados inválidos'); break;
    }

    if (error.code === 'ECONNABORTED') message = 'Tempo de conexão esgotado';
    if (!error.response) message = 'Sem resposta do servidor';

    return {
      success: false,
      message,
      status,
      details: error.response?.data || error.message
    };
  }
};

export const alterarEmailUsuario = async (novoEmail) => {
  if (!novoEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
    return {
      success: false,
      message: 'Formato de email inválido',
      status: 400
    };
  }
  return await alterarCampoUsuario('emaiL_USUARIO', novoEmail);
};

export const alterarSenhaUsuario = async (novaSenha) => {
  if (!novaSenha || novaSenha.length < 8) {
    return {
      success: false,
      message: 'Senha deve ter no mínimo 8 caracteres',
      status: 400
    };
  }
  return await alterarCampoUsuario('senhA_USUARIO', novaSenha);
};

export const alterarImagemUsuario = async (imagemBase64) => {
  try {
    if (!imagemBase64 || typeof imagemBase64 !== 'string') {
      return {
        success: false,
        message: 'Imagem em formato Base64 é obrigatória',
        status: 400
      };
    }

    if (!imagemBase64.startsWith('data:image/') &&
        !/^[A-Za-z0-9+/]+={0,2}$/.test(imagemBase64)) {
      return {
        success: false,
        message: 'Formato de imagem inválido. Deve ser Base64 ou URL data',
        status: 400
      };
    }

    const payload = { imagemBase64 };

    console.log('[API] Alterar imagem - Enviando requisição');

    const response = await api.patch('/alterar-imagem', payload, {
      timeout: 15000 // upload pode demorar mais
    });

    console.log('[API] Alterar imagem - Resposta:', response.data);

    return {
      success: true,
      data: response.data,
      status: response.status,
      message: 'Imagem atualizada com sucesso'
    };

  } catch (error) {
    console.error('[API] Erro ao alterar imagem:', error);

    const status = error.response?.status || 500;
    let message = 'Erro ao atualizar imagem';

    switch (status) {
      case 400: message = 'Dados da imagem inválidos'; break;
      case 401: message = 'Não autorizado - faça login novamente'; break;
      case 403: message = 'Acesso negado'; break;
      case 413: message = 'Imagem muito grande'; break;
      case 415: message = 'Formato de imagem não suportado'; break;
    }

    if (error.code === 'ECONNABORTED') message = 'Tempo de conexão esgotado';
    if (!error.response) message = 'Sem resposta do servidor';

    return {
      success: false,
      message,
      status,
      details: error.response?.data || error.message
    };
  }
};
