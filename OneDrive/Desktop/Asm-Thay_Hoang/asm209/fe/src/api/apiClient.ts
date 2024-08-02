import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

export default apiClient;
