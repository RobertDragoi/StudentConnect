import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPencil } from '@fortawesome/free-solid-svg-icons';
import './Skills.css';

const Skills = ({
  skillsEdit,
  setSkillsEdit,
  setUpdatedUser,
  updatedUser,
  updateUser,
  skills,
}) => {
  const skillRef = useRef();

  const addSkill = () => {
    let tempSkills = [...skills, skillRef.current.value];
    let aux = updatedUser;
    Object.keys(aux).forEach((key) => {
      Object.keys(aux[key]).forEach((key2) => {
        if (key2 === 'skills') {
          aux[key][key2] = tempSkills;
        }
      });
    });
    setUpdatedUser(aux);
    updateUser(aux);
  };
  const removeSkill = (skill) => {
    let tempSkills = skills.filter((sk) => sk !== skill);
    let aux = updatedUser;
    Object.keys(aux).forEach((key) => {
      Object.keys(aux[key]).forEach((key2) => {
        if (key2 === 'skills') {
          aux[key][key2] = tempSkills;
        }
      });
    });
    setUpdatedUser(aux);
    updateUser(aux);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row d-flex flex-row justify-content-between">
          <div className="col-sm-4  py-1 d-flex justify-content-around">
            {skillsEdit && (
              <button
                onClick={addSkill}
                type="button"
                className="btn"
                style={{
                  backgroundColor: 'orangered',
                  color: 'white',
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} color="white" />
              </button>
            )}
            <button
              onClick={() => setSkillsEdit(!skillsEdit)}
              type="button"
              className="btn"
              style={{
                backgroundColor: 'orangered',
                color: 'white',
              }}
            >
              <FontAwesomeIcon icon={faPencil} color="white" />
            </button>
          </div>

          <div className="col-sm-6 py-1 d-flex justify-content-end">
            {skillsEdit && (
              <input
                className="form-control form-control-sm"
                type="text"
                name="skill"
                ref={skillRef}
              />
            )}
          </div>
        </div>
        <div className="skill-container">
          {skills?.map((item, index) => (
            <div key={`skill-${index}`} className="skill-item">
              {skillsEdit ? (
                <button
                  className="skill-button"
                  onClick={() => removeSkill(item)}
                ></button>
              ) : (
                <></>
              )}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Skills;
Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
  skillsEdit: PropTypes.bool,
  setSkillsEdit: PropTypes.func,
  setUpdatedUser: PropTypes.func,
  updatedUser: PropTypes.object,
  updateUser: PropTypes.func,
};
