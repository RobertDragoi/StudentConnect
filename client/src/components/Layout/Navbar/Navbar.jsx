import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserContext from '../../../state/UserState/userContext';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  const userContext = useContext(UserContext);
  const { user, loading, logout, loadUser, refreshToken } = userContext;

  const tokensRefresher = async () => {
    if (Cookies.get('auth-token') && !user) {
      console.log('Load user');
      await loadUser();
    }
    if (Cookies.get('refresh-token') && !Cookies.get('auth-token')) {
      console.log('Refresh token && load user');
      await refreshToken();
      await loadUser();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      tokensRefresher();
    }, 250);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="navbar-container">
      <div className="navbar-container-left">
        <div className="navbar-item">
          <NavLink className="nav-link" exact to="/home">
            <p className="navbar-title"> Home</p>
          </NavLink>
        </div>
        {!loading ? (
          user ? (
            <React.Fragment>
              <div className="navbar-item">
                <NavLink className="nav-link" exact to={`/users/${user.id}`}>
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
                <NavLink className="nav-link" exact to="/register">
                  <p className="navbar-title">Register</p>
                </NavLink>
              </div>
              <div className="navbar-item">
                <NavLink className="nav-link" exact to="/login">
                  <p className="navbar-title"> Log In</p>
                </NavLink>
              </div>
            </React.Fragment>
          )
        ) : (
          <div className="navbar-item">
            <NavLink className="nav-link" exact to="/">
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
