import axios from "axios";

export const apiBaseUrl = "http://localhost:8000/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or another secure storage
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration or unauthorized errors
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Optionally, handle logout or redirection
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Utility functions for API calls
export const api = {
  get: (url: string, params?: object) => axiosInstance.get(url, { params }),
  post: (url: string, data?: object) => axiosInstance.post(url, data),
  put: (url: string, data?: object) => axiosInstance.put(url, data),
  delete: (url: string) => axiosInstance.delete(url),
};

export default axiosInstance;
