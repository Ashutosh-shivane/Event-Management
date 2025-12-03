import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/", 
   withCredentials: true, // your backend base URL
});

// Add interceptor to send JWT
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
