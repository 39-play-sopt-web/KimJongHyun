import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const code = localStorage.getItem("authorizationCode");
  if (code) {
    config.headers.Authorization = code;
  }
  return config;
});