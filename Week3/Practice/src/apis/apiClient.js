// src/apis/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  // .env의 VITE_API_URL(끝에 / 포함) + api/v1
  baseURL: `${import.meta.env.VITE_API_URL}api/v1`,
});

export default apiClient;