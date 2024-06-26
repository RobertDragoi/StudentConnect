import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../../../state/UserState/userContext';
import { studies, domains } from '../../../placeholders';
import { registerTags } from './tags';
const RegisterForm = () => {
  let navigate = useNavigate();
  const { isAuthenticated, register } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/');
    }
  });

  const [user, setUser] = useState({
    type: '',
    name: '',
    email: '',
    password: '',
    address: '',
    description: '',
    birthDate: '',
    education: '',
    activityDomain: '',
    creationDate: '',
  });

  const {
    name,
    type,
    email,
    address,
    password,
    description,
    birthDate,
    education,
    activityDomain,
    creationDate,
  } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let newUser = { type, name, email, password, address, description };
    if (type === 'Student') {
      newUser = {
        ...newUser,
        birthDate,
        education,
      };
    } else {
      newUser = {
        ...newUser,
        creationDate,
        activityDomain,
      };
    }
    register(newUser);
  };
  let extraField;
  console.log(education);
  if (type === 'Student') {
    extraField = (
      <Fragment>
        <div className="form-group">
          <label className="control-label">{registerTags.birthDate}</label>
          <div className="">
            <input
              className="form-control"
              onChange={onChange}
              type="date"
              name="birthDate"
              value={birthDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">{registerTags.studies}</label>
          <div>
            <select
              className="form-control"
              onChange={onChange}
              name="education"
            >
              {studies.map((study, key) => (
                <option key={`studies-${key}`} value={study}>
                  {study}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
  if (type === 'Company') {
    extraField = (
      <Fragment>
        <div className="form-group">
          <label className="control-label">{registerTags.creationDate}</label>
          <div>
            <input
              className="form-control"
              onChange={onChange}
              type="date"
              name="creationDate"
              value={creationDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">{registerTags.activity}</label>
          <div>
            <select
              className="form-control"
              onChange={onChange}
              name="activityDomain"
            >
              {domains.map((domain, key) => (
                <option key={`activityDomain-${key}`} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
  if (type === '') {
    extraField = <Fragment></Fragment>;
  }
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-sm-1 " />
          <div className="col-sm-10 ">
            <div className="mx-auto my-4 p-4 card container">
              <h1 style={{ color: 'orangered' }}>{registerTags.title}</h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="control-label" htmlFor="type">
                    {registerTags.type}
                    <span className="text-primary">*</span>:
                  </label>
                  <div className="ml-4">
                    <input
                      onChange={onChange}
                      className="form-check-input"
                      type="radio"
                      name="type"
                      value="Student"
                      id="student-type"
                      required
                    />
                    <label className="radio-inline" htmlFor="student-type">
                      {registerTags.student}
                    </label>
                  </div>
                  <div className="ml-4">
                    <input
                      required
                      onChange={onChange}
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="company-type"
                      value="Company"
                    />
                    <label className="radio-inline" htmlFor="company-type">
                      {registerTags.company}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="control-label" htmlFor="name">
                      {registerTags.fullname}
                      <span className="text-primary">*</span>
                    </label>
                    <input
                      onChange={onChange}
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      required
                      placeholder="Full name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label" htmlFor="email">
                      {registerTags.email}
                      <span className="text-primary">*</span>
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
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="Address">
                    {registerTags.address}
                  </label>
                  <div>
                    <input
                      onChange={onChange}
                      type="text"
                      className="form-control"
                      name="address"
                      value={address}
                      placeholder="Address"
                      autoComplete="street-address"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">
                    {registerTags.password}
                    <span className="text-primary">*</span>
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
                <div className="form-group">
                  <label className="control-label" htmlFor="password">
                    {registerTags.description}
                  </label>
                  <div>
                    <textarea
                      onChange={onChange}
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      value={description}
                      rows="2"
                    />
                  </div>
                </div>
                {extraField}
                <div className="mt-2">
                  <input
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: 'orangered', color: 'white' }}
                    value="Continuă"
                  />
                </div>
                <p className="text-muted my-2">
                  {registerTags.bottomText}{' '}
                  <Link style={{ textDecoration: 'none' }} to="/login">
                    {registerTags.login}
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
