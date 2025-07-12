import api from '../utils/api';

export const getAllComments = async () => api.get('/comments');

export const fetchComments = async () => api.get('/comments');

export const updateComment = async (id, formData) =>
  api.put(`/comments/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteComment = async (id) => api.delete(`/comments/${id}`);

export const submitComment = async (formData) => {
  try {
    const response = await api.post('/comment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: response.data.success,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (err) {
    console.error('Submit Comment Error:', err);
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        'Terjadi kesalahan saat mengirim komentar',
    };
  }
};
