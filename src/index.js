import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import { galleryMarkup } from './markup.js';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38158764-820b680c529367ace5249e2e2';
axios.defaults.headers.common['x-api-key'] = API_KEY;

// ALL REFS
const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  formBtn: document.querySelector('.search-form button'),
  input: document.querySelector('.search-form-input'),
  btnLoadMore: document.querySelector('.load-more'),
};

let page = 1;
let perPage = 40;
let totalHits = 0;

refs.form.addEventListener('click', handleSubmit);
refs.btnLoadMore.addEventListener('click', handleLoadMore);

async function handleSubmit(e) {
  e.preventDefault();
  const value = input.value;
  await fetchImages(value);
}
async function handleLoadMore() {
  const value = input.value;
  await fetchImages(value);
}

// FETCHIMAGES FUNCTION
async function fetchImages(value) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0) {
      showError();
    } else {
      showGallery(data.hits);
      totalHits = data.totalHits;
      if (page * perPage < totalHits) {
        btnLoadMore.ishidden = false;
      } else {
        btnLoadMore.ishidden = true;
        showMessage();
      }
    }
    page++;
  } catch (error) {
    showError();
  }
}

// function showGallery
function showGallery(images) {
  images.forEach(image => {
    const { tags, webformatURL, likes, views, comments, downloads } = image;
    const markup = `
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img"/>
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`;
    gallery.insertAdjacentHTML('beforeend', markup);
  });
}

// function showError
function showError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

// function showMessage

function showMessage() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

// SIMPLElightbox
const lightBoxGallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

// сповіщення..
const notifyMessage = {
  width: '250px',
  position: 'right-bottom',
  distance: '20px',
  timeout: 1500,
  opacity: 0.8,
  fontSize: '16px',
  borderRadius: '50px',
};

// SCROLLFUNCTION
// window.addEventListener('scroll', scrollFunction);

// function scrollFunction() {
//   if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
//     refs.btnUpWrapper.style.display = 'flex';
//   } else {
//     refs.btnUpWrapper.style.display = 'none';
//   }
// }
// refs.btnUp.addEventListener('click', () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });

refs.input.addEventListener('input', async e => {
  const inputEl = e.target.value.trim();
  if (inputEl.length === 0) {
    refs.formBtn.setAttribute('disabled', 'disabled');
  } else if (inputEl.length > 0) {
    refs.formBtn.removeAttribute('disabled');
    refs.formBtn.style.cursor = 'pointer';
  }
  return;
});
