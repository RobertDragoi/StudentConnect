import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import './FullPost.css';
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import postService from '../../services/post';
import UserContext from '../../state/UserState/userContext';
import PostContext from '../../state/PostState/postContext';
import ReactImageFallback from 'react-image-fallback';
import { formatDate } from '../../utils/functions';
import Comment from './Comment';

const FullPost = () => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { user, isAuthenticated } = userContext;
  const { manageComment } = postContext;
  const [comment, setComment] = useState({ user: user?.id, body: '' });
  const [updatedComment, setupdatedComment] = useState({ user: user?.id });
  const [post, setPost] = useState();
  const [edit, setEdit] = useState({ id: null, bool: false });
  const { body } = comment;
  const { id } = useParams();

  console.log(post);
  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value, user: user?.id });
  };
  const onChange2 = (e) => {
    setupdatedComment({
      ...updatedComment,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await manageComment(id, comment, 'add');
    fetchPost(id);
  };
  const onSubmit2 = async (e) => {
    e.preventDefault();
    fetchPost(id);
    await manageComment(
      id,
      { ...updatedComment, updated: formatDate(Date.now()), id: edit.id },
      'modify'
    );
    setEdit(false);
  };
  const fetchPost = async (id) => {
    try {
      const aux = await postService.getPost(id);
      setPost({ ...aux });
    } catch (error) {
      console.log(error);
      setPost(null);
    }
  };
  useEffect(() => {
    const socket = socketIOClient('http://localhost:3005');
    socket.on('RefreshPage', (msg) => {
      fetchPost(id);
      console.log(msg);
    });
    fetchPost(id);
  }, [id]);
  return (
    <React.Fragment>
      <div className="container shadow p-5 my-3 bg-white text-black rounded-lg shadow-sm p-3">
        <div className="row">
          <div className="col-sm-4 border-right">
            <ReactImageFallback
              className="d-inline"
              src={`${BASE_URL}/${post?.user?.profilePicture}`}
              fallbackImage={`${BASE_URL}/public/img/default.jpg`}
              alt="profile"
              width="200"
              height="200"
            />
          </div>
          <div className="col-sm-8">
            <h1>{post?.title ? post.title : ''}</h1>
            <Link to={`/users/${post?.user?.id}`}>
              <h3>{post?.user.name ? post.user.name : ''}</h3>
            </Link>
            <p>Location: {post?.workPlace ? post.workPlace : ''}</p>
            <p>Programming language: {post?.programmingLang}</p>
            <p>
              Type:{' '}
              {(post?.workHours === 8 ? 'Full-Time' : 'Part-Time') +
                ` (${post?.workHours} hours)`}
            </p>
            <p>
              Created at: {post?.createdAt ? formatDate(post.createdAt) : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="container p-5 my-3 bg-white text-black rounded-lg shadow ">
        <div className="row justify-content-space-around ">
          <div className="col-sm-6 justify-content-between align-self-left">
            <div className="item">
              <h3>Description</h3>
              <p>{post?.description ? post.description : ''}</p>
            </div>
          </div>

          <div className="col-md-4 offset-1 a border-left ">
            <div className="item">
              <h3>Apply now</h3>
              <p>Contact</p>
              <div className="row">
                <div className="col-sm-2 py-1 d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faFacebookF} />
                </div>
                <div className="col-sm-10 py-1 text-secondary">
                  {post?.user?.contact?.facebook
                    ? post.user.contact.facebook
                    : ''}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-2 py-1 d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
                <div className="col-sm-10 py-1 text-secondary">
                  {post?.user?.contact?.linkedin
                    ? post.user.contact.linkedin
                    : ''}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 py-1 d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="col-sm-10 py-1 text-secondary">
                  {post?.user?.contact?.phone ? post.user.contact.phone : ''}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-2 py-1 d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faAddressCard} />
                </div>
                <div className="col-sm-10 py-1 text-secondary">
                  {post?.user?.contact?.others ? post.user.contact.others : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAuthenticated ? (
        <div className="container shadow p-5 my-3 bg-white text-black rounded-lg shadow-sm p-3">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <textarea
                onChange={onChange}
                type="text"
                className="form-control"
                required
                name="body"
                value={body}
                placeholder="Comment"
              ></textarea>
              <div>
                <input type="submit" className="btn btn-primary" value="Send" />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <React.Fragment />
      )}
      {post?.comments?.map((comment, key) => (
        <Comment
          key={`comment-${key}`}
          comment={comment}
          formatDate={formatDate}
          user={user}
          setEdit={setEdit}
          edit={edit}
          setupdatedComment={setupdatedComment}
          manageComment={manageComment}
          id={id}
          fetchPost={fetchPost}
          onSubmit2={onSubmit2}
          onChange2={onChange2}
        />
      ))}
    </React.Fragment>
  );
};

export default FullPost;
