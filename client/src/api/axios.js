import axios from 'axios';

const api = axios.create({
    baseURL: 'https://e-vault-crypto-backend.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('evault_token');
        if (token) {
            // console.log("Attaching token:", token.substring(0, 10) + "...");
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in localStorage");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
