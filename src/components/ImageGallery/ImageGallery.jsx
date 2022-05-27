import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';

class ImageGallery extends React.Component {
  render() {
    const images = this.props.images;

    return <ul className={s.ImageGallery}>
      <ImageGalleryItem
        images={images}
        // onShowModal={this.handlChangeModal}
        // changeImageURL={this.handlChangeModalImage}
      />
    </ul>
  }
}

export default ImageGallery;






// import React from 'react';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Button from '../Button/Button';
// import imagesAPI from '../services/images-api';
// import s from './imageGallery.module.css';
// import ImagePendingView from '../Loader/Loader';
// import Modal from '../Modal/Modal';

// class ImageGallery extends React.Component {
//   state = {
//     images: [],
//     error: null,
//     status: 'idle',
//     loading: false,
//     limit: 12,
//     page: 1,
//     openButton: false,
//     showModal: false,
//     largeImageURL: null,
//     alt: '',
//     totalHits: 0,
//   };

//   handlPageButton = () => {
//     this.setState(statePrev => {
//       return {
//         page: statePrev.page + 1,
//         openButton: true,
//       };
//     });
//   };

//   handlChangeModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   handlChangeModalImage = ({ largeImageURL, alt }) => {
//     this.setState({ largeImageURL: largeImageURL, alt: alt });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.imagesName;
//     const nextName = this.props.imagesName;

//     const prevPageButton = prevState.page;
//     const nextPageButton = this.state.page;

//     const differentPage = prevPageButton !== nextPageButton;
//     const differentName = prevName !== nextName;

//     if (differentName || differentPage) {
//       if (differentName && !this.state.openButton) {
//         setTimeout(() => {
//           return this.setState({
//             status: 'pending',
//             page: 1,
//           });
//         }, 10);
//       }

//       if (differentPage && this.state.openButton) {
//         setTimeout(() => {
//           return this.setState({
//             page: nextPageButton,
//             loading: true,
//           });
//         }, 10);
//       }
//     }

//     setTimeout(() => {
//       const { limit, page } = this.state;

//       imagesAPI
//         .fetchImages(nextName, limit, page)
//         .then(images => {
//           if (!images.hits.length) {
//             return this.setState({
//               images: [...images.hits],
//               status: 'repeat',
//               loading: false,
//             });
//           }

//           if (differentName && !this.state.openButton) {
//             this.setState({
//               images: [...images.hits],
//               totalHits: images.totalHits,
//               status: 'resolved',
//               loading: false,
//             });
//           }

//           if (differentPage && this.state.openButton) {
//             this.setState(state => ({
//               images: [...state.images, ...images.hits],
//               status: 'resolved',
//               loading: false,
//               openButton: false,
//             }));
//           }
//         })
//         .catch(error => this.setState({ error: error, status: 'rejected' }));
//     }, 20);
//   }

//   render() {
//     const {
//       images,
//       error,
//       status,
//       loading,
//       showModal,
//       largeImageURL,
//       alt,
//       totalHits,
//     } = this.state;

//     if (status === 'idle') {
//       return <div>Введите имя картинки</div>;
//     }

//     if (status === 'pending') {
//       return <ImagePendingView />;
//     }

//     if (status === 'resolved') {
//       return (
//         <div>
//           <ul className={s.ImageGallery}>
//             <ImageGalleryItem
//               images={images}
//               onShowModal={this.handlChangeModal}
//               changeImageURL={this.handlChangeModalImage}
//             />
//           </ul>

//           {loading && <ImagePendingView />}

//           {images.length !== totalHits && !loading && (
//             <Button onLoadMore={this.handlPageButton} />
//           )}

//           {showModal && (
//             <Modal onClose={this.handlChangeModal}>
//               <img src={largeImageURL} alt={alt} />
//             </Modal>
//           )}
//         </div>
//       );
//     }

//     if (status === 'repeat') {
//       return <div>Такой картинки нет</div>;
//     }

//     if (status === 'rejected') {
//       return <h1>{error.massage}</h1>;
//     }
//   }
// }

// export default ImageGallery;
