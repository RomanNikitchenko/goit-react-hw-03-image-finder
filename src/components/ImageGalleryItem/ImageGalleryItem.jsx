import React from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  state = {
    largeImageURL: null,
    alt: '',
  };

  toggleModal = e => {
    const {
      dataset: { source },
      alt,
    } = e.currentTarget;

    this.props.onShowModal();
    this.setState({ largeImageURL: source, alt: alt });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImageURL = prevState.largeImageURL;
    const nextImageURL = this.state.largeImageURL;

    if (prevImageURL !== nextImageURL) {
      this.props.changeImageURL(this.state);
    }
  }

  render() {
    const images = this.props.images;

    return images.map(({ id, webformatURL, tags, largeImageURL }) => {
      return (
        <li className={s.ImageGalleryItem} key={id}>
          <img
            onClick={this.toggleModal}
            className={s.ImageGalleryItemImage}
            src={webformatURL}
            data-source={largeImageURL}
            alt={tags}
          />
        </li>
      );
    });
  }
}

export default ImageGalleryItem;
