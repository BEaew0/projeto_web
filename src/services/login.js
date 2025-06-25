import api from './api.js';

export const loginUser = async (userData) => {
  // Limpa credenciais antigas antes de tentar novo login
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userData");

  try {
    // Validação robusta dos campos de entrada
    if (!userData.email?.trim()) {
      throw {
        response: {
          status: 400,
          data: { message: "O email é obrigatório" }
        }
      };
    }

    if (!userData.senha) {
      throw {
        response: {
          status: 400,
          data: { message: "A senha é obrigatória" }
        }
      };
    }

    const credentials = {
      emaiL_USUARIO: userData.email.trim(),
      senhA_USUARIO: userData.senha
    };

    const response = await api.post('/api/Usuarios/login', credentials, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      timeout: 10000
    });

    // Verificação completa da resposta
    if (!response.data?.token) {
      throw {
        response: {
          status: 401,
          data: { message: "Autenticação falhou: token não recebido" }
        }
      };
    }

    // Construção do objeto do usuário com fallbacks seguros
    const user = {
      email: userData.email.trim(),
      nomE_USUARIO: response.data.nomE_USUARIO || userData.email.split('@')[0],
      role: response.data.role || 'user',
      ...(response.data.id && { id: response.data.id }),
      ...(response.data.photo && { photo: response.data.photo })
    };

    // Armazenamento seguro
    localStorage.setItem("accessToken", response.data.token);
    localStorage.setItem("userData", JSON.stringify(user));

    return {
      success: true,
      user,
      token: response.data.token,
      status: response.status,
      message: response.data.message || "Login realizado com sucesso"
    };

  } catch (error) {
    console.error("Erro no serviço de login:", {
      error: error.response?.data || error.message,
      status: error.response?.status,
      config: error.config
    });

    // Padronização do objeto de erro
    const defaultError = {
      success: false,
      message: "Erro durante a autenticação",
      status: error.response?.status || 500,
      details: null
    };

    // Mapeamento de erros específicos
    if (error.code === 'ECONNABORTED') {
      defaultError.message = "Timeout: Servidor não respondeu a tempo";
      defaultError.details = "Tente novamente mais tarde";
    } else if (!error.response) {
      defaultError.message = "Erro de conexão";
      defaultError.details = "Verifique sua conexão com a internet";
    } else {
      switch (error.response.status) {
        case 400:
          defaultError.message = error.response.data?.message || "Dados inválidos";
          break;
        case 401:
          defaultError.message = error.response.data?.message || "Credenciais inválidas";
          break;
        case 403:
          defaultError.message = "Acesso não autorizado";
          defaultError.details = "Você não tem permissão para acessar";
          break;
        case 404:
          defaultError.message = "Serviço não encontrado";
          defaultError.details = "Endpoint não existe";
          break;
        case 500:
          defaultError.message = "Erro interno no servidor";
          defaultError.details = "Tente novamente mais tarde";
          break;
        default:
          defaultError.message = error.response.data?.message || "Erro desconhecido";
      }
    }

    return defaultError;
  }
};