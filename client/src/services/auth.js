import { BASE_URL } from '../utils/config';
import Cookies from 'js-cookie';
import axios from 'axios';

const setAuthToken = async (token) => {
  if (token === null) {
    console.log('REMOVING TOKEN');
  }
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    Cookies.set('auth-token', token, {
      expires: 1 / 24,
    });
  } else {
    delete axios.defaults.headers.common['Authorization'];
    Cookies.remove('auth-token');
  }
};
const setRefreshToken = async (token) => {
  if (token) {
    Cookies.set('refresh-token', token, {
      expires: 30,
    });
  } else {
    Cookies.remove('refresh-token', token);
  }
};

const refreshToken = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('refresh-token'),
    },
  };
  const res = await axios.post(`${BASE_URL}/api/auth/refresh`, {}, config);
  setAuthToken(res.data.authToken);
};

const login = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
  setAuthToken(res.data.authToken);
  setRefreshToken(res.data.refreshToken);
  return res.data.authToken;
};

const logout = async () => {
  setAuthToken();
  setRefreshToken();
};

const register = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/auth/register`, formData);
  setAuthToken(res.data.authToken);
  setRefreshToken(res.data.refreshToken);
  return res.data.authToken;
};

const loadUser = async () => {
  const res = await axios.get(`${BASE_URL}/api/auth/user`);
  return res.data;
};

export default {
  setAuthToken,
  setRefreshToken,
  refreshToken,
  login,
  logout,
  register,
  loadUser,
};
