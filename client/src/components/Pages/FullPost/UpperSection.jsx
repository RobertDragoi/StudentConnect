import React from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import { postTags } from './tags';
import { Link } from 'react-router-dom';
const UpperSection = ({ currentPost, formatDate }) => {
  return (
    <div className="container shadow p-5 my-3 bg-white text-black rounded-lg shadow-sm p-3">
      <div className="row">
        <div className="col-md-4 border-right">
          <ReactImageFallback
            className="image"
            src={`/${currentPost?.user?.profilePicture}`}
            fallbackImage={'/img/default.jpg'}
            alt="profile"
          />
        </div>
        <div className="col-md-8">
          <h2>{currentPost?.title ? currentPost.title : ''}</h2>
          <Link to={`/users/${currentPost?.user?.id}`}>
            <h3>{currentPost?.user.name ? currentPost.user.name : ''}</h3>
          </Link>
          <p className="text">
            {postTags.location}:{' '}
            {currentPost?.workPlace ? currentPost.workPlace : ''}
          </p>
          <p className="text">
            {postTags.domain}: {currentPost?.domain}
          </p>
          <p className="text">
            {postTags.type}:{' '}
            {(currentPost?.workHours === 8 ? 'Full-Time' : 'Part-Time') +
              ` (${currentPost?.workHours} hours)`}
          </p>
          <p className="text">
            {postTags.creationDate}:{' '}
            {currentPost?.createdAt ? formatDate(currentPost.createdAt) : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
export default UpperSection;
UpperSection.propTypes = {
  currentPost: PropTypes.object,
  formatDate: PropTypes.func,
};
