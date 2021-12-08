import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import API from './fetchImage';
const axios = require('axios');
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imagesTpl from './template.hbs';
import ApiServise from './fetchImage';
import LoadMoreButton from './load-more-btn'

const form = document.querySelector('#search-form')
//const searchBtn = document.querySelector("button");//
const input = document.querySelector("input");
const gallery = document.querySelector('.gallery')
//const loadMoreBtn = document.querySelector('.btn');
const apiServise = new ApiServise();
const loadMoreBtn = new LoadMoreButton({
  selector: '[data-action="load-more"]',
hidden: true
});
//const loadMoreBtn = document.querySelector('[data-action="load-more]')
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
console.log(loadMoreBtn);

  //loadMoreBtn.show();
  //loadMoreBtn.disable();


form.addEventListener('submit', onSubmit);
//loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(e) {
  clearImgContainer();
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.searchQuery.value.trim();
   if (apiServise.query === '') {
    return alert('enter something')
  };
loadMoreBtn.show();
  loadMoreBtn.disable();
  apiServise.resetPage();
  apiServise.fetchImage().then(renderItems).then(loadMoreBtn.enable()).catch((error) => { return Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
    };

function onLoadMore(e) {
  loadMoreBtn.disable();
  e.preventDefault();
   if (apiServise.query === '') {
    return alert('enter something')
  };
  apiServise.fetchImage().then(renderItems).then(loadMoreBtn.enable()).catch((error) => { return Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
};

function renderItems(data) {
  gallery.insertAdjacentHTML('beforeend', imagesTpl(data.hits));
  Notify.success(`Hooray! We found ${data.totalHits} images.`)
    lightboxGallery()
};

function clearImgContainer() {
  gallery.innerHTML = '';
};

///Если бэкенд возвращает пустой массив, 
 function error() {
  return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
 }
 ///Прокрутка страницы
function pageScroll() {
  const { height: cardHeight } = cardList.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  
}
///Библиотека SimpleLightbox
function lightboxGallery(){
  var lightbox = new SimpleLightbox('.gallery a', { 
    captions: true,
    captionsData:"alt",
    captionPosition:'bottom',
    captionDelay: 250,/* options */ });
}
