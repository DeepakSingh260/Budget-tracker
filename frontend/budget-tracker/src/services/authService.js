import api from './api';

const authService = {
  async register(userData) {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login/', credentials);
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout/');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async getUserProfile() {
    const response = await api.get('/auth/user/');
    return response.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};

export default authService; 