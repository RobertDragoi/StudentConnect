import React from 'react';
import PropTypes from 'prop-types';
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postTags } from './tags';

const MiddleSection = ({ currentPost }) => {
  return (
    <div className="container p-5 my-3 bg-white text-black rounded-lg shadow ">
      <div className="row justify-content-space-around ">
        <div className="col-sm-6 justify-content-between align-self-left">
          <div className="item">
            <h3>{postTags.description}</h3>
            <p className="text">
              {currentPost?.description ? currentPost.description : ''}
            </p>
          </div>
        </div>

        <div className="col-md-4  border-left ">
          <div className="item">
            <h3>{postTags.apply}</h3>
            <p className="text">{postTags.contact}</p>
            <div className="row">
              <div className="col-2 py-1 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faFacebookF} color="blue" />
              </div>
              <div className="col-sm-10 py-1 text-secondary">
                {currentPost?.user?.contact?.facebook ? (
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={currentPost?.user?.contact?.facebook}
                  >
                    {currentPost.user.contact.facebook.split('/')[3]}
                  </a>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-2 py-1 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faLinkedin} color="blue" />
              </div>
              <div className="col-sm-10 py-1 text-secondary">
                {currentPost?.user?.contact?.linkedin ? (
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={currentPost?.user?.contact?.linkedin}
                  >
                    {currentPost.user.contact.linkedin.split('/')[4]}
                  </a>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-2 py-1 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faPhone} color="green" />
              </div>
              <div className="col-sm-10 py-1 text-secondary">
                {currentPost?.user?.contact?.phone
                  ? currentPost.user.contact.phone
                  : ''}
              </div>
            </div>

            <div className="row">
              <div className="col-2 py-1 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faAddressCard} color="orange" />
              </div>
              <div className="col-sm-10 py-1 text-secondary">
                {currentPost?.user?.contact?.others
                  ? currentPost.user.contact.others
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MiddleSection;
MiddleSection.propTypes = {
  currentPost: PropTypes.object,
};
