import API from '../utils/api';

export const register = async (data) => {
    try {
        const res = await API.post('/auth/register', data);
        return res.data;
    } catch (error) {
        console.error('register error:', error.response?.data || error.message);
        return {
            success: false,
            message: 'Registration failed'
        };
    }
};

export const login = async ({username, password}) => {
    try {
        const res = await API.post('/auth/login', {username, password});

        if(res.data.token){
            localStorage.setItem('token', res.data.token);
        }
        return res.data;
    } catch (err) {
        return{ succes:false, message: err.response?.data?.message || 'Login failed'};
    }
};

export const checkAuth = async () => {
    try {
        const res = await API.get('/auth/check');
        return { loggedIn: true, user: res.data.user };
    } catch (err) {
        console.error('checkAuth error:', err.response?.data || err.message);
        return {
            loggedIn: false
        };
    }
};

export const logout = async () => {
    localStorage.removeItem('token');
    await API.post('/auth/logout');
};

