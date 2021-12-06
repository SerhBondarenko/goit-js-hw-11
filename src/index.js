import API  from './fetchImage';
const axios = require('axios');
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imagesTpl from './template.hbs';
import ApiServise from './fetchImage'

const form = document.querySelector('#search-form')
const searchBtn = document.querySelector("button");
const input = document.querySelector("input");
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more');
const apiServise = new ApiServise();

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore)

function onSubmit(e) {
  clearImgContainer();
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.searchQuery.value.trim();
  apiServise.resetPage();
  apiServise.fetchImage().then(renderItems).catch((error) => { return Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
    };

function onLoadMore(e) {
  e.preventDefault();
  apiServise.fetchImage().then(renderItems).catch((error) => { return Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
};

function renderItems(data) {
  gallery.insertAdjacentHTML('beforeend', imagesTpl(data.hits));
  Notify.success(`Hooray! We found ${data.totalHits} images.`)
    lightboxGallery()
};

function clearImgContainer() {
  gallery.innerHTML = '';
};