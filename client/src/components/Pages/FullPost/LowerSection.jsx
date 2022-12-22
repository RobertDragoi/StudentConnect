import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import Comment from '../../Layout/Comment/Comment';

const LowerSection = ({
  id,
  currentPost,
  isAuthenticated,
  onChange,
  onChangeUpdated,
  setRender,
  comment,
  manageComment,
  body,
  formatDate,
  user,
  updatedComment,
  setUpdatedComment,
  setEdit,
  edit,
}) => {
  const modifyMutation = useMutation({
    mutationFn: async () => await manageComment(id, comment, 'add'),
  });
  if (modifyMutation.isSuccess) {
    console.log('Comment created');
    setRender();
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="container shadow p-5 my-3 bg-white text-black rounded-lg shadow-sm p-3">
          <form onSubmit={() => modifyMutation.mutate()}>
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
          updatedComment={updatedComment}
          setUpdatedComment={setUpdatedComment}
          setRender={setRender}
          manageComment={manageComment}
          id={id}
          onChangeUpdated={onChangeUpdated}
        />
      ))}
    </>
  );
};

export default LowerSection;
LowerSection.propTypes = {
  id: PropTypes.string,
  currentPost: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeUpdated: PropTypes.func,
  getPost: PropTypes.func,
  setRender: PropTypes.func,
  comment: PropTypes.object,
  manageComment: PropTypes.func,
  formatDate: PropTypes.func,
  updatedComment: PropTypes.object,
  setUpdatedComment: PropTypes.func,
  setEdit: PropTypes.func,
  edit: PropTypes.object,
  body: PropTypes.string,
  user: PropTypes.object,
};
