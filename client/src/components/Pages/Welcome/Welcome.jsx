import React, { useContext } from 'react';
import Logo from '../../../visuals/welcome.png';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../state/UserState/userContext';
import { welcomeTags } from './tags';
import './Welcome.css';

export const Welcome = () => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const { user } = userContext;
  if (user) {
    history.push('/home');
  }
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg">
          <img src={Logo} className="rmSpinner" />
        </div>
        <div className="col-lg">
          <div className="textBox">
            <h1 className="welcometitle">
              <b>{welcomeTags.title1}</b>
            </h1>
            <h1 className="welcometitle">{welcomeTags.title2}</h1>
            <p>{welcomeTags.subTitle}</p>

            <div className="row">
              <div className="col-sm">
                <NavLink
                  className="button"
                  exact
                  to="/home"
                  activeClassName="active"
                >
                  {welcomeTags.homeButton}
                </NavLink>
              </div>
              <div className="col-sm">
                <NavLink
                  className="button"
                  exact
                  to="/register"
                  activeClassName="active"
                >
                  {welcomeTags.join}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
