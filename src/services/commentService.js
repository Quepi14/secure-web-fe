import api from '../utils/api';

export const getAllComments = async () => api.get('/comments')

export const updateComment = async (id, data) => api.put(`/comments/${id}`, data) 

export const deleteComment = async (id) => api.delete(`/comments/${id}`)


export const fetchComments = async () => api.get('/comments')

export const submitComment = async (formData) => {
  try {
    const response = await api.post('/comments', formData);
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Submit Comment Error:', err);
    return {
      success: false,
      message: err?.response?.data?.message || 'Terjadi kesalahan saat mengirim komentar',
    };
  }
};