import axiosClient from "./axiosClient";

const campaignApi = {
  create: (data) => axiosClient.post("/campaign", data),
  getAll:() => axiosClient.get("/dashboard")
};

export default campaignApi;