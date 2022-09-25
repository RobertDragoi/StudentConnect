import React, { useContext } from 'react';
import Logo from '../../visuals/welcome.png';
import styles from './Welcome.module.css';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../../state/UserState/userContext';

export const Welcome = () => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const { user } = userContext;
  if (user) {
    history.push('/jobs');
  }
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg">
          <img src={Logo} className={styles.rmSpinner} />
        </div>
        <div className="col-lg">
          <div className={styles.textBox}>
            <h1>
              <b>Welcome to</b>
            </h1>
            <h1>
              <b>Student Connect</b>
            </h1>
            <p>A platform for connecting students with companies.</p>

            <div className="row">
              <div className="col-sm">
                <NavLink
                  className={styles.button1}
                  exact
                  to="/jobs"
                  activeClassName="active"
                >
                  See Our Job Postings!
                </NavLink>
              </div>
              <div className="col-sm">
                <NavLink
                  className={styles.button1}
                  exact
                  to="/register"
                  activeClassName="active"
                >
                  Join Us!
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
