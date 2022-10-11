import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserContext from '../../../state/UserState/userContext';
import SearchBar from '../SearchBar/SearchBar';
import { Navbar as BootstrapNavbar, NavItem } from 'reactstrap';

export const Navbar = () => {
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
    }, 2000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <BootstrapNavbar className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary ">
      <div className="navbar-nav mr-auto">
        {!user && (
          <NavItem className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              Home
            </NavLink>
          </NavItem>
        )}
        <NavItem className="nav-item">
          <NavLink
            className="nav-link"
            exact
            to="/jobs"
            activeClassName="active"
          >
            Jobs
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
                  Profile
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <button
                  className="btn btn-link nav-link border-0 text-white"
                  onClick={logout}
                >
                  Log Out
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
                  Register
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/login"
                  activeClassName="active"
                >
                  Log In
                </NavLink>
              </NavItem>
            </React.Fragment>
          )
        ) : (
          <NavItem className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              Loading...
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
