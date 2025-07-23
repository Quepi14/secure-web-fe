import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3300/secure-app'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;