import axios from 'axios';
import { BASE_URL } from '../utils/config';

const BASE_RESOURCE_ROUTE = '/api/user/';

const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}${BASE_RESOURCE_ROUTE}`);
  return res.data;
};

const getUser = async (id) => {
  const res = await axios.get(`${BASE_URL}${BASE_RESOURCE_ROUTE}/${id}`);
  return res.data;
};

const updateUser = async (formData) => {
  const res = await axios.put(`${BASE_URL}${BASE_RESOURCE_ROUTE}`, formData);
  return res.data;
};

export default {
  updateUser,
  getUsers,
  getUser,
};
