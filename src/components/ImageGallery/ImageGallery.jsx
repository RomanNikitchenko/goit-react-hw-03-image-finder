import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';

class ImageGallery extends React.Component {
  handlChangeModalImage = (largeImageURL, tags) => {
    this.props.onOpen(largeImageURL, tags);
  };

  render() {
    const images = this.props.images;

    return (
      <ul className={s.ImageGallery}>
        <ImageGalleryItem
          images={images}
          changeImageURL={this.handlChangeModalImage}
        />
      </ul>
    );
  }
}

export default ImageGallery;
