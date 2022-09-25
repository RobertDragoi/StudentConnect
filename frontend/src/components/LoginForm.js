import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../state/UserState/userContext';

const LoginForm = () => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const { isAuthenticated, login } = userContext;
  useEffect(() => {
    if (isAuthenticated === true) {
      history.push('/');
    }
  });
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-center py-5">
        <div className="w-25 my-4 p-3 card container">
          <h1 className="text-primary ">Log In</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="control-label" htmlFor="email">
                Email
              </label>
              <input
                onChange={onChange}
                type="email"
                className="form-control"
                name="email"
                value={email}
                required
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="password">
                Password
              </label>
              <div>
                <input
                  onChange={onChange}
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  required
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
            <p className="mt-2 text-muted">
              Need an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
