import React from 'react';
import PropTypes from 'prop-types';
import Post from '../../Layout/Post/Post';
const CompaniesPosts = ({ posts, setRender, baseUrl }) => {
  return (
    <div>
      {posts.map((post) => {
        if (post.user.type === 'company')
          return (
            <Post
              key={post.id}
              id={post.id}
              className="col sm-8"
              setRender={setRender}
              title={post.title}
              domain={post.domain}
              createdAt={post.createdAt}
              picture={`${baseUrl}/${post.user.profilePicture}`}
              type={post.workHours}
              location={post.workPlace}
              user={post.user}
            />
          );
      })}
    </div>
  );
};
export default CompaniesPosts;
CompaniesPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  setRender: PropTypes.func,
  baseUrl: PropTypes.string,
};
