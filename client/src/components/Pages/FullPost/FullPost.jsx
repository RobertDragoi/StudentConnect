import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import UserContext from '../../../state/UserState/userContext';
import PostContext from '../../../state/PostState/postContext';
import Spinner from '../../Layout/Spinner/Spinner';
import UpperSection from './UpperSection';
import MiddleSection from './MiddleSection';
import LowerSection from './LowerSection';
import { formatDate } from '../../../utils/functions';
import './FullPost.css';

const FullPost = () => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { user, isAuthenticated } = userContext;
  const { manageComment, getPost } = postContext;
  const [comment, setComment] = useState({ user: user?.id, body: '' });
  const [updatedComment, setUpdatedComment] = useState({ user: user?.id });
  const [edit, setEdit] = useState({ id: null, bool: false });
  const { body } = comment;
  const { id } = useParams();

  const { isLoading, data: currentPost } = useQuery({
    queryKey: ['getPost', id],
    queryFn: () => getPost(id),
    staleTime: 60000,
  });
  const socket = socketIOClient('http://localhost:4007');
  socket.on('RefreshPage', (msg) => {
    getPost(id), console.log(msg);
  });

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value, user: user?.id });
  };
  const onChangeUpdated = (e) => {
    setUpdatedComment({
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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
            setUpdatedComment={setUpdatedComment}
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
        </>
      )}
    </>
  );
};

export default FullPost;
