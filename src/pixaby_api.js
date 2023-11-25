const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40888017-179b7a421750c84ea86ef3d3f';

function serviceGetImages(searchQuery) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { serviceGetImages };
