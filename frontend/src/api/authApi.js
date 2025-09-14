import axiosClient from "./axiosClient";

const authApi = {
  login: () => (window.location.href = `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}/auth/google`),
  logout: () => axiosClient.get("/auth/logout"),
  profile: () => axiosClient.get("/auth/profile"), 
};

export default authApi;