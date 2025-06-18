import api from './api.js';

export const DesativarUsuario = async (accessToken) => {
  try {
    const response = await api.patch(
      "https://srv869019.hstgr.cloud/desativar-usuario",  // Usando caminho relativo (assumindo que api.js já configura a base URL)
      {}, // Corpo vazio
      {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );

    console.log("Resposta da desativação:", response.data);

    // Considera tanto status 200 quanto 204 como sucesso
    if (response.status === 200 || response.status === 204) {
      // Limpeza mais completa do armazenamento local
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      
      return {
        success: true,
        message: "Usuário desativado com sucesso",
        data: response.data || null
      };
    }

    return {
      success: false,
      message: "Falha ao desativar usuário",
      status: response.status
    };
  } catch (error) {
    console.error("Erro ao desativar usuário:", error);

    const errorResponse = {
      success: false,
      message: "Erro ao desativar usuário",
      status: 500
    };

    if (error.response) {
      errorResponse.status = error.response.status;
      
      const errorMessages = {
        400: error.response.data?.message || "Requisição inválida",
        401: "Não autorizado - token inválido ou expirado",
        403: "Acesso proibido - permissões insuficientes",
        404: "Usuário não encontrado",
        409: "Conflito na desativação",
        500: "Erro interno no servidor"
      };

      errorResponse.message = errorMessages[error.response.status] || 
                            error.response.data?.message || 
                            "Erro desconhecido";
    } else if (error.request) {
      errorResponse.message = "Sem resposta do servidor - verifique sua conexão";
    } else {
      errorResponse.message = "Erro ao configurar a requisição";
    }

    return errorResponse;
  }
};