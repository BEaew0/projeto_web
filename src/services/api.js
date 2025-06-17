import axios from 'axios';

const api = axios.create({
    baseURL: "https://srv869019.hstgr.cloud", // ou "https://api.tesouroazul.com.br" se preferir
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;