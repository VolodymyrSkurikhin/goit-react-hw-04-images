import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handlInput = e => this.setState({ search: e.currentTarget.value });
  handlSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      toast.error('Empty search entered');
      return;
    }
    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={s.searchBar}>
        <form className={s.searchForm} onSubmit={this.handlSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handlInput}
          />
        </form>
      </header>
    );
  }
}
