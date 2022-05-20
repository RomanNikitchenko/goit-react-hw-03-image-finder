import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends React.Component {
  state = {
    images: [],
    error: null,
    starus: 'idle',
    limit: 12,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { limit, page } = this.state;

    const APIKEY = '25718667-d0b548046b545cf0dd46ad07c';

    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;

    const differentName = prevName !== nextName;

    if (differentName) {
      this.setState({ starus: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error(`нет картинки с именем ${nextName}`));
        })
        .then(images => {
          return this.setState({
            images: [...images.hits],
            starus: 'resolved',
          });
        })
        .catch(error => this.setState({ error: error, starus: 'rejected' }));
    }
  }

  render() {
    const { images, error, starus } = this.state;

    if (starus === 'idle') {
      return <div>Введите имя картинки</div>;
    }

    if (starus === 'pending') {
      return <div>Загружаем...</div>;
    }

    if (starus === 'resolved') {
      return (
        <div>
          <ul>
            <ImageGalleryItem images={images} />
          </ul>
        </div>
      );
    }

    if (starus === 'rejected') {
      return <h1>{error.massage}</h1>;
    }
  }
}

export default ImageGallery;
