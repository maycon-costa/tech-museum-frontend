import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data && response.data.token) {
      localStorage.setItem('museutech_token', response.data.token);
      localStorage.setItem('museutech_user', JSON.stringify({
        name: response.data.user.name,
        role: response.data.user.role
      }));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('museutech_token');
    localStorage.removeItem('museutech_user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('museutech_user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;