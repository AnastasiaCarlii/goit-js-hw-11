import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38158764-820b680c529367ace5249e2e2';
const PARAMETERS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export const getImages = async function (searchValue, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchValue}&${PARAMETERS}&page=${page}`
  );
  if (!response.statusText === 'OK') {
    notifyFailure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  return response.data;
};
