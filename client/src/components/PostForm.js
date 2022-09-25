import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostContext from '../state/PostState/postContext';
import { locations, languages } from '../placeholders';

const PostForm = () => {
  let history = useHistory();
  const postContext = useContext(PostContext);
  const { createPost } = postContext;
  const [post, setPost] = useState({
    title: '',
    description: '',
    programmingLang: 'C/C++',
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
    <React.Fragment>
      <div className="w-50 my-4 p-4 card container">
        <h1 className="text-primary ">Create a post</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="control-label">Title</label>
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
            <label className="control-label">Description</label>
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
            <label className="control-label">Work time</label>
            <div>
              <select
                className="form-control "
                onChange={onChange}
                name="workHours"
              >
                <option value={8}>Full-Time(8 hours)</option>
                <option value={4}>Part-Time(4 hours)</option>
                <option value={6}>Part-Time(6 hours)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">Programming languages</label>
            <div>
              <select
                className="form-control"
                onChange={onChange}
                name="programmingLang"
              >
                {languages.map((language, key) => (
                  <option key={`language_${key}`}>{language}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">Work place</label>
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
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
          <p className="mt-2 text-muted">
            You want to go back searching? <Link to="/">Home</Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};
export default PostForm;
