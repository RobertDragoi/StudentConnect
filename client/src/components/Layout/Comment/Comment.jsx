import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
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
  updatedComment,
  setUpdatedComment,
  setRender,
  manageComment,
  id,
  onChangeUpdated,
}) => {
  const deleteMutation = useMutation({
    mutationFn: async () =>
      await manageComment(id, { id: comment.id }, 'delete'),
    onSuccess: () => {
      console.log(`Comment ${comment?.id} deleted`);
      setRender(`Comment ${comment?.id} deleted`);
    },
  });
  const modifyMutation = useMutation({
    mutationFn: async () =>
      await manageComment(
        id,
        {
          ...updatedComment,
          updated: formatDate(Date.now()),
          id: edit.id,
        },
        'modify'
      ),
    onSuccess: () => {
      console.log(`Comment ${comment?.id} modified`);
      setRender(`Comment ${comment?.id} modified`);
    },
  });

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
            <Link
              to={`/users/${comment?.user?.id}/?isCurrentUser=${
                comment?.user?.id === user?.id ? 'true' : 'false'
              }`}
            >
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
                  setUpdatedComment({
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
                  deleteMutation.mutate();
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
            <form
              onSubmit={async () => {
                modifyMutation.mutate();
              }}
            >
              <div className="form-group">
                <textarea
                  onChange={onChangeUpdated}
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
  comment: PropTypes.object,
  edit: PropTypes.object,
  user: PropTypes.object,
  id: PropTypes.string,
  formatDate: PropTypes.func,
  setEdit: PropTypes.func,
  updatedComment: PropTypes.object,
  setUpdatedComment: PropTypes.func,
  setRender: PropTypes.func,
  onChangeUpdated: PropTypes.func,
  manageComment: PropTypes.func,
  fetchPost: PropTypes.func,
};
