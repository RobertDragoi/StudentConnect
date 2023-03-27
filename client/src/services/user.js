import axios from 'axios';
import { VITE_USER_SERVER_URL } from '../utils/config';

const BASE_RESOURCE_ROUTE = '/api/user/';

const getUsers = async () => {
  const res = await axios.get(`${VITE_USER_SERVER_URL}${BASE_RESOURCE_ROUTE}`);
  return res.data;
};

const getUser = async (id) => {
  const res = await axios.get(
    `${VITE_USER_SERVER_URL}${BASE_RESOURCE_ROUTE}/${id}`
  );
  return res.data;
};

const updateUser = async (formData) => {
  const res = await axios.put(
    `${VITE_USER_SERVER_URL}${BASE_RESOURCE_ROUTE}`,
    formData
  );
  return res.data;
};

export default {
  updateUser,
  getUsers,
  getUser,
};
