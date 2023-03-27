import React from 'react';
import PropTypes from 'prop-types';
import Post from '../../Layout/Post/Post';
const Posts = ({ posts, user }) => {
  return (
    <div>
      {posts?.map((post) => {
        if (post?.user?.id === user?.id) {
          return (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              domain={post.domain}
              createdAt={post.createdAt}
              picture={`/img/${post.user.profilePicture}`}
              description={post.description}
              type={post.workHours}
              location={post.workPlace}
              user={post.user}
            />
          );
        }
      })}
    </div>
  );
};
export default Posts;
Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};
