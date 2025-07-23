import API from '../utils/api';

export const register = async (data) => {
  try {
    const res = await API.post('/auth/register', data);
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Gagal register'
    };
  }
};

export const login = async ({ username, password }) => {
  try {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    const res = await API.post('/auth/login', { username, password });

    const { token, user } = res.data;

    // Simpan token dan user di localStorage
    if (token && user) {
      if( user.role === 'admin'){
        localStorage.setItem('adminToken',token)
        localStorage.setItem('adminUser', JSON.stringify(user))
      }else{
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }
    }

    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Login gagal',
    };
  }
};

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

    if (!token) return { loggedIn: false };

    const res = await API.get('/auth/check')
    return {
      loggedIn: true,
      user: res.data.user
    };
  } catch (err) {
    return {
      loggedIn: false,
      message: err.response?.data?.message || 'Autentikasi gagal',
    };
  }
};


export const logout = async () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  await API.post('/auth/logout');
};
