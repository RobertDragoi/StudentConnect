import React from 'react';
import PropTypes from 'prop-types';
import { faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userTags } from './tags';
const Contact = ({ user, dataEdit, onChange }) => {
  return (
    <div className="card mt-3 ">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faFacebookF} color="blue" />
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <input
                onChange={onChange}
                className="form-control form-control-sm"
                type="text"
                name="facebook"
                defaultValue={user?.contact?.facebook}
              />
            ) : user?.contact?.facebook ? (
              <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                rel="noreferrer noopener"
                href={user?.contact?.facebook}
                className="font-size-sm m-0"
              >
                {user?.contact?.facebook.split('/')[3]}
              </a>
            ) : (
              <p className="text-muted font-size-sm m-0">{userTags.notSet}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faInstagram} color="purple" />
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <input
                onChange={onChange}
                className="form-control form-control-sm"
                type="text"
                name="instagram"
                defaultValue={user?.contact?.instagram}
              />
            ) : user?.contact?.instagram ? (
              <p className="text-muted font-size-sm m-0">
                {user?.contact?.instagram}
              </p>
            ) : (
              <p className="text-muted font-size-sm m-0">{userTags.notSet}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faLinkedin} color="blue" />
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <input
                className="form-control form-control-sm"
                onChange={onChange}
                type="text"
                name="linkedin"
                defaultValue={user?.contact?.linkedin}
              />
            ) : user?.contact?.linkedin ? (
              <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                rel="noreferrer noopener"
                href={user?.contact?.linkedin}
                className="font-size-sm m-0 m-0"
              >
                {user?.contact?.linkedin.split('/')[4]}
              </a>
            ) : (
              <p className="text-muted font-size-sm m-0 m-0">
                {userTags.notSet}
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faPhone} color="green" />
          </div>
          <div className="col-sm-9 py-1   border-bottom">
            {dataEdit === true ? (
              <input
                className="form-control form-control-sm"
                onChange={onChange}
                type="text"
                name="phone"
                defaultValue={user?.contact?.phone}
              />
            ) : user?.contact?.phone ? (
              <p className="text-muted font-size-sm m-0">
                {user?.contact?.phone}
              </p>
            ) : (
              <p className="text-muted font-size-sm m-0">{userTags.notSet}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faAddressCard} color="orange" />
          </div>
          <div className="col-sm-9 py-1   ">
            {dataEdit === true ? (
              <input
                onChange={onChange}
                className="form-control form-control-sm-sm form-control form-control-sm"
                type="text"
                name="others"
                defaultValue={user?.contact?.others}
              />
            ) : user?.contact?.others ? (
              <p className="text-muted font-size-sm m-0">
                {user?.contact?.others}
              </p>
            ) : (
              <p className="text-muted font-size-sm m-0">{userTags.notSet}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
Contact.propTypes = {
  user: PropTypes.object,
  dataEdit: PropTypes.bool,
  onChange: PropTypes.func,
};
