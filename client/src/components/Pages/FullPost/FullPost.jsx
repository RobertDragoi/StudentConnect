import React from 'react';
import { useQuery } from '@tanstack/react-query';
//import socketIOClient from 'socket.io-client';
import useFullPost from '../../../hooks/useFullPost';
import Spinner from '../../Layout/Spinner/Spinner';
import UpperSection from './UpperSection';
import MiddleSection from './MiddleSection';
import LowerSection from './LowerSection';
import './FullPost.css';

const FullPost = () => {
  const {
    id,
    user,
    isAuthenticated,
    manageComment,
    comment,
    getPost,
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
  } = useFullPost();
  const { isFetching, data: currentPost } = useQuery({
    queryKey: ['getPost', id, render],
    queryFn: () => getPost(id),
    staleTime: 60000,
  });

  return (
    <>
      {isFetching ? (
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
            currentPost={currentPost}
            formatDate={formatDate}
            comment={comment}
            updatedComment={updatedComment}
            setUpdatedComment={setUpdatedComment}
            setEdit={setEdit}
            edit={edit}
            setRender={setRender}
            manageComment={manageComment}
            isAuthenticated={isAuthenticated}
            onChange={onChange}
            onChangeUpdated={onChangeUpdated}
          />
        </>
      )}
    </>
  );
};

export default FullPost;
