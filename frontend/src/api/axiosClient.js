import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", 
  withCredentials: false, 
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      window.location.hash = '#/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;