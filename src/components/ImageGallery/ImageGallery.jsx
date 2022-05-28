import React from 'react';
import s from './imageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return <ul className={s.ImageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
