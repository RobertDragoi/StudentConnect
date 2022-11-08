import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../Layout/Comment/Comment';

const LowerSection = ({
  currentPost,
  isAuthenticated,
  onSubmit,
  onChange,
  onSubmitUpdated,
  onChangeUpdated,
  getPost,
  manageComment,
  body,
  formatDate,
  user,
  setupdatedComment,
  setEdit,
  edit,
  id,
}) => {
  return (
    <React.Fragment>
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
                placeholder="Scrie un comentariu"
              ></textarea>
              <div className="mt-2">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Trimite"
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <React.Fragment />
      )}
      {currentPost?.comments?.map((comment, key) => (
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
          fetchPost={getPost}
          onSubmitUpdated={onSubmitUpdated}
          onChangeUpdated={onChangeUpdated}
        />
      ))}
    </React.Fragment>
  );
};

export default LowerSection;
LowerSection.propTypes = {
  currentPost: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeUpdated: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitUpdated: PropTypes.func,
  getPost: PropTypes.func,
  manageComment: PropTypes.func,
  formatDate: PropTypes.func,
  setupdatedComment: PropTypes.func,
  setEdit: PropTypes.func,
  edit: PropTypes.object,
  body: PropTypes.string,
  user: PropTypes.object,
  id: PropTypes.string,
};
