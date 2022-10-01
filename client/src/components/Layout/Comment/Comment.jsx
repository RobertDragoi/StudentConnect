import React from 'react';
import PropTypes from 'prop-types';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
const Comment = ({
  comment,
  formatDate,
  user,
  setEdit,
  edit,
  setupdatedComment,
  manageComment,
  id,
  fetchPost,
  onSubmit2,
  onChange2,
}) => {
  return (
    <div
      key={comment.id}
      className="container shadow p-4 my-3 bg-white text-black rounded-lg shadow-sm p-3"
    >
      <div className="row">
        <div className="d-flex flex-row p-1">
          <ReactImageFallback
            className="d-inline"
            src={`/${comment?.user?.profilePicture}`}
            fallbackImage={'/img/default.jpg'}
            alt="profile"
            width="50"
            height="50"
          />
          <div className="d-flex flex-column mx-2">
            <Link to={`/users/${comment?.user?.id}`}>
              <h5 className="d-inline">{comment?.user?.name}</h5>
            </Link>
            <p className="d-inline">
              {formatDate(comment?.createdAt)}
              {comment?.updated ? ` (changed at ${comment?.updated})` : ''}
            </p>
          </div>
        </div>
        {comment?.user?.id === user?.id ? (
          <div className="ml-auto p-1">
            <span>
              <button
                onClick={() => {
                  setEdit({
                    id: comment?.id,
                    bool: edit.bool ? false : true,
                  });
                  setupdatedComment({
                    user: user?.id,
                    body: comment?.body,
                  });
                }}
                type="button"
                className="btn btn-outline-primary mx-1"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </span>
            <span>
              <button
                onClick={async () => {
                  await manageComment(id, { id: comment.id }, 'delete');
                  fetchPost(id);
                }}
                type="button"
                className="btn btn-outline-danger mx-1"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </span>
          </div>
        ) : null}
      </div>
      <div className="row" style={{ backgroundColor: '#efeff0' }}>
        <div className="m-1">
          {edit.bool && edit.id === comment.id ? (
            <form onSubmit={onSubmit2}>
              <div className="form-group">
                <textarea
                  onChange={onChange2}
                  type="text"
                  cols="160"
                  className="form-control my-1"
                  name="body"
                  defaultValue={comment.body}
                ></textarea>
                <input
                  type="submit"
                  className="btn btn-primary my-1"
                  value="Modify"
                />
              </div>
            </form>
          ) : (
            <p>{comment?.body}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Comment;
Comment.propTypes = {
  comment: PropTypes.string,
  edit: PropTypes.bool,
  user: PropTypes.object,
  id: PropTypes.string,
  formatDate: PropTypes.func,
  setEdit: PropTypes.func,
  setupdatedComment: PropTypes.func,
  onSubmit2: PropTypes.func,
  onChange2: PropTypes.func,
  manageComment: PropTypes.func,
  fetchPost: PropTypes.func,
};
