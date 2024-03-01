import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form'); //look for form
const loader = document.querySelector('.loader'); // btn for loading more images
const loadMore = document.querySelector('.load-more');
let inputValue = ''; //for reusing search to get more pics rendering by btn load more
let pageNum;
let currentQuery;

form.addEventListener('submit', imageFetch);
loadMore.addEventListener('click', loadMorePics);
loadMore.classList.add('is-hidden');

function imageFetch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');
  inputValue = event.currentTarget.elements.search.value.trim(); //current value-first render

  if (inputValue === '') {
    iziToast.error({
      title: 'Error',
      message: `Please enter a search query.`,
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      titleColor: '#fff',
      progressBarColor: '#B51B1B',
      position: 'topRight',
    });
    loader.classList.add('is-hidden');
    return;
  }
  loader.classList.remove('is-hidden');

  getImages(inputValue, 15, 1)
    .then(response => {
      if (response.hits.length === 0) {
        throw new Error('No images found');
      }
      renderGalleryImages(response.hits); //call func and give response
      currentQuery = inputValue;
      pageNum = 1;
      loadMore.classList.remove('is-hidden');
      event.target.reset(); //reset input
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `${error.message || 'Something went wrong'}`,
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#B51B1B',
        position: 'topRight',
      });
      loadMore.classList.add('is-hidden');
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}

const lightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

let renderCount = 0;
// rendering images
function renderGalleryImages(images) {
  const html = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class ='gallery-item'>
        <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image"
                src="${webformatURL}"
                alt="${tags}"
                width="360"
                height="152"/>
        </a>  
        <div class='info-block'>
            <div class="info">
                <h3 class = "head-likes">Likes</h3>
                <p>${likes}</p>
            </div>
            <div class="info">
                <h3 class = "head-views">Views</h3>
                <p>${views}</p>
            </div>
            <div class="info">
                <h3 class = "head-comments">Comments</h3>
                <p>${comments}</p>
            </div>
            <div class="info">
                <h3 class = "head-downloads">Downloads</h3>
                <p>${downloads}</p>
            </div>
        </div>
    </li>`
    )
    .join('');
  //scrolling from 2 render

  gallery.insertAdjacentHTML('beforeend', html);
  lightbox.refresh();
  //scrolling
  if (renderCount >= 1) {
    // get height of 1 card
    const galleryItemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    // smooth scrolling on height*2
    window.scrollBy({ top: galleryItemHeight * 2, behavior: 'smooth' });
  }
  renderCount++;
}

function loadMorePics(event) {
  pageNum++;
  getImages(currentQuery, 15, pageNum).then(response => {
    const totalHits = response.totalHits || 0;
    const currentHits = pageNum * 15;

    if (currentHits >= totalHits) {
      loadMore.classList.add('is-hidden'); // hide button
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#4CAF50',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#4CAF50',
        position: 'topRight',
      });
    } else {
      renderGalleryImages(response.hits);
    }
    //call func and give response
  });
}
