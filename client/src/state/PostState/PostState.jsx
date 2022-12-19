import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import PostContext from './postContext';
import PostReducer from './postReducer';
import postService from '../../services/post';
import { SET_FILTERS, REMOVE_FILTER, SET_SEARCH, POST_ERROR } from '../types';

const PostState = (props) => {
  const initialState = {
    filters: [],
    search: null,
    error: null,
  };
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const getPosts = async () => {
    try {
      const query = postService.makeQuery();
      if (state.search) {
        query.search(state.search);
      }
      for (let filter of state.filters) {
        query.filter(filter.field, filter.value);
      }
      const posts = await query.exec();
      return posts;
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.data.msg });
    }
  };
  const getPost = async (id) => {
    try {
      const post = await postService.getPost(id);
      return post;
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.data.msg });
    }
  };
  const createPost = async (formData) => {
    try {
      await postService.createPost(formData);
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.data.msg });
    }
  };
  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.data.msg });
    }
  };
  const manageComment = async (id, formData, action) => {
    try {
      await postService.manageComment(id, formData, action);
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.data.msg });
    }
  };

  const setSearch = async (searchText) => {
    dispatch({ type: SET_SEARCH, payload: searchText });
  };
  const setFilters = (filters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  const removeFilter = (filterNumber) => {
    dispatch({ type: REMOVE_FILTER, payload: filterNumber });
  };

  return (
    <PostContext.Provider
      value={{
        ...state,
        createPost,
        getPost,
        getPosts,
        deletePost,
        manageComment,
        setSearch,
        setFilters,
        removeFilter,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;

PostState.propTypes = {
  children: PropTypes.element.isRequired,
};
