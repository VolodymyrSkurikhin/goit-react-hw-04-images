import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  // handlInput = e => this.setState({ search: e.currentTarget.value });
  const handlSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      toast.error('Empty search entered');
      return;
    }
    onSubmit(search);
  };

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handlSubmit}>
        <button type="submit" className={s.searchFormButton}>
          {/* <span className={s.searchFormButtonLabel}> */}
          <FaSearch />
          {/* </span> */}
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
