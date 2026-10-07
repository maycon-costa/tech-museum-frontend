import api from './api';

const galleryService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/gallery?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  }
};

export default galleryService;