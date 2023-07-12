// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  searchForm,
  searchInput,
  gallery,
  loadMoreButton,
  loader,
} from './allRefs.js';
import { getImages } from './pixabay.api.js';
import { notifySuccess, notifyFailure } from './notiflix.notify.js';

// SIMPLElightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

let page = 1;
let perPage = 40;
let totalImages = 0;
let searchValue = '';

searchForm.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', loadMoreImages);
loadMoreButton.classList.add('is-hidden');
loader.style.display = 'none';

// функція онсабміт
function onSubmit(event) {
  loader.style.display = 'block';
  event.preventDefault();
  page = 1;
  searchValue = searchInput.value;
  gallery.innerHTML = '';
  totalImages = 0;
  getImages(searchValue)
    .then(data => {
      if (data.hits.length === 0 || searchValue === '') {
        notifyFailure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        notifySuccess(`Hooray! We found ${data.totalHits} images.`);
        loadMoreButton.classList.remove('is-hidden');
        createMarkup(data);
        lightbox.refresh();
      }
    })
    .catch(err => console.log(err));
}

// функція маркап
function createMarkup(data) {
  const markup = data.hits
    .map(image => {
      return `<div class="photo-card">
        <a class="gallery__link" href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="280" height="210" /></a>
        <div class="info">
        <p class="info-item"><b>Likes</b> ${image.likes}</p>
        <p class="info-item"><b>Views</b> ${image.views}</p>
        <p class="info-item"><b>Comments</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
      </div>
      </div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  loader.style.display = 'none';
  totalImages += data.hits.length;

  if (totalImages >= data.totalHits) {
    loadMoreButton.classList.add('is-hidden');
  }
}

// функція завантаження більше зображень
function loadMoreImages() {
  page += 1;
  getImages(searchValue, page)
    .then(data => {
      createMarkup(data);
      totalImages += data.hits.length;
      if (totalImages >= data.totalHits) {
        loadMoreButton.classList.add('is-hidden');
        notifyFailure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      ScrollImages();
      lightbox.refresh();
    })
    .catch(error =>
      notifyFailure(
        "We're sorry, but an error occurred while loading more images."
      )
    );
}

// скрол функція

function ScrollImages() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
