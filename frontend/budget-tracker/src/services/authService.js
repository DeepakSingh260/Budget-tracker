import api from './api';
import API_CONFIG from '../config/api';

const authService = {
  login: async (credentials) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      // Get user profile after successful login
      const userResponse = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE, {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });
      return userResponse.data;
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      // Get user profile after successful registration
      const userResponse = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE, {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });
      return userResponse.data;
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUserProfile: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    return response.data;
  }
};

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService; 