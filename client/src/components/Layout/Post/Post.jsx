import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../../state/UserState/userContext';
import PostContext from '../../../state/PostState/postContext';
import { formatDate } from '../../../utils/functions';
import './Post.css';

const Post = (props) => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { user } = userContext;
  const { deletePost } = postContext;
  const {
    className,
    picture,
    user: postUser,
    id,
    title,
    domain,
    location,
    createdAt,
    type,
  } = props;
  return (
    <React.Fragment>
      <Link className="post-container" to={`/post/${id}`}>
        <div className="post-container">
          <div className={`card m-3 mx-auto ${className}`}>
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="card-title d-flex align-items-center justify-content-between border-bottom">
                <div className="d-flex align-items-center">
                  <div className="p-1">
                    <ReactImageFallback
                      src={picture}
                      fallbackImage={'/img/default.jpg'}
                      alt="profile"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="p-1">
                    <p className="card-text m-0 ml-3 d-flex flex-column">
                      <span>
                        <Link
                          className="post-link"
                          to={`/users/${postUser.id}`}
                        >
                          {postUser.name}
                        </Link>{' '}
                        {postUser.type === 'student' ? (
                          <FontAwesomeIcon icon={faUser} color="green" />
                        ) : (
                          <FontAwesomeIcon icon={faBuilding} color="blue" />
                        )}
                      </span>
                      <span className="text-muted">
                        {formatDate(createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="ml-auto p-1">
                  {user?.id === postUser.id ? (
                    <span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(id);
                        }}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </span>
                  ) : (
                    <React.Fragment />
                  )}
                </div>
              </div>
              <div className="mb-3 border-bottom">
                <p className="card-text m-0 mb-1">
                  <span>
                    <b>{title}</b>
                  </span>
                </p>
                <p className="card-text">{domain}</p>
              </div>
              <div className="mb-3 ">
                <p className="card-subtitle text-muted mb-1">
                  {(type === 8 ? 'Full-Time' : 'Part-Time') +
                    ` (${type} hours)`}
                </p>
                <p className="card-text">
                  <b>{location}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Post;

Post.propTypes = {
  className: PropTypes.string,
  picture: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.number,
  title: PropTypes.string,
  domain: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
};
