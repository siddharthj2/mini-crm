import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", 
  withCredentials: true, 
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;