// set up configuration for axios
import axios from "axios";

const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";
const user = localStorage.getItem("user");
const userData = user ? JSON.parse(user) : null;
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
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
      window.location.href = "/auth/login";
    } else if (error.response.status === 403) {
      // Handle forbidden error (403)
      if (userData) {
        console.error(
          `Forbidden: User ${userData.nama} (${userData.role}) does not have permission to access this resource.`
        );
        switch (userData.role) {
          case "admin":
            window.location.href = "/admin";
            break;
          case "user":
            window.location.href = "/app";
            break;
          default:
            window.location.href = "/auth/login";
            break;
        }
        console.error(
          "Forbidden: You don't have permission to access this resource."
        );
        alert("You don't have permission to access this resource.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
