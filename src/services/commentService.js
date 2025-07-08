import api from '../utils/api';

export const getAllComments = async () => api.get('/comments')

export const updateComment = async (id, data) => api.put(`/comments/${id}`, data) 

export const deleteComment = async (id) => api.delete(`/comments/${id}`)


export const fetchComments = async () => api.get('/comments')

export const submitComment = async (FormData) => {
    return api.post('/comments', FormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}