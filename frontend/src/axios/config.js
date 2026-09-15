import axios from "axios";

const partyFetch = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

//Roda antes de CADA requisição feita com o partyFetch
partyFetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // agora sim sempre le o valor mais recente 

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default partyFetch;