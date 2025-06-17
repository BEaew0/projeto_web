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