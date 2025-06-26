import api from './api.js';

/**
 * Serviço para desativação de usuários
 */

/**
 * Desativa a conta do usuário autenticado
 * @returns {Promise<{success: boolean, message: string, data: any|null}>} 
 * Resultado da operação
 */
export const DesativarUsuario = async () => {
  try {
    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Configuração da requisição com headers explícitos
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    };

    // Faz a requisição para desativar o usuário
    const response = await api.patch('/api/Usuarios/desativar-usuario', null, config);

    // Limpa os dados do usuário independentemente do status
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("refreshToken");

    return {
      success: true,
      message: "Usuário desativado com sucesso",
      data: response.data || null
    };

  } catch (error) {
    console.error("Erro ao desativar usuário:", error);
    
    // Limpa os dados em caso de erro 401
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    }

    // Tratamento estruturado de erros
    const errorResponse = {
      success: false,
      message: "Erro ao desativar usuário",
      status: error.response?.status || 500,
      data: null
    };

    const errorMessages = {
      400: "Requisição inválida",
      401: "Sessão expirada. Faça login novamente.",
      403: "Você não tem permissão para esta ação",
      404: "Usuário não encontrado",
      409: "Não foi possível desativar a conta",
      500: "Erro interno no servidor"
    };

    errorResponse.message = errorMessages[error.response?.status] || 
                          error.response?.data?.message || 
                          error.message || 
                          "Erro desconhecido";

    return errorResponse;
  }
};