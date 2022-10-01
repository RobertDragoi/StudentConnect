import React, { useContext } from 'react';
import Post from '../../Layout/Post';
import PostContext from '../../../state/PostState/postContext';
import ReactImageFallback from 'react-image-fallback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faAddressCard,
  faBuilding,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { serialize } from 'object-to-formdata';
import useUser from '../../../hooks/useUser';
import Spinner from '../../Layout/Spinner';
import { BASE_URL } from '../../../utils/config';
import { formatDate } from '../../../utils/functions';
import { studies, domains } from '../../../placeholders';
import { userTags } from './tags';
import './User.css';

export const User = () => {
  const postContext = useContext(PostContext);
  const { posts } = postContext;
  const {
    user,
    updateUser,
    loading,
    updatedUser,
    setUpdatedUser,
    isCurrentUser,
    edit,
    setEdit,
  } = useUser();
  const onEdit = () => {
    switch (edit) {
      case true:
        setEdit(false);
        break;
      case false:
        setEdit(true);
        break;
      default:
    }
  };
  const onChange = (e) => {
    let aux = updatedUser;
    Object.keys(aux).forEach((key) => {
      if (key === e.target.name) {
        aux[key] = e.target.value;
      }
      if (key === 'profilePicture') {
        aux[key] = (e.target.files && e.target.files[0]) || aux[key];
      }
      Object.keys(aux[key]).forEach((key2) => {
        if (key2 === e.target.name) {
          aux[key][key2] = e.target.value;
        }
      });
    });
    setUpdatedUser(aux);
  };
  const onSubmit = () => {
    const formData = serialize(updatedUser);
    console.log('Entering Update!');
    updateUser(formData);
    setEdit(false);
  };
  return (
    <div className="container">
      <div className="main-body">
        {!loading ? (
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="mt-3">
                      <div className="d-block mb-3">
                        <ReactImageFallback
                          src={
                            user &&
                            `${BASE_URL}/${user.profilePicture}?${
                              Date.now() /* Hack to rerender image after submit */
                            }`
                          }
                          fallbackImage={'/img/default.jpg'}
                          alt="Profile Picture"
                          width="100"
                          height="100"
                        />
                      </div>
                      {edit === true ? (
                        <React.Fragment>
                          <label
                            className="form-label"
                            htmlFor="profile-picture"
                          ></label>
                          <input
                            onChange={onChange}
                            type="file"
                            className="form-control-file form-control-sm"
                            name="profilePicture"
                            id="profile-picture"
                          ></input>
                        </React.Fragment>
                      ) : null}
                      <h4>{user?.name}</h4>
                      {edit === false && isCurrentUser && (
                        <button
                          onClick={onEdit}
                          type="button"
                          className="btn btn-primary"
                        >
                          {userTags.edit}
                        </button>
                      )}
                      {edit === true && isCurrentUser && (
                        <div className="row">
                          <div className="col-sm-6 py-1 d-flex justify-content-center">
                            <button
                              onClick={onSubmit}
                              type="button"
                              className="btn btn-success"
                            >
                              {userTags.save}
                            </button>
                          </div>
                          <div className="col-sm-6 py-1 d-flex justify-content-center">
                            <button
                              onClick={() => setEdit(false)}
                              type="button"
                              className="btn btn-danger"
                            >
                              {userTags.exit}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-center">
                {user?.type === 'student' ? (
                  <span>
                    This is a person{' '}
                    <FontAwesomeIcon icon={faUser} color="green" />
                  </span>
                ) : (
                  <span>
                    This is a company{' '}
                    <FontAwesomeIcon icon={faBuilding} color="blue" />
                  </span>
                )}
              </h4>
              <div className="card mt-3 ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={faFacebookF} color="blue" />
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
                        <input
                          onChange={onChange}
                          className="form-control form-control-sm"
                          type="text"
                          name="facebook"
                          defaultValue={user?.contact?.facebook}
                        />
                      ) : user?.contact?.facebook ? (
                        <p className="text-muted font-size-sm m-0">
                          {user?.contact?.facebook}
                        </p>
                      ) : (
                        <p className="text-muted font-size-sm m-0">
                          {userTags.notSet}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
                        <input
                          onChange={onChange}
                          className="form-control form-control-sm"
                          type="text"
                          name="github"
                          defaultValue={user?.contact?.github}
                        />
                      ) : user?.contact?.github ? (
                        <p className="text-muted font-size-sm m-0">
                          {user?.contact?.github}
                        </p>
                      ) : (
                        <p className="text-muted font-size-sm m-0">
                          {userTags.notSet}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={faLinkedin} color="blue" />
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
                        <input
                          className="form-control form-control-sm"
                          onChange={onChange}
                          type="text"
                          name="linkedin"
                          defaultValue={user?.contact?.linkedin}
                        />
                      ) : user?.contact?.linkedin ? (
                        <p className="text-muted font-size-sm m-0 m-0">
                          {user?.contact?.linkedin}
                        </p>
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
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
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
                        <p className="text-muted font-size-sm m-0">
                          {userTags.notSet}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 py-1 d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={faAddressCard} color="orange" />
                    </div>
                    <div className="col-sm-9 py-1 text-secondary ">
                      {edit === true ? (
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
                        <p className="text-muted font-size-sm m-0">
                          {userTags.notSet}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3 py-1 border-bottom">
                      <h6 className="mb-0">{userTags.email}</h6>
                    </div>

                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
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
                      <h6 className="mb-0">
                        {user?.type === 'student'
                          ? userTags.fullName
                          : userTags.companyName}
                      </h6>
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
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
                      <h6 className="mb-0">{userTags.address}</h6>
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
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
                      <h6 className="mb-0">
                        {user?.type === 'student'
                          ? userTags.education
                          : userTags.activity}
                      </h6>
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
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
                              <option
                                key={`activityDomain-${key}`}
                                value={domain}
                              >
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
                      <h6 className="mb-0">
                        {user?.type === 'student'
                          ? userTags.birthDate
                          : userTags.creationDate}
                      </h6>
                    </div>
                    <div className="col-sm-9 py-1 text-secondary border-bottom">
                      {edit === true ? (
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
                      <h6 className="mb-0">{userTags.description}</h6>
                    </div>
                    <div className="col-sm-9 py-1 text-secondary">
                      {edit === true ? (
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
              <h4 className="text-center">{userTags.posts}</h4>
              <div>
                {posts.map((post) => {
                  if (post?.user?.id === user?.id) {
                    return (
                      <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        when={post.createdAt}
                        companyPicture={`${BASE_URL}/${post.user.profilePicture}`}
                        description={post.description}
                        type={post.workHours}
                        location={post.workPlace}
                        user={post.user}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
export default User;
