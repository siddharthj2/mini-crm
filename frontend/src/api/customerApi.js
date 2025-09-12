import axiosClient from "./axiosClient";

const customerApi = {
  create: (data) => axiosClient.post("/customer", data),        
  bulkUpload: (data) => axiosClient.post("/customer/bulk", data), 
  getAll: () => axiosClient.get("/customer"),                 
  getMe: () => axiosClient.get("/customer/me"),               
};

export default customerApi;
