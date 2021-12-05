import API  from './fetchImage';
const axios = require('axios');
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import templateList from './template.hbs';
import ApiServise from './fetchImage'

const form = document.querySelector('#search-form')
const searchBtn = document.querySelector("button");
const input = document.querySelector("input");
const loadMoreBtn = document.querySelector('.load-more');
const apiServise = new ApiServise();
//let searchQuery = '';

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore)


function onSubmit(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.searchQuery.value.trim();
  apiServise.fetchImage().then(renderUserListItems).catch((error) => { return Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
    };


function renderUserListItems(cards) {
   const markup = templateList.join("");
  userList.innerHTML = markup;
};

function onLoadMore(e) {
  e.preventDefault();
  apiServise.fetchImage().then(renderUserListItems).catch((error) => { return Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
 }