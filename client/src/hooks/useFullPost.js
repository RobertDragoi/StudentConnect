import { useState, useContext } from 'react';
import UserContext from '../state/UserState/userContext';
import PostContext from '../state/PostState/postContext';

import { useParams } from 'react-router-dom';
import { formatDate } from '../utils/functions';

const useFullPost = () => {
  console.log('useFullPost');
  const { id } = useParams();
  const [render, setRender] = useState('');
  const { user, isAuthenticated } = useContext(UserContext);
  const { manageComment, getPost } = useContext(PostContext);
  const [comment, setComment] = useState({ user: user?.id, body: '' });
  const [updatedComment, setUpdatedComment] = useState({ user: user?.id });
  const [edit, setEdit] = useState({ id: null, bool: false });
  const { body } = comment;

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value, user: user?.id });
  };
  const onChangeUpdated = (e) => {
    setUpdatedComment({
      ...updatedComment,
      [e.target.name]: e.target.value,
    });
  };

  return {
    id,
    user,
    isAuthenticated,
    manageComment,
    getPost,
    comment,
    setComment,
    updatedComment,
    setUpdatedComment,
    edit,
    setEdit,
    body,
    render,
    setRender,
    onChange,
    onChangeUpdated,
    formatDate,
  };
};

export default useFullPost;
