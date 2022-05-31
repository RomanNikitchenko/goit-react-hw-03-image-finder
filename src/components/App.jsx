import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import imagesAPI from '../services/images-api';
import s from './app.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import ImagesItem from './ImagesItem/ImagesItem';
import ImagePendingView from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [openButton, setOpenButton] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!imagesName) {
      return;
    }

    setStatus('pending');
    setOpenButton(false);

    imagesAPI
      .fetchImages(imagesName, 12, page)
      .then(images => {
        if (!images.hits.length) {
          setOpenButton(false);
          setStatus('repeat');
          return;
        }

        setImages([...images.hits]);
        setOpenButton(true);
        setStatus('resolved');
        setTotalHits(images.totalHits);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imagesName]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    imagesAPI
      .fetchImages(imagesName, 12, page)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setStatus('resolved');
        setOpenButton(true);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page]);

  const handleFormSubmit = imagesName => {
    setImagesName(imagesName);
    setPage(1);
  };

  const handlPageButton = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  const handlChangeModalImage = (largeImageURL = '', tags = '') => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setAlt(tags);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'pending' && <ImagePendingView />}
      {status === 'idle' && <div>Введите имя картинки</div>}
      {status === 'repeat' && <div>Такой картинки нет</div>}
      {status === 'rejected' && <h1>{error.massage}</h1>}
      {status === 'resolved' && (
        <ImageGallery>
          {images.map(({ webformatURL, tags, largeImageURL }, index) => (
            <ImageGalleryItem key={index}>
              <ImagesItem
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                handlChangeModalImage={handlChangeModalImage}
              />
            </ImageGalleryItem>
          ))}
        </ImageGallery>
      )}
      {showModal && (
        <Modal onClose={handlChangeModalImage}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
      {loading && <ImagePendingView />}
      {openButton && !loading && images.length !== totalHits && (
        <Button onLoadMore={handlPageButton} />
      )}
    </div>
  );
};

export default App;

// import React from 'react';
// import { useState } from 'react';
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import imagesAPI from '../services/images-api';
// import s from './app.module.css';
// import ImagePendingView from './Loader/Loader';
// import Modal from './Modal/Modal';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import ImagesItem from './ImagesItem/ImagesItem';

// class App extends React.Component {
//   state = {
//     images: [],
//     imagesName: '',
//     page: 1,
//     limit: 12,
//     openButton: false,
//     status: 'idle',
//     error: null,
//     totalHits: 0,
//     loading: false,
//     showModal: false,
//     largeImageURL: '',
//     alt: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.imagesName;
//     const nextName = this.state.imagesName;

//     const differentName = prevName !== nextName;

//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     const differentPage = prevPage !== nextPage;

//     if (differentName || differentPage) {
//       if (differentName) {
//         this.setState({
//           status: 'pending',
//           openButton: false,
//         });
//       }

//       imagesAPI
//         .fetchImages(nextName, this.state.limit, nextPage)
//         .then(images => {
//           if (!images.hits.length) {
//             return this.setState({
//               openButton: false,
//               status: 'repeat',
//             });
//           }

//           if (differentName) {
//             return this.setState({
//               images: [...images.hits],
//               openButton: true,
//               status: 'resolved',
//               totalHits: images.totalHits,
//             });
//           }

//           if (differentPage) {
//             return this.setState(state => ({
//               images: [...state.images, ...images.hits],
//               status: 'resolved',
//               openButton: true,
//               loading: false,
//             }));
//           }
//         })
//         .catch(error => this.setState({ error: error, status: 'rejected' }));
//     }
//   }

//   handleFormSubmit = imagesName => {
//     this.setState({
//       imagesName: imagesName,
//       page: 1,
//     });
//   };

//   handlPageButton = () => {
//     this.setState(statePrev => {
//       return {
//         page: statePrev.page + 1,
//         loading: true,
//       };
//     });
//   };

//   handlChangeModalImage = (largeImageURL = '', tags = '') => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeImageURL: largeImageURL,
//       alt: tags,
//     }));
//   };

//   render() {
//     const {
//       images,
//       openButton,
//       status,
//       error,
//       loading,
//       totalHits,
//       largeImageURL,
//       alt,
//       showModal,
//     } = this.state;

//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {status === 'pending' && <ImagePendingView />}
//         {status === 'idle' && <div>Введите имя картинки</div>}
//         {status === 'repeat' && <div>Такой картинки нет</div>}
//         {status === 'rejected' && <h1>{error.massage}</h1>}
//         {status === 'resolved' && (
//           <ImageGallery>
//             {images.map(({ webformatURL, tags, largeImageURL }, index) => (
//               <ImageGalleryItem key={index}>
//                 <ImagesItem
//                   webformatURL={webformatURL}
//                   tags={tags}
//                   largeImageURL={largeImageURL}
//                   handlChangeModalImage={this.handlChangeModalImage}
//                 />
//               </ImageGalleryItem>
//             ))}
//           </ImageGallery>
//         )}
//         {showModal && (
//           <Modal onClose={this.handlChangeModalImage}>
//             <img src={largeImageURL} alt={alt} />
//           </Modal>
//         )}
//         {loading && <ImagePendingView />}
//         {openButton && !loading && images.length !== totalHits && (
//           <Button onLoadMore={this.handlPageButton} />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
