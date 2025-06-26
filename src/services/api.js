import axios from 'axios';

const api = axios.create({
  baseURL: 'https://srv869019.hstgr.cloud',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'

  }
});

// Interceptor para adicionar token automagicamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login'; // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export const testServerConnection = async () => {
  try {
    const response = await fetch(`${api.defaults.baseURL}/api/TestarConexao/StatusAPI`, {
      method: 'GET'
    });
    
    const data = await response.json();
    return {
      connected: response.ok,
      message: data.mensagem || "API está funcionando corretamente",
      server: response.headers.get('server') || 'unknown'
    };
  } catch (error) {
    return {
      connected: false,
      message: "Falha ao conectar com o servidor",
      error: error.message
    };
  }
};

export default api;