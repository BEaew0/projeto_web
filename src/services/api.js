//importando  o axios 
import axios from 'axios';


//criando a conexão com api
const api = axios.create({
    baseURL: "https://srv869019.hstgr.cloud", 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;


fetch('https://srv869019.hstgr.cloud/api/TestarConexao/StatusAPI')
  .then(response => response.json())
  .then(data => console.log(data.mensagem)) // "API está funcionando corretamente."
  .catch(error => console.error('Erro:', error));