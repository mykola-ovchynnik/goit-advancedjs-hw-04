import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40888017-179b7a421750c84ea86ef3d3f';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
};

async function serviceGetImages(searchQuery, page) {
  const instance = axios.create({
    params: {
      q: searchQuery,
      page,
    },
  });

  const response = await instance.get();

  if (!response.data.totalHits) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  page += 1;

  return response.data;
}

export { serviceGetImages };
