import React, { useContext, useState } from 'react';
import PostContext from '../../../state/PostState/postContext';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { locations, domains } from '../../../placeholders';
import { modalTags } from './tags';
import './ModalFilters.css';

const ModalFilters = () => {
  const [show, setShow] = useState(false);
  const postContext = useContext(PostContext);
  const { setFilters } = postContext;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [city, setCity] = useState('');
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('');
  const submitFilters = (e) => {
    e.preventDefault();

    handleClose();
    let filters = [];
    if (city) {
      filters.push({
        displayField: 'City',
        displayValue: city,
        field: 'workPlace',
        value: city,
      });
    }
    if (domain)
      filters.push({
        displayField: 'Domain',
        displayValue: domain,
        field: 'domain',
        value: domain,
      });
    if (type === 'part-time') {
      filters.push({
        displayField: 'Type',
        displayValue: 'Part-Time',
        field: 'workHours[$lt]',
        value: 8,
      });
    } else if (type === 'full-time') {
      filters.push({
        displayField: 'Type',
        displayValue: 'Full-Time',
        field: 'workHours[$gte]',
        value: 8,
      });
    }

    setFilters(filters);
  };

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
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                  >
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
                    value="part-time"
                    onChange={(e) => setType(e.target.value)}
                    type="radio"
                    id="part-time"
                    name="job-type"
                  ></input>
                  <label className="form-check-label" htmlFor="part-time">
                    {modalTags.partTime}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="full-time"
                    onChange={(e) => setType(e.target.value)}
                    type="radio"
                    id="full-time"
                    name="job-type"
                  ></input>
                  <label className="form-check-label" htmlFor="full-time">
                    {modalTags.fullTime}
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
