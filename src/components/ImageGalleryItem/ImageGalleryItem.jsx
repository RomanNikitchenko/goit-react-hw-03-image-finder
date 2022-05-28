import React from 'react';
import s from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, changeImageURL }) => {
  return images.map(({ webformatURL, tags, largeImageURL }, index) => {
    return (
      <li className={s.ImageGalleryItem} key={index}>
        <img
          onClick={() => changeImageURL(largeImageURL, tags)}
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  changeImageURL: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
