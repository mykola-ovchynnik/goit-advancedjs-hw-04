import { serviceGetImages } from './pixaby_api';

const searchForm = document.querySelector('.search-form');
const cardList = document.querySelector('.card-list');

searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(event) {
  event.preventDefault();

  const searchQuery = searchForm.searchQuery.value;

  serviceGetImages(searchQuery)
    .then(data => {
      cardList.innerHTML = createMarkup(data.hits);
    })
    .catch(err => console.log(err));

  searchForm.reset();
}

function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="card-item">
      <img src="${webformatURL}" alt="${tags}" data-largeImage="${largeImageURL}" class="image" />
      <div class="card-stats">
        <div class="wrapper">
          <h3>Likes</h3>
          <p>${likes}</p>
        </div>
        <div class="wrapper">
          <h3>Views</h3>
          <p>${views}</p>
        </div>
        <div class="wrapper">
          <h3>Comments</h3>
          <p>${comments}</p>
        </div>
        <div class="wrapper">
          <h3>Downloads</h3>
          <p>${downloads}</p>
        </div>
      </div>
    </li>`
    )
    .join('');
}
