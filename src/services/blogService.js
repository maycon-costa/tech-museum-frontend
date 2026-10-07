import api from './api';

const blogService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/blog?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/blog', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/blog/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  }
};

export default blogService;