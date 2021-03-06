const API_KEY = '24634103-ccaa1178ad9ce2c93fc6cee88';
const BASE_URL = 'https://pixabay.com/api/'
const axios = require('axios').default;
export default class ApiServise {
  constructor(){
    this.searchQuery ='';
    this.page = 1;
   
  }
 
  async fetchImage() {
  console.log(this)
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    
  return  axios.get(url).then(response=>{
    this.incrementPage();
    return response.data
  })
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
 }