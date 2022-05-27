import React from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const images = this.props.images;

    return images.map(({ webformatURL, tags, largeImageURL }, index) => {
      return (
        <li className={s.ImageGalleryItem} key={index}>
          <img
            onClick={() => this.props.changeImageURL(largeImageURL, tags)}
            className={s.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>
      );
    });
  }
}

export default ImageGalleryItem;
