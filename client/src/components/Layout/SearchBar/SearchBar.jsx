import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import ModalFilters from '../ModalFilters/ModalFilters';
import PostContext from '../../../state/PostState/postContext';
import './SearchBar.css';
export const SearchBar = () => {
  const [searchForm, setSearchForm] = useState('');
  const { setSearch } = useContext(PostContext);

  const submitForm = (e) => {
    console.log('Submitting...');
    e.preventDefault();
    setSearch(searchForm);
  };
  const clear = () => {
    setSearch('');
    setSearchForm('');
  };
  return (
    <React.Fragment>
      <form className="search-bar-container" onSubmit={submitForm}>
        <button className="btn btn-secondary" type="button">
          <ModalFilters />
        </button>
        <input
          value={searchForm}
          onChange={(e) => {
            e.target.value === '' ? clear() : setSearchForm(e.target.value);
          }}
          className="col-7 form-control"
          type="text"
          placeholder="Search..."
          name="search"
        ></input>
        <div className="input-group-append" type="submit">
          <button className="btn btn-secondary">
            <i className="fa fa-search">
              <FontAwesomeIcon icon={faSearch} />
            </i>
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchBar;
