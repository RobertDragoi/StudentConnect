import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import PostContext from '../../../state/PostState/postContext';
import { locations, domains, experience } from '../../../placeholders';
import { postTags } from './tags';
const PostForm = () => {
  let navigate = useNavigate();
  const postContext = useContext(PostContext);
  const { createPost } = postContext;
  const [post, setPost] = useState({
    title: '',
    description: '',
    domain: domains[0],
    experience: experience[0],
    workHours: 8,
    workPlace: locations[0],
  });
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const createMutation = useMutation({
    mutationFn: async () => await createPost(post),
  });
  if (createMutation.isSuccess) {
    navigate('/home');
  }
  const onSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1 " />
        <div className="col-sm-10 ">
          <div className="my-4 p-4 card container">
            <h1 style={{ color: 'orangered' }}>{postTags.title}</h1>
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
                <label className="control-label">{postTags.activity}</label>
                <div>
                  <select
                    className="form-control"
                    onChange={onChange}
                    name="experience"
                  >
                    {experience.map((exp, key) => (
                      <option key={`experience${key}`} value={exp}>
                        {exp}
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
              <div className="mt-2">
                <input
                  type="submit"
                  className="btn "
                  style={{ backgroundColor: 'orangered', color: 'white' }}
                  value="Continuă"
                />
              </div>
              <p className="mt-2 text-muted">
                {postTags.bottomText}{' '}
                <Link style={{ textDecoration: 'none' }} to="/">
                  {postTags.home}
                </Link>
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
