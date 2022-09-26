import React, { useContext } from 'react';
import Post from '../Layout/Post';
import Spinner from '../Layout/Spinner';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import UserContext from '../../state/UserState/userContext';
import PostContext from '../../state/PostState/postContext';
import { BASE_URL } from '../../utils/config';
import { Link } from 'react-router-dom';

const Home = () => {
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);
  const { posts, loading } = postContext;
  const { isAuthenticated } = userContext;

  return (
    <React.Fragment>
      <div className="container py-5">
        {!loading ? (
          posts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                className="mx-auto col-6"
                title={post.title}
                when={post.createdAt}
                companyPicture={`${BASE_URL}/${post.user.profilePicture}`}
                description={post.description}
                type={post.workHours}
                location={post.workPlace}
                user={post.user}
              />
            );
          })
        ) : (
          <Spinner />
        )}
        <Link to="/createpost">
          {isAuthenticated ? (
            <Fab
              mainButtonStyles={{ backgroundColor: '#007bff' }}
              alwaysShowTitle={true}
              icon={'+'}
              onClick={() => console.log('button')}
            ></Fab>
          ) : null}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;
