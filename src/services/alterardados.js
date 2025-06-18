import axios from 'axios';

export const alterarCampoUsuario = async (campo, novoValor, token) => {
  try {
    if (!campo || !novoValor) {
      return {
        success: false,
        message: "Campo e novo valor são obrigatórios",
        status: 400
      };
    }

    const payload = {
      campo: campo,
      novoValor: novoValor
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    };

    const response = await axios.patch('https://srv869019.hstgr.cloud/alterar-campo', payload, config);

    return {
      success: true,
      data: response.data,
      message: "Campo alterado com sucesso",
      status: response.status
    };

  } catch (error) {
    console.error("Erro ao alterar campo:", error);

    let errorMessage = "Erro ao conectar com o servidor";
    let statusCode = 500;
    let serverMessage = null;

    if (error.response) {
      statusCode = error.response.status;
      serverMessage = error.response.data?.message || 
                      error.response.data?.title ||
                      error.response.statusText;

      const errorMessages = {
        400: "Dados inválidos para alteração",
        401: "Não autorizado - token inválido ou expirado",
        403: "Acesso proibido",
        404: "Endpoint não encontrado",
        422: "Validação falhou para o campo"
      };

      errorMessage = errorMessages[statusCode] || serverMessage || "Erro ao alterar campo";
    } else if (error.request) {
      errorMessage = "O servidor não respondeu";
    }

    return {
      success: false,
      message: errorMessage,
      status: statusCode,
      serverMessage: serverMessage,
      error: error.message
    };
  }
};

// ✅ Função para alterar o email
export const alterarEmailUsuario = async (novoEmail, token) => {
  return await alterarCampoUsuario('emaiL_USUARIO', novoEmail, token);
};

// ✅ Função para alterar a senha
export const alterarSenhaUsuario = async (novaSenha, token) => {
  return await alterarCampoUsuario('senhA_USUARIO', novaSenha, token);
};
