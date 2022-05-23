import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import imagesAPI from '../services/images-api';
import s from './imageGallery.module.css';
import PokemonPendingView from '../Loader/Loader';

class ImageGallery extends React.Component {
  state = {
    images: [],
    amount: [],
    error: null,
    status: 'idle',
    loading: false,
    limit: 12,
    page: 1,
    openButton: false,
  };

  handlPageButton = page => {
    this.setState(statePrev => {
      return {
        page: statePrev.page + page,
        openButton: true,
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;

    const prevPageButton = prevState.page;
    const nextPageButton = this.state.page;

    const differentPage = prevPageButton !== nextPageButton;
    const differentName = prevName !== nextName;

    if (differentName || differentPage) {
      if (differentName && !this.state.openButton) {
        setTimeout(() => {
          console.log('differentName');
          return this.setState({
            status: 'pending',
            page: 1,
          });
        }, 100);
      }

      if (differentPage && this.state.openButton) {
        console.log('differentPage');
        setTimeout(() => {
          return this.setState({
            page: nextPageButton,
            loading: true,
          });
        }, 100);
      }

      setTimeout(() => {
        const { limit, page } = this.state;

        imagesAPI
          .fetchImages(nextName, limit, page)

          .then(images => {
            if (differentName && !this.state.openButton) {
              console.log('differentName then');
              return this.setState({
                images: [...images.hits],
                amount: [...images.hits],
                status: 'resolved',
                loading: false,
              });
            }

            if (differentPage && this.state.openButton) {
              console.log('differentPage then');
              return this.setState(state => ({
                images: [...state.images, ...images.hits],
                amount: [...images.hits],
                status: 'resolved',
                loading: false,
                openButton: false,
              }));
            }
          })
          .catch(error => this.setState({ error: error, status: 'rejected' }));
      }, 200);
    }
  }

  render() {
    const { images, error, status, loading, amount, limit } = this.state;

    if (status === 'idle') {
      return <div>Введите имя картинки</div>;
    }

    if (status === 'pending') {
      return <PokemonPendingView />;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={images} />
          </ul>
          {loading && <PokemonPendingView />}
          {amount.length === limit && !loading && <Button onLoadMore={this.handlPageButton} />}
          {amount.length === 0 && <div>Такой картинки нет</div>}
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.massage}</h1>;
    }
  }
}

export default ImageGallery;
