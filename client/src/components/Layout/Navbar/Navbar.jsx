import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../../state/UserState/userContext';
import CurrentFilters from '../CurrentFilters/CurrentFilters';
import SearchBar from '../SearchBar/SearchBar';
import { Navbar as BootstrapNavbar, NavItem } from 'reactstrap';

export const Navbar = () => {
  const userContext = useContext(UserContext);
  const { user, logout } = userContext;
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
        {user ? (
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
        )}
      </div>
      <div className="navbar-nav ml-auto">
        <NavItem className="nav-item">
          <CurrentFilters />
          <SearchBar />
        </NavItem>
      </div>
    </BootstrapNavbar>
  );
};
export default Navbar;
