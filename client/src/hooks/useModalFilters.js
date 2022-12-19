import { useState, useContext } from 'react';
import PostContext from '../state/PostState/postContext';

const useModalFilters = () => {
  const { setFilters } = useContext(PostContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [workPlace, setWorkPlace] = useState('');
  const [domain, setDomain] = useState('');
  const [workHours, setWorkHours] = useState('');
  const submitFilters = (e) => {
    e.preventDefault();

    handleClose();
    let filters = [];
    if (workPlace) {
      filters.push({
        displayField: 'Locație',
        displayValue: workPlace,
        field: 'workPlace',
        value: workPlace,
      });
    }
    if (domain)
      filters.push({
        displayField: 'Domeniu',
        displayValue: domain,
        field: 'domain',
        value: domain,
      });
    if (workHours === 'full-time') {
      filters.push({
        displayField: 'Tip',
        displayValue: 'Full-Time',
        field: 'workHours[$eq]',
        value: 8,
      });
    }
    if (workHours === 'part-time1') {
      filters.push({
        displayField: 'Tip',
        displayValue: 'Part-Time',
        field: 'workHours[$eq]',
        value: 6,
      });
    }
    if (workHours === 'part-time2') {
      filters.push({
        displayField: 'Tip',
        displayValue: 'Part-Time',
        field: 'workHours[$eq]',
        value: 4,
      });
    }

    setFilters(filters);
  };
  return {
    show,
    setShow,
    domain,
    setDomain,
    workPlace,
    setWorkPlace,
    workHours,
    setWorkHours,
    handleShow,
    handleClose,
    submitFilters,
  };
};

export default useModalFilters;
