import React, { useContext } from 'react';
import Logo from '../../../visuals/welcome.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../state/UserState/userContext';
import { welcomeTags } from './tags';
import './Welcome.css';

export const Welcome = () => {
  let navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user } = userContext;
  if (user) {
    navigate('/home');
  }
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg">
          <img src={Logo} className="rmSpinner" />
        </div>
        <div className="col-lg">
          <div className="textBox">
            <h1 className="welcome-title">
              <b>{welcomeTags.title1}</b>
            </h1>
            <h1 className="welcome-title">{welcomeTags.title2}</h1>
            <p>{welcomeTags.subTitle}</p>

            <div className="row">
              <div className="col-sm">
                <Link className="button" exact to="/home">
                  {welcomeTags.homeButton}
                </Link>
              </div>
              <div className="col-sm">
                <Link className="button" exact to="/register">
                  {welcomeTags.join}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
