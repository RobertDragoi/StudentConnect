import React from 'react';
import { Link } from 'react-router-dom';
import { Fab } from 'react-tiny-fab';
import { useQuery } from '@tanstack/react-query';
import useHome from '../../../hooks/useHome';
import Spinner from '../../Layout/Spinner/Spinner';
import CurrentFilters from '../../Layout/CurrentFilters/CurrentFilters';

import StudentsPosts from './StudentsPosts';
import CompaniesPosts from './CompaniesPosts';
import { BASE_URL } from '../../../utils/config';
import { homeTags } from './tags';
import 'react-tiny-fab/dist/styles.css';
import './Home.css';

const Home = () => {
  const {
    type,
    setType,
    render,
    setRender,
    getPosts,
    search,
    filters,
    isAuthenticated,
  } = useHome();
  const { isFetching, data: posts } = useQuery({
    queryKey: ['getPosts', filters, search, render],
    queryFn: getPosts,
    staleTime: 60000,
  });
  console.log(isFetching ? 'Posts loading' : `Posts loaded: ${posts.length}`);

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
              <StudentsPosts
                posts={posts}
                setRender={setRender}
                baseUrl={BASE_URL}
              />
            ) : (
              <CompaniesPosts
                posts={posts}
                setRender={setRender}
                baseUrl={BASE_URL}
              />
            )}
            <Link to="/createpost">
              {isAuthenticated ? (
                <Fab
                  mainButtonStyles={{ backgroundColor: 'orangered' }}
                  alwaysShowTitle={true}
                  icon={'+'}
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
