import QueryBuilder from './queryBuilder';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const BASE_RESOURCE_ROUTE = '/api/post';

const makeQuery = () => {
  return new QueryBuilder(BASE_RESOURCE_ROUTE);
};

const createPost = async (formData) => {
  const res = await axios.post(`${BASE_URL}${BASE_RESOURCE_ROUTE}`, formData);
  return res.data;
};
const getPost = async (id) => {
  const res = await axios.get(`${BASE_URL}${BASE_RESOURCE_ROUTE}/${id}`);
  return res.data;
};
const deletePost = async (id) => {
  await axios.delete(`${BASE_URL}${BASE_RESOURCE_ROUTE}/${id}`);
};
const manageComment = async (id, formData, action) => {
  let config = {
    headers: {
      action: action,
    },
  };
  const res = await axios.put(
    `${BASE_URL}${BASE_RESOURCE_ROUTE}/${id}/comment`,
    formData,
    config
  );
  return res.data;
};
export default {
  makeQuery,
  createPost,
  getPost,
  deletePost,
  manageComment,
};
