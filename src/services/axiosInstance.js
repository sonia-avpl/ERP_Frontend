import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

ApiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default ApiService;
