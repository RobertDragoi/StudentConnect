import axios from 'axios';
import { BASE_URL } from '../utils/config';

const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/api/users`);
  return res;
};

const getUser = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/users/${id}`);
  return res;
};

export default {
  getAllUsers,
  getUser,
};
