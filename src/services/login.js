import api from './api';

const USER_DATA_KEY = 'userData';
const AUTH_TOKEN_KEY = 'accessToken';

/**
 * Realiza o login do usuário e busca dados completos
 * @param {Object} userData - Dados de login {email, senha}
 * @returns {Promise<Object>} Resultado do login
 */
export const loginUser = async (userData) => {
  // Limpeza segura dos dados anteriores
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  delete api.defaults.headers.common['Authorization'];

  try {
    // Validação dos campos
    const validationErrors = {};
    if (!userData.email?.trim()) validationErrors.email = "O email é obrigatório";
    if (!userData.senha?.trim()) validationErrors.senha = "A senha é obrigatória";
    
    if (Object.keys(validationErrors).length > 0) {
      return {
        success: false,
        status: 400,
        message: "Dados inválidos",
        errors: validationErrors
      };
    }

    // 1. Realiza o login básico
    const credentials = {
      emaiL_USUARIO: userData.email.trim(),
      senhA_USUARIO: userData.senha
    };

    const response = await api.post('/api/Usuarios/login', credentials);
    const { token, message = "Login realizado com sucesso" } = response.data;

    if (!token) {
      return {
        success: false,
        status: 401,
        message: "Autenticação falhou: token não recebido"
      };
    }

    // 2. Armazena o token
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 3. Busca dados completos do usuário
    let userComplete;
    try {
      // 3.1 Busca dados básicos
      const basicResponse = await api.get('/buscar-dados-usuario');
      
      // 3.2 Busca imagem separadamente
      let imagem = null;
      try {
        const imgResponse = await api.get('/api/Usuarios/Buscar-Imagem');
        if (imgResponse.data) {
          imagem = formatImageUrl(imgResponse.data);
        }
      } catch (imgError) {
        console.warn('Aviso: Não foi possível obter a imagem', imgError);
      }

      // 3.3 Formata os dados completos
      userComplete = {
        id: basicResponse.data.id,
        nome: basicResponse.data.nomE_USUARIO || userData.email.split('@')[0],
        email: userData.email.trim(),
        dataNascimento: basicResponse.data.datA_NASC_USUARIO,
        cpf: basicResponse.data.cpF_USUARIO,
        imagem: imagem || basicResponse.data.fotO_USUARIO,
        role: basicResponse.data.role || 'user',
        assinatura: basicResponse.data.iD_ASSINATURA_FK
      };

      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userComplete));
    } catch (fetchError) {
      console.error('Erro ao buscar dados adicionais:', fetchError);
      // Se falhar, usa os dados mínimos do token
      userComplete = {
        email: userData.email.trim(),
        nome: userData.email.split('@')[0],
        role: 'user'
      };
    }

    return {
      success: true,
      user: userComplete,
      token,
      status: response.status,
      message
    };

  } catch (error) {
    console.error("Erro no serviço de login:", error);
    
    const errorResponse = {
      success: false,
      message: getErrorMessage(error),
      status: error.response?.status || 500,
      details: null,
      errors: {}
    };

    if (error.response?.data?.errors) {
      errorResponse.errors = error.response.data.errors;
    }

    return errorResponse;
  }
};

/**
 * Formata URL da imagem
 */
function formatImageUrl(imgData) {
  if (!imgData) return null;
  if (imgData.startsWith('http')) return imgData;
  return `${api.defaults.baseURL}${imgData}`;
}

/**
 * Obtém mensagem de erro amigável
 */
function getErrorMessage(error) {
  if (error.response) {
    switch (error.response.status) {
      case 400: return 'Dados inválidos';
      case 401: return 'Credenciais inválidas';
      case 403: return 'Acesso não autorizado';
      case 404: return 'Usuário não encontrado';
      case 500: return 'Erro no servidor';
      default: return error.response.data?.message || `Erro ${error.response.status}`;
    }
  }
  return error.message || 'Erro de conexão';
}

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;

  // Verificação opcional de expiração do token
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

/**
 * Obtém os dados armazenados do usuário
 */
export const getStoredUserData = () => {
  const data = localStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * Atualiza os dados do usuário no servidor e localmente
 */
export const updateUserData = async (updatedData) => {
  try {
    const response = await api.put('/api/Usuarios', updatedData);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return {
      success: false,
      message: getErrorMessage(error)
    };
  }
};