import React from 'react';
import s from './Button.module.css';

class Button extends React.Component {
  state = {
    page: 1,
  };

  handlePageChange = e => {
    if (!e.currentTarget) {
      return;
    }

    this.props.onLoadMore(this.state.page);
  };

  render() {
    return (
      <button
        className={s.Button}
        type="button"
        onClick={this.handlePageChange}
      >
        load more
      </button>
    );
  }
}

export default Button;
