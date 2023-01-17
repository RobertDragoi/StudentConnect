import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPencil } from '@fortawesome/free-solid-svg-icons';
import './Skills.css';

const Skills = ({
  skillsEdit,
  setSkillsEdit,
  skills,
  addSkill,
  removeSkill,
}) => {
  const skillRef = useRef();

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row d-flex flex-row justify-content-between">
          <div className="col-sm-4  py-1 d-flex justify-content-around">
            {!skillsEdit && (
              <button
                onClick={() => addSkill(skills, skillRef)}
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
            {!skillsEdit && (
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
                  onClick={() => removeSkill(skills, item)}
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
  addSkill: PropTypes.func,
  removeSkill: PropTypes.func,
  skills: PropTypes.arrayOf(PropTypes.string),
  skillsEdit: PropTypes.bool,
  setSkillsEdit: PropTypes.func,
};
