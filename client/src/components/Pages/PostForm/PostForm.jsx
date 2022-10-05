import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostContext from '../../../state/PostState/postContext';
import { locations, domains } from '../../../placeholders';
import { postTags } from './tags';
const PostForm = () => {
  let history = useHistory();
  const postContext = useContext(PostContext);
  const { createPost } = postContext;
  const [post, setPost] = useState({
    title: '',
    description: '',
    domain: '',
    workHours: 8,
    workPlace: locations[0],
  });
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createPost(post);
    history.push('/');
  };
  console.log(post);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1 " />
        <div className="col-sm-10 ">
          <div className="my-4 p-4 card container">
            <h1 className="text-primary ">{postTags.title}</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="control-label">{postTags.postTitle}</label>
                <input
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label className="control-label">{postTags.description}</label>
                <div>
                  <textarea
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    name="description"
                    required
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">{postTags.workTime}</label>
                <div>
                  <select
                    className="form-control "
                    onChange={onChange}
                    name="workHours"
                  >
                    <option value={8}>{postTags.fullTime}</option>
                    <option value={6}>{postTags.partTime1}</option>
                    <option value={4}>{postTags.partTime2}</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">{postTags.activity}</label>
                <div>
                  <select
                    className="form-control"
                    onChange={onChange}
                    name="domain"
                  >
                    {domains.map((domain, key) => (
                      <option key={`domain_${key}`} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">{postTags.workPlace}</label>
                <div>
                  <select
                    className="form-control"
                    onChange={onChange}
                    name="workPlace"
                  >
                    {locations.map((location, key) => (
                      <option key={`location_${key}`} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
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
                {postTags.bottomText} <Link to="/">{postTags.home}</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="col-sm-1 " />
      </div>
    </div>
  );
};
export default PostForm;
