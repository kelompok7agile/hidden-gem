// set up configuration for axios
import axios from "axios";

const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";

console.log('baseUrl', baseUrl);
console.log('token', token);
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // get HGToken from local storage
  if (token) {
    config.headers["HGToken"] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
