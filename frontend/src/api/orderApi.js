import axiosClient from "./axiosClient";

const orderApi = {
  create: (data) => axiosClient.post("/order", data),
  getAll: () => axiosClient.get("/order"),
  getByCustomer: (id) => axiosClient.get(`/order/customer/${id}`),
};

export default orderApi;