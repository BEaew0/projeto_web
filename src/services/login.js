import api from './api.js';

export const loginUser = async (userData) => {
  try {
    // Validação básica dos campos de entrada
    if (!userData.email || !userData.senha) {
      return {
        success: false,
        message: "Email e senha são obrigatórios",
        status: 400
      };
    }

    const credentials = {
      emaiL_USUARIO: userData.email.trim(),
      senhA_USUARIO: userData.senha
    };

    const response = await api.post("https://srv869019.hstgr.cloud/api/Usuarios/login", credentials, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      timeout: 10000 // 10 segundos de timeout
    });

    console.log("Resposta completa do login:", response);

    if (!response.data?.token) {
      return {
        success: false,
        message: "Autenticação falhou - token não recebido",
        status: 401
      };
    }

    // Armazenamento seguro do token
    localStorage.setItem("accessToken", response.data.token);
    
    // Se houver dados do usuário na resposta
    if (response.data.user) {
      localStorage.setItem("userData", JSON.stringify(response.data.user));
    }

    return {
      success: true,
      user: response.data.user || null,
      accessToken: response.data.token,
      status: response.status
    };

  } catch (error) {
    console.error("Erro detalhado no login:", error);

    // Tratamento de erros aprimorado
    let errorMessage = "Erro ao conectar com o servidor";
    let statusCode = 500;
    let serverMessage = null;

    if (error.code === 'ECONNABORTED') {
      errorMessage = "Tempo de conexão esgotado";
    } else if (error.response) {
      statusCode = error.response.status;
      serverMessage = error.response.data?.message || error.response.statusText;

      const errorMessages = {
        400: "Dados de login inválidos",
        401: "Credenciais inválidas",
        403: "Acesso não autorizado",
        404: "Endpoint não encontrado",
        429: "Muitas tentativas. Tente novamente mais tarde",
        500: "Erro interno no servidor"
      };

      errorMessage = errorMessages[statusCode] || serverMessage || "Erro desconhecido";
    } else if (error.request) {
      errorMessage = "Servidor não respondeu";
    }

    // Limpar credenciais em caso de erro
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");

    return {
      success: false,
      message: errorMessage,
      status: statusCode,
      serverMessage: serverMessage,
      error: error.message
    };
  }
};