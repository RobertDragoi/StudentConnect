import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import { useParams } from 'react-router-dom';
import UserContext from '../../../state/UserState/userContext';
import PostContext from '../../../state/PostState/postContext';
import UpperSection from './UpperSection';
import MiddleSection from './MiddleSection';
import LowerSection from './LowerSection';
import { formatDate } from '../../../utils/functions';

import './FullPost.css';

const FullPost = () => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { user, isAuthenticated } = userContext;
  const { currentPost, manageComment, getPost } = postContext;
  const [comment, setComment] = useState({ user: user?.id, body: '' });
  const [updatedComment, setupdatedComment] = useState({ user: user?.id });
  const [edit, setEdit] = useState({ id: null, bool: false });
  const { body } = comment;
  const { id } = useParams();

  console.log(currentPost);
  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value, user: user?.id });
  };
  const onChangeUpdated = (e) => {
    setupdatedComment({
      ...updatedComment,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await manageComment(id, comment, 'add');
    await getPost(id);
  };
  const onSubmitUpdated = async (e) => {
    e.preventDefault();
    await getPost(id);
    await manageComment(
      id,
      { ...updatedComment, updated: formatDate(Date.now()), id: edit.id },
      'modify'
    );
    setEdit(false);
  };

  useEffect(() => {
    const fetchPost = async (id) => {
      await getPost(id);
    };
    const socket = socketIOClient('http://localhost:4007');
    socket.on('RefreshPage', (msg) => {
      fetchPost(id);
      console.log(msg);
    });
    fetchPost(id);
  }, [id]);
  return (
    <React.Fragment>
      <UpperSection
        currentPost={currentPost}
        formatDate={formatDate}
        user={user}
      />
      <MiddleSection currentPost={currentPost} />
      <LowerSection
        id={id}
        body={body}
        user={user}
        formatDate={formatDate}
        setupdatedComment={setupdatedComment}
        setEdit={setEdit}
        edit={edit}
        getPost={getPost}
        manageComment={manageComment}
        isAuthenticated={isAuthenticated}
        onChange={onChange}
        onChangeUpdated={onChangeUpdated}
        onSubmit={onSubmit}
        onSubmitUpdated={onSubmitUpdated}
      />
    </React.Fragment>
  );
};

export default FullPost;
