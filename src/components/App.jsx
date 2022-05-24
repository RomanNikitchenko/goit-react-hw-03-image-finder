import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import s from './app.module.css';

class App extends React.Component {
  state = {
    imagesName: '',
  };

  handleFormSubmit = imagesName => {
    this.setState({ imagesName });
  };

  render() {
    const { imagesName } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imagesName={imagesName} />
      </div>
    );
  }
}

export default App;
