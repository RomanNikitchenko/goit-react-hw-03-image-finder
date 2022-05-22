import s from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li className={s.ImageGalleryItem} key={id}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
