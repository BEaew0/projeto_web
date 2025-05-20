import axios from "axios";

const apiTS= axios.create({
    baseURL: "https://localhost:7221/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
     
      },


});

export default apiTS;
