import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import { galleryMarkup } from './markup.js';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38158764-820b680c529367ace5249e2e2';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  galleryRef: document.querySelector('.gallery'),
  formRef: document.querySelector('#search-form'),
  formBtnRef: document.querySelector('#search-form button'),
  formInputRef: document.querySelector('#search-form input'),
};

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 100,
});
