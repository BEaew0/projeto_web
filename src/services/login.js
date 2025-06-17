import api from './api.js';

export const loginUser = async (userData) => {
  try {
    const credentials = {
      emaiL_USUARIO: userData.email,
      senhA_USUARIO: userData.senha,  // Note que corrigi para senhA_USUARIO (consistente com o curl)
    };

    // Usando a URL completa do endpoint como no exemplo curl
    const response = await api.post("https://srv869019.hstgr.cloud/api/Usuarios/login", credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });

    console.log("Resposta do login:", response.data);

    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);

      if (response.data.refreshToken) {
        console.log("Refresh token recebido e armazenado como HTTP-only cookie");
      }

      return {
        success: true,
        user: response.data.user || null,
        accessToken: response.data.token,
      };
    }

    return {
      success: false,
      message: "Token não recebido na resposta",
    };
  } catch (error) {
    console.error("Erro no login:", error);

    let errorMessage = "Erro ao realizar login";
    let statusCode = 500;

    if (error.response) {
      statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          errorMessage = "Email e senha são obrigatórios";
          break;
        case 401:
          errorMessage = "Email ou senha incorretos";
          break;
        case 403:
          errorMessage = "Conta desativada ou sem permissão";
          break;
        case 404:
          errorMessage = "Usuário não encontrado";
          break;
        case 429:
          errorMessage = "Muitas tentativas. Tente novamente mais tarde";
          break;
        default:
          errorMessage = error.response.data?.message || "Erro no servidor";
      }
    } else if (error.request) {
      errorMessage = "Sem resposta do servidor";
    }

    return {
      success: false,
      message: errorMessage,
      status: statusCode,
    };
  }
};