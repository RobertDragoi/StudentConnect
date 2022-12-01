import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import UserContext from '../../../state/UserState/userContext';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  const userContext = useContext(UserContext);
  const { user, logout, loadUser, refreshToken } = userContext;

  const { isLoading } = useQuery({
    queryKey: ['loadUser', user],
    queryFn: async () => {
      if (Cookies.get('auth-token') && !user) {
        console.log('Load user');
        await loadUser();
        return;
      }
      if (Cookies.get('refresh-token') && !Cookies.get('auth-token')) {
        console.log('Refresh token && load user');
        await refreshToken();
        await loadUser();
        return;
      }
    },
    staleTime: 6000,
    refetchInterval: 60000 * 15,
  });

  return (
    <div className="navbar-container">
      <div className="navbar-container-left">
        <div className="navbar-item">
          <NavLink className="nav-link" to="/home">
            <p className="navbar-title"> Home</p>
          </NavLink>
        </div>
        {!isLoading ? (
          user ? (
            <React.Fragment>
              <div className="navbar-item">
                <NavLink
                  className="nav-link"
                  to={`/users/${user.id}/?isCurrentUser=true`}
                >
                  <p className="navbar-title"> Profile</p>
                </NavLink>
              </div>
              <div className="navbar-item">
                <button
                  className="btn btn-link nav-link border-0 text-white"
                  onClick={logout}
                >
                  <p className="navbar-title">Log Out</p>
                </button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="navbar-item">
                <NavLink className="nav-link" to="/register">
                  <p className="navbar-title">Register</p>
                </NavLink>
              </div>
              <div className="navbar-item">
                <NavLink className="nav-link" to="/login">
                  <p className="navbar-title"> Log In</p>
                </NavLink>
              </div>
            </React.Fragment>
          )
        ) : (
          <div className="navbar-item">
            <NavLink className="nav-link" to="/">
              <p className="navbar-title">Loading..</p>
            </NavLink>
          </div>
        )}
      </div>
      <div className="navbar-container-right">
        <div className="navbar-filter">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
