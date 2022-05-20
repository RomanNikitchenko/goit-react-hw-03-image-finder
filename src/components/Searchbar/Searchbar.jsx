import React from 'react';
import s from './searchar.module.css';

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

    this.setState({ imagesName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button className={s.SearchFormButton} type="submit">
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imagesName}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
