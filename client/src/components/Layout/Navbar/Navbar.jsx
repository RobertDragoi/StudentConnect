import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserContext from '../../../state/UserState/userContext';
import SearchBar from '../SearchBar/SearchBar';
import { Navbar as BootstrapNavbar, NavItem } from 'reactstrap';
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
    <BootstrapNavbar className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary ">
      <div className="navbar-nav mr-auto">
        {!user && (
          <NavItem className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              <p className="navbar-title"> Welcome </p>
            </NavLink>
          </NavItem>
        )}
        <NavItem className="nav-item">
          <NavLink
            className="nav-link"
            exact
            to="/home"
            activeClassName="active"
          >
            <p className="navbar-title"> Home</p>
          </NavLink>
        </NavItem>
        {!loading ? (
          user ? (
            <React.Fragment>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to={`/users/${user.id}`}
                  activeClassName="active"
                >
                  <p className="navbar-title"> Profile</p>
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <button
                  className="btn btn-link nav-link border-0 text-white"
                  onClick={logout}
                >
                  <p className="navbar-title">Log Out</p>
                </button>
              </NavItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/register"
                  activeClassName="active"
                >
                  <p className="navbar-title">Register</p>
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/login"
                  activeClassName="active"
                >
                  <p className="navbar-title"> Log In</p>
                </NavLink>
              </NavItem>
            </React.Fragment>
          )
        ) : (
          <NavItem className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              <p className="navbar-title">Loading..</p>
            </NavLink>
          </NavItem>
        )}
      </div>
      <div className="navbar-nav ml-auto">
        <NavItem className="nav-item">
          <SearchBar />
        </NavItem>
      </div>
    </BootstrapNavbar>
  );
};
export default Navbar;
