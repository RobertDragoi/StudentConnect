import axios from 'axios';
import { BASE_URL } from '../utils/config';

const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/api/users`);
  return res;
};

const getUser = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/users/${id}`);
  return res;
};

const updateUser = async (formData) => {
  const res = await axios.put(`${BASE_URL}/api/users`, formData);
  return res.data;
};

export default {
  updateUser,
  getUsers,
  getUser,
};
