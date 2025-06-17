import api from './api.js';

export const excluirUsuario = async (accessToken) => {
  try {
    const response = await api.patch(
      "https://srv869019.hstgr.cloud/desativar-usuario",
      {}, // Corpo vazio como no cURL
      {
        headers: {
          "accept": "*/*",
          "Authorization": `Bearer ${accessToken}` // Adicionei o token de autenticação
        }
      }
    );

    console.log("Resposta da desativação:", response.data);

    if (response.status === 200) {
      // Remove o token do localStorage se a desativação for bem-sucedida
      localStorage.removeItem("accessToken");
      
      return {
        success: true,
        message: "Usuário desativado com sucesso"
      };
    }

    return {
      success: false,
      message: "Falha ao desativar usuário"
    };
  } catch (error) {
    console.error("Erro ao desativar usuário:", error);

    let errorMessage = "Erro ao desativar usuário";
    let statusCode = 500;

    if (error.response) {
      statusCode = error.response.status;

      switch (statusCode) {
        case 401:
          errorMessage = "Não autorizado - token inválido ou expirado";
          break;
        case 403:
          errorMessage = "Acesso proibido";
          break;
        case 404:
          errorMessage = "Usuário não encontrado";
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
      status: statusCode
    };
  }
};