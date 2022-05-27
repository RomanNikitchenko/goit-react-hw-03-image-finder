const APIKEY = '25718667-d0b548046b545cf0dd46ad07c';

function fetchImages(nextName, limit, page) {
  return fetch(
    `https://pixabay.com/api/?q=${nextName}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`нет картинки с именем ${nextName}`));
  });
}

const api = {
  fetchImages,
};

export default api;
