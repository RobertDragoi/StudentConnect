import React from 'react';
import useModalFilters from '../../../hooks/useModalFilters';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { locations, domains } from '../../../placeholders';
import { modalTags } from './tags';
import './ModalFilters.css';

const ModalFilters = () => {
  const {
    show,
    setDomain,
    setWorkPlace,
    setWorkHours,
    handleShow,
    handleClose,
    submitFilters,
  } = useModalFilters();

  return (
    <>
      <div onClick={handleShow}>{modalTags.mainTitle}</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTags.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="modal-title">{modalTags.location}</h1>
                <div className="anyClass">
                  <select
                    className="form-control"
                    onChange={(e) => setWorkPlace(e.target.value)}
                    name="workPlace"
                  >
                    <option>{modalTags.choose}</option>
                    {locations.map((location, key) => (
                      <option key={`location${key}`} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
                <h1 className="modal-title">{modalTags.domain}</h1>
                <div className="anyClass">
                  <select
                    className="form-control"
                    onChange={(e) => setDomain(e.target.value)}
                    name="domain"
                  >
                    <option>{modalTags.choose}</option>
                    {domains.map((domain, key) => (
                      <option key={`domain_${key}`} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
                <h1 className="modal-title">{modalTags.type}</h1>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="full-time"
                    onChange={(e) => setWorkHours(e.target.value)}
                    type="radio"
                    id="full-time"
                    name="job-type"
                  ></input>
                  <label className="form-check-label" htmlFor="full-time">
                    {modalTags.fullTime}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="part-time1"
                    onChange={(e) => setWorkHours(e.target.value)}
                    type="radio"
                    id="part-time1"
                    name="job-type"
                  ></input>
                  <label className="form-check-label" htmlFor="part-time">
                    {modalTags.partTime1}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="part-time2"
                    onChange={(e) => setWorkHours(e.target.value)}
                    type="radio"
                    id="part-time2"
                    name="job-type"
                  ></input>
                  <label className="form-check-label" htmlFor="part-time">
                    {modalTags.partTime2}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            {modalTags.close}
          </Button>
          <Button variant="primary" onClick={submitFilters}>
            {modalTags.apply}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFilters;
