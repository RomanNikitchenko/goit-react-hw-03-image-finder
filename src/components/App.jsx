import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import imagesAPI from '../services/images-api';
import s from './app.module.css';
import ImagePendingView from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends React.Component {
  state = {
    images: [],
    imagesName: '',
    page: 1,
    limit: 12,
    openButton: false,
    status: 'idle',
    error: null,
    totalHits: 0,
    loading: false,
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imagesName;
    const nextName = this.state.imagesName;

    const differentName = prevName !== nextName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    const differentPage = prevPage !== nextPage;

    if (differentName || differentPage) {
      if (differentName) {
        this.setState({
          status: 'pending',
          openButton: false,
        });
      }

      imagesAPI
        .fetchImages(nextName, this.state.limit, nextPage)
        .then(images => {
          if (!images.hits.length) {
            return this.setState({
              images: [...images.hits],
              openButton: false,
              status: 'repeat',
            });
          }

          if (differentName) {
            return this.setState({
              images: [...images.hits],
              openButton: true,
              status: 'resolved',
              totalHits: images.totalHits,
            });
          }

          if (differentPage) {
            return this.setState(state => ({
              images: [...state.images, ...images.hits],
              status: 'resolved',
              openButton: true,
              loading: false,
            }));
          }
        })
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
  }

  handleFormSubmit = ({ imagesName, page, limit }) => {
    this.setState({
      imagesName: imagesName,
      page: page,
      limit: limit,
    });
  };

  handlPageButton = () => {
    this.setState(statePrev => {
      return {
        page: statePrev.page + 1,
        loading: true,
      };
    });
  };

  handlChangeModalImage = (source = '', alt = '') => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: source,
      alt: alt,
    }));
  };

  render() {
    const {
      images,
      openButton,
      status,
      error,
      loading,
      totalHits,
      largeImageURL,
      alt,
      showModal,
    } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <ImagePendingView />}
        {status === 'idle' && <div>Введите имя картинки</div>}
        {status === 'repeat' && <div>Такой картинки нет</div>}
        {status === 'rejected' && <h1>{error.massage}</h1>}
        {status === 'resolved' && (
          <ImageGallery images={images} onOpen={this.handlChangeModalImage} />
        )}
        {showModal && (
          <Modal onClose={this.handlChangeModalImage}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
        {loading && <ImagePendingView />}
        {openButton && !loading && images.length !== totalHits && (
          <Button onLoadMore={this.handlPageButton} />
        )}
      </div>
    );
  }
}

export default App;
