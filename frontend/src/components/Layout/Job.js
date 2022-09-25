import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import { BASE_URL } from '../../utils/config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../UserState/userContext';
import PostContext from '../PostState/postContext';
import { formatDate } from '../../utils/functions';
const Job = (props) => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { user } = userContext;
  const { deletePost } = postContext;

  return (
    <React.Fragment>
      <div className={`card m-3 mx-auto ${props.className}`}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-title d-flex align-items-center">
            <div className="p-1">
              <ReactImageFallback
                src={props.companyPicture}
                fallbackImage={`${BASE_URL}/public/img/default.jpg`}
                alt="profile"
                width="50"
                height="50"
              />
            </div>
            <div className="p-1">
              <p className="card-text m-0 ml-3 d-flex flex-column">
                <span>
                  <Link to={`/users/${props.user.id}`}>{props.user.name}</Link>
                </span>
                <span className="text-muted">{formatDate(props.when)}</span>
              </p>
            </div>
            <div className="ml-auto p-1">
              {user?.id === props.user.id ? (
                <span>
                  <button
                    onClick={() => deletePost(props.id)}
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
          <Link to={`/post/${props.id}`}>
            <p className="card-title text-primary d-inline">{props.title}</p>
          </Link>
          <p className="card-text">{props.description}</p>
          <div>
            <p className="card-subtitle text-muted mb-1">
              {(props.type === 8 ? 'Full-Time' : 'Part-Time') +
                ` (${props.type} hours)`}
            </p>
            <p className="card-subtitle text-muted">{props.location}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Job;

Job.propTypes = {
  className: PropTypes.string,
  companyPicture: PropTypes.string,
  user: PropTypes.object,
  when: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
};
