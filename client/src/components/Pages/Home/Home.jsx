import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fab } from 'react-tiny-fab';
import { useQuery } from '@tanstack/react-query';
import Post from '../../Layout/Post/Post';
import Spinner from '../../Layout/Spinner/Spinner';
import CurrentFilters from '../../Layout/CurrentFilters/CurrentFilters';
import UserContext from '../../../state/UserState/userContext';
import PostContext from '../../../state/PostState/postContext';
import { BASE_URL } from '../../../utils/config';
import { homeTags } from './tags';
import 'react-tiny-fab/dist/styles.css';
import './Home.css';

const Home = () => {
  const [type, setType] = useState('companies');
  const [render, setRender] = useState(false);
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);
  const { getPosts, search, filters } = postContext;
  const { isAuthenticated } = userContext;
  const { isFetching, data: posts } = useQuery({
    queryKey: ['getPosts', filters, search, render],
    queryFn: getPosts,
    staleTime: 6000,
  });
  console.log(isFetching ? 'Posts loading' : 'Posts loaded');
  const studentsPosts = posts?.filter((post) => post.user.type === 'student');
  const companiesPosts = posts?.filter((post) => post.user.type === 'company');

  return (
    <div className="main-body">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-2 " />
          <div className="col-md-8">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex flex-row justify-content-center">
                <button
                  type="button"
                  className={
                    type === 'companies'
                      ? 'selected-home-button'
                      : 'home-button'
                  }
                  onClick={() => setType('companies')}
                >
                  {homeTags.companyButton}
                </button>
                <button
                  type="button"
                  className={
                    type === 'students' ? 'selected-home-button' : 'home-button'
                  }
                  onClick={() => setType('students')}
                >
                  {homeTags.studentButton}
                </button>
              </div>
              <CurrentFilters />
              <div className="d-flex flex-row justify-content-center">
                {type === 'students' ? (
                  <h3 className="home-title">{homeTags.studentTitle}</h3>
                ) : (
                  <h3 className="home-title">{homeTags.companyTitle}</h3>
                )}
              </div>
            </div>
            {isFetching ? (
              <Spinner />
            ) : type === 'students' ? (
              studentsPosts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    id={post.id}
                    className="col sm-8"
                    setRender={setRender}
                    title={post.title}
                    domain={post.domain}
                    createdAt={post.createdAt}
                    picture={`${BASE_URL}/${post.user.profilePicture}`}
                    description={post.description}
                    type={post.workHours}
                    location={post.workPlace}
                    user={post.user}
                  />
                );
              })
            ) : (
              companiesPosts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    id={post.id}
                    className="col sm-8"
                    render={render}
                    setRender={setRender}
                    title={post.title}
                    domain={post.domain}
                    createdAt={post.createdAt}
                    picture={`${BASE_URL}/${post.user.profilePicture}`}
                    description={post.description}
                    type={post.workHours}
                    location={post.workPlace}
                    user={post.user}
                  />
                );
              })
            )}
            <Link to="/createpost">
              {isAuthenticated ? (
                <Fab
                  mainButtonStyles={{ backgroundColor: 'orangered' }}
                  alwaysShowTitle={true}
                  icon={'+'}
                  onClick={() => console.log('button')}
                ></Fab>
              ) : null}
            </Link>
          </div>
          <div className="col-md-2 " />
        </div>
      </div>
    </div>
  );
};

export default Home;
