import React, { useContext } from 'react';
import PostContext from '../../../state/PostState/postContext';
import ReactImageFallback from 'react-image-fallback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import useUser from '../../../hooks/useUser';
import { BASE_URL } from '../../../utils/config';
import { formatDate } from '../../../utils/functions';
import { userTags } from './tags';
import Spinner from '../../Layout/Spinner/Spinner';
import Data from './Data';
import Posts from './Posts';
import Skills from './Skills';
import Contact from './Contact';
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
    dataEdit,
    setDataEdit,
    skillsEdit,
    setSkillsEdit,
  } = useUser();
  const onEdit = () => {
    switch (dataEdit) {
      case true:
        setDataEdit(false);
        break;
      case false:
        setDataEdit(true);
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
    updateUser(updatedUser);
    setDataEdit(false);
  };
  return (
    <div className="main-body">
      <div className="container">
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
                      {dataEdit === true ? (
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
                      {dataEdit === false && isCurrentUser && (
                        <button
                          onClick={onEdit}
                          type="button"
                          className="btn"
                          style={{
                            backgroundColor: 'orangered',
                            color: 'white',
                          }}
                        >
                          {userTags.edit}
                        </button>
                      )}
                      {dataEdit === true && isCurrentUser && (
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
                              onClick={() => setDataEdit(false)}
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
              <h4 className="user-title">
                {user?.type === 'student' ? (
                  <span>
                    {userTags.personLabel}{' '}
                    <FontAwesomeIcon icon={faUser} color="green" />
                  </span>
                ) : (
                  <span>
                    {userTags.companyLabel}{' '}
                    <FontAwesomeIcon icon={faBuilding} color="blue" />
                  </span>
                )}
              </h4>
              <Contact user={user} dataEdit={dataEdit} onChange={onChange} />
            </div>
            <div className="col-md-8">
              <Data
                dataEdit={dataEdit}
                user={user}
                onChange={onChange}
                formatDate={formatDate}
              />
              {user?.type === 'student' ? (
                <>
                  <h4 className="user-title">{userTags.skills}</h4>
                  <Skills
                    skills={user?.student?.skills}
                    skillsEdit={skillsEdit}
                    setSkillsEdit={setSkillsEdit}
                    updateUser={updateUser}
                    setUpdatedUser={setUpdatedUser}
                    updatedUser={updatedUser}
                  />
                </>
              ) : (
                <></>
              )}
              <h4 className="user-title">{userTags.posts}</h4>
              <Posts posts={posts} user={user} url={BASE_URL} />
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
