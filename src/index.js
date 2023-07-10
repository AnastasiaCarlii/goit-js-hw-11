import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { galleryMarkup } from './js/markup';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38158764-820b680c529367ace5249e2e2';

// ALL REFS
// const refs = {
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const formBtn = document.querySelector('.search-form button');
const input = document.querySelector('.search-form-input');
const btnLoadMore = document.querySelector('.load-more');

let page = 1;
let perPage = 40;
let totalHits = 0;
let inputValue = '';

// SIMPLElightbox
const lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

input.addEventListener('keydown', e => {
  if (formBtn.hasAttribute('disabled') && e.code === 'Space') {
    e.target.value = '';
    return Notiflix.Notify.failure(
      `Sorry, but don't start with '${e.code}'-key and enter valid word! ;)`
    );
  }
});

input.addEventListener('input', async e => {
  const inputEl = e.target.value.trim();
  if (inputEl.length === 0) {
    formBtn.setAttribute('disabled', 'disabled');
  } else if (inputEl.length > 0) {
    formBtn.removeAttribute('disabled');
    formBtn.style.cursor = 'pointer';
  }
  return;
});

const getImages = async value => {
  const imageThumb = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageCounter,
      per_page: perPage,
    },
  });

  return imageThumb;
};

form.addEventListener('submit', async e => {
  e.preventDefault();

  gallery.innerHTML = '';
  pageCounter = 1;
  inputValue = input.value.trim();
  await getImages(inputValue)
    .then(res => {
      const { hits, totalHits } = res.data;
      pagesCount = Math.ceil(totalHits / perPage);
      if (hits.length === 0) {
        gallery.innerHTML = '';
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          options
        );
      } else if (pagesCount === pageCounter) {
        gallery.innerHTML = '';
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
        lightBox.refresh();
        return Notiflix.Notify.failure(
          `We're sorry, but you've reached the end of search results.`,
          options
        );
      }
      // handleHideAnime();
      gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
      lightBox.refresh();
      return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    })
    .catch(error => {
      console.log(error.code);
      handleStartAnime();
      return Notiflix.Notify.failure(
        'Oops, something went wrong! ' + `Error is ${error.message}`
      );
    });
});

const loadMoreHandler = () => {
  pageCounter++;

  getImages(inputValue).then(res => {
    const { hits } = res.data;

    gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
    lightBox.refresh();

    if (pagesCount === pageCounter) {
      return Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
};

// form.addEventListener('submit', handleSubmit);
// btnLoadMore.addEventListener('click', handleLoadMore);

// async function handleSubmit(e) {
//   e.preventDefault();
//   const value = input.value;
//   await fetchImages(value);
// }
// async function handleLoadMore() {
//   // const value = refs.input.value;
//   // await fetchImages(value);
//   page++;
//   fetchImages(query, page);
// }

// FETCHIMAGES FUNCTION
// async function fetchImages(value) {
// const url = `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
//   const url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}`;
//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     if (data.hits.length === 0) {
//       showError();
//     } else {
//       showGallery(data.hits);
//       totalHits = data.totalHits;
//       if (page * perPage < totalHits) {
//         btnLoadMore.ishidden = false;
//       } else {
//         btnLoadMore.ishidden = true;
//         showMessage();
//       }
//     }
//     page++;
//   } catch (error) {
//     showError();
//   }
// }

// function showGallery
// function showGallery(images) {
//   images.forEach(image => {
//     const { tags, webformatURL, likes, views, comments, downloads } = image;
//     const markup = `
//       <div class="photo-card">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img"/>
//         <div class="info">
//           <p class="info-item">
//             <b>Likes ${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>Views ${views}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments ${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads ${downloads}</b>
//           </p>
//         </div>
//       </div>`;
//     gallery.insertAdjacentHTML('beforeend', markup);
//   });
// }

// function showError
// function showError() {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
// }

// function showMessage

// function showMessage() {
//   Notiflix.Notify.info(
//     "We're sorry, but you've reached the end of search results."
//   );
// }

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

// input.addEventListener('input', async e => {
//   const inputEl = e.target.value.trim();
//   if (inputEl.length === 0) {
//     formBtn.setAttribute('disabled', 'disabled');
//   } else if (inputEl.length > 0) {
//     formBtn.removeAttribute('disabled');
//     formBtn.style.cursor = 'pointer';
//   }
//   return;
// });
