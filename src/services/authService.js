import API from '../utils/api';

export const register = async (data) => {
    try {
        const res = await API.post('/secure-app/auth/register', data);
        return res.data;
    } catch (error) {
        console.error('register error:', error.response?.data || error.message);
        return {
            success: false,
            message: 'Registration failed'
        };
    }
};

export const login = async (credentials) => {
    try {
        const res = await API.post('/secure-app/auth/login', credentials);
        return res.data;
    } catch (error) {
        console.error('checkAuth error:', error.response?.data || error.message);
        return {
            success: false,
            loggedI: false
        };
    }
};

export const checkAuth = async () => {
    try {
        const res = await API.get('/secure-app/auth/check');
        return res.data;
    } catch (error) {
        console.error('checkAuth error:', error.response?.data || error.message);
        return {
            success: false,
            loggedIn: false
        };
    }
};

export const logout = async () => {
    try {
        const res = await API.get('/secure-app/auth/logout');
        return res.data;
    } catch (error) {
        console.error('logout error:', error.response?.data || error.message);
        return {
            success: false,
            message: 'Logout failed'
        };
    }
};

