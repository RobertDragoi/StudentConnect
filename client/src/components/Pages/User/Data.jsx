import React from 'react';
import PropTypes from 'prop-types';
import { studies, domains } from '../../../placeholders';
import { userTags } from './tags';

const Data = ({ dataEdit, user, onChange, formatDate }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3 py-1 border-bottom">
            <p className="tag-text">{userTags.email}</p>
          </div>

          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <>
                {user?.email}
                <span className="text-danger">*</span>
              </>
            ) : (
              user?.email
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 border-bottom">
            <p className="tag-text">
              {user?.type === 'student'
                ? userTags.fullName
                : userTags.companyName}
            </p>
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <input
                onChange={onChange}
                className="form-control form-control-sm"
                type="text"
                name="name"
                defaultValue={user?.name}
              />
            ) : (
              user?.name
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3 py-1 border-bottom">
            <p className="text">{userTags.address}</p>
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <input
                onChange={onChange}
                className="form-control form-control-sm"
                type="text"
                name="address"
                defaultValue={user?.address}
              />
            ) : (
              user?.address
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 border-bottom">
            <p className="tag-text">
              {user?.type === 'student'
                ? userTags.education
                : userTags.activity}
            </p>
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              user?.type === 'student' ? (
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
              ) : (
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
              )
            ) : user?.type === 'student' ? (
              user?.student?.education
            ) : (
              user?.company?.activityDomain
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 border-bottom">
            <p className="tag-text">
              {user?.type === 'student'
                ? userTags.birthDate
                : userTags.creationDate}
            </p>
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              user?.type === 'student' ? (
                <input
                  onChange={onChange}
                  className="form-control form-control-sm"
                  type="date"
                  name="birthDate"
                  defaultValue={user?.student?.birthDate}
                />
              ) : (
                <input
                  onChange={onChange}
                  className="form-control form-control-sm"
                  type="date"
                  name="creationDate"
                  defaultValue={user?.company?.creationDate}
                />
              )
            ) : user?.type === 'student' ? (
              formatDate(user?.student?.birthDate)
            ) : (
              formatDate(user?.company?.creationDate)
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1">
            <p className="tag-text">{userTags.description}</p>
          </div>
          <div className="col-sm-9 py-1  ">
            {dataEdit === true ? (
              <textarea
                onChange={onChange}
                className="form-control form-control-sm"
                type="text"
                name="description"
                defaultValue={user?.description}
              />
            ) : (
              user?.description
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Data;
Data.propTypes = {
  user: PropTypes.object,
  dataEdit: PropTypes.bool,
  onChange: PropTypes.func,
  formatDate: PropTypes.func,
};
