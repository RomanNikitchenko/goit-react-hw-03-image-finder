import React from 'react';
import s from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImagesItem = ({
  webformatURL,
  tags,
  largeImageURL,
  handlChangeModalImage,
}) => (
  <img
    className={s.ImageGalleryItemImage}
    src={webformatURL}
    alt={tags}
    onClick={() => handlChangeModalImage(largeImageURL, tags)}
  />
);

ImagesItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handlChangeModalImage: PropTypes.func.isRequired,
};

export default ImagesItem;
