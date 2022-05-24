import React from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {

  toggleModal = () => {
    this.props.onShowModal();
  };

  render() {
    const images = this.props.images;

    return images.map(({ id, webformatURL, tags }) => {
      return (
        <li className={s.ImageGalleryItem} key={id}>
          <img
            onClick={this.toggleModal}
            className={s.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>
      );
    });
  }
};

export default ImageGalleryItem;
