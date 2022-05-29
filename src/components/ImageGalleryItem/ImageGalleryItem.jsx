import React from 'react';
import s from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ children }) => {
  return <li className={s.ImageGalleryItem}>{children}</li>;
};

ImageGalleryItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGalleryItem;
