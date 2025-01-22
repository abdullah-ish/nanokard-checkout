import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default api;
