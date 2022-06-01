import React from 'react';
import s from './searchar.module.css';
import { ReactComponent as AddIcon } from '../../Icons/search-2.svg';
import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  state = {
    imagesName: '',
  };

  handleNameChange = e => {
    this.setState({ imagesName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imagesName.trim() === '') {
      alert('введите имя изображения');
      return;
    }

    this.props.onSubmit(this.state.imagesName);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button className={s.SearchFormButton} type="submit">
            <AddIcon />
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imagesName}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
