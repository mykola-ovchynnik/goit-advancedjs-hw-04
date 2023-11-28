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
    searchQuery = elements.searchForm.searchQuery.value;
    elements.gallery.innerHTML = '';
    page = 1;

    const totalHits = await serviceImages();

    showSuccessMessage(totalHits);
    observer.observe(elements.guard);
  } catch (err) {
    showErrorMessage(err.message);
  } finally {
    elements.searchForm.reset();
  }
}

async function serviceImages() {
  const { hits, totalHits } = await serviceGetImages(searchQuery, page);

  elements.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  shownItemCounter += 40;

  if (shownItemCounter >= totalHits) {
    observer.disconnect();
  }

  initializeLightbox();
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
    if (entry.isIntersecting) {
      page += 1;

      enableSmoothScroll();
      serviceImages();
    }
  });
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
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
