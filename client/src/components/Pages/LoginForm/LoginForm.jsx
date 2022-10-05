import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../../state/UserState/userContext';
import { loginTags } from './tags';
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
    <div className="container">
      <div className="row">
        <div className="col-1 col-md-3 " />
        <div className="col-10 col-md-6">
          <div className="mx-auto my-4 p-4 card container">
            <h1 className="text-primary ">{loginTags.title}</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="control-label" htmlFor="email">
                  {loginTags.email}
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
                  {loginTags.password}
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
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Continuă"
                />
              </div>
              <p className="mt-2 text-muted">
                {loginTags.bottomText}{' '}
                <Link to="/register">{loginTags.register}</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="col-1 col-md-3" />
      </div>
    </div>
  );
};

export default LoginForm;
