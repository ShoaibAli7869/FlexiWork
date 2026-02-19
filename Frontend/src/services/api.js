import toast from "react-hot-toast";
import axios from "axios";

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// API error handler
const handleApiError = (error) => {
  console.error("API Error:", error);

  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || "An error occurred";
    toast.error(message);
    return { success: false, error: message };
  } else if (error.request) {
    // Request was made but no response received
    toast.error("Network error. Please check your connection.");
    return { success: false, error: "Network error" };
  } else {
    // Something else happened
    toast.error("An unexpected error occurred");
    return { success: false, error: error.message };
  }
};

// Axios instance for API calls
const api = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      console.log(`[API] GET ${API_BASE_URL}${endpoint}`, params);
      return await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST request
  post: async (endpoint, data = {}) => {
    try {
      console.log(`[API] POST ${API_BASE_URL}${endpoint}`, data);
      return await axios.post(`${API_BASE_URL}${endpoint}`, data);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT request
  put: async (endpoint, data = {}) => {
    try {
      console.log(`[API] PUT ${API_BASE_URL}${endpoint}`, data);
      return await axios.put(`${API_BASE_URL}${endpoint}`, data);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PATCH request
  patch: async (endpoint, data = {}) => {
    try {
      console.log(`[API] PATCH ${API_BASE_URL}${endpoint}`, data);
      return await axios.patch(`${API_BASE_URL}${endpoint}`, data);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      console.log(`[API] DELETE ${API_BASE_URL}${endpoint}`);
      return await axios.delete(`${API_BASE_URL}${endpoint}`);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// Auth token management
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Initialize auth token from localStorage on app load
const initializeAuth = () => {
  const token = getAuthToken();
  if (token) {
    setAuthToken(token);
  }
};

initializeAuth();

export { API_BASE_URL };
export default api;
