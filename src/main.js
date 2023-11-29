import { serviceGetImages } from './pixaby_api';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

elements.searchForm.addEventListener('submit', handlerSearch);

const lightbox = new SimpleLightbox('.gallery a');

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(handlerLoadMore, options);

let page;
let searchQuery;
let shownItemCounter = 0;

async function handlerSearch(event) {
  event.preventDefault();

  try {
    observer.disconnect();
    elements.gallery.innerHTML = '';

    searchQuery = validateInput(elements.searchForm.searchQuery.value);

    page = 1;
    shownItemCounter = 0;

    const totalHits = await serviceImages();

    showSuccessMessage(totalHits);
    observer.observe(elements.guard);

    validateImgAmount(totalHits);
  } catch (err) {
    showErrorMessage(err.message);
  } finally {
    elements.searchForm.reset();
  }
}

async function serviceImages() {
  const { hits, totalHits } = await serviceGetImages(searchQuery, page);

  shownItemCounter += 40;
  elements.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));

  lightbox.refresh();
  return totalHits;
}

function createMarkup(array) {
  return array
    .map(item => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = item;

      return `
      <a href="${largeImageURL}" class="photo-card" data-lightbox="gallery">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${downloads}
          </p>
        </div>
      </a>`;
    })
    .join('');
}

function handlerLoadMore(entries) {
  entries.forEach(async entry => {
    try {
      if (entry.isIntersecting) {
        page += 1;

        const totalHits = await serviceImages();

        validateImgAmount(totalHits);
        enableSmoothScroll();
      }
    } catch (err) {
      showErrorMessage(err.message);
    }
  });
}

function showSuccessMessage(totalHits) {
  iziToast.success({
    message: `Hooray! We found ${totalHits} images.`,
    position: 'topRight',
  });
}

function showErrorMessage(message) {
  iziToast.error({
    message,
    position: 'topRight',
  });
}

function enableSmoothScroll() {
  const { height: cardHeight } =
    elements.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function validateInput(inputValue) {
  inputValue = inputValue.trim();

  if (inputValue === '') {
    throw new Error('Search field cannot be empty!');
  }

  return inputValue;
}

function validateImgAmount(totalHits) {
  if (shownItemCounter >= totalHits) {
    observer.disconnect();

    throw new Error(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
