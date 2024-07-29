import { getOptions } from './options.js';

const searchTypingInput = document.getElementById('searchTypingInput');
const nonSearch = document.getElementById('nonSearch');
const searchImg = document.getElementById('searchImg');
const queryResults = document.getElementById('queryResults');

window.onload = () => {
  searchTypingInput.focus();
};

searchTypingInput.addEventListener('input', searchLog);

function hideQueryResults () {
  queryResults.classList.remove('active');
  queryResults.innerHTML = '';
}

function showQueryResults (html) {
  queryResults.classList.add('active');
  queryResults.innerHTML = html;
  getOptions();
}

function searchLog () {
  const query = searchTypingInput.value.trim() || 'emptyquerystring';

  if (query === 'emptyquerystring') {
    searchImg.classList.remove('active');
    nonSearch.classList.add('active');
    hideQueryResults();
  } else {
    nonSearch.classList.remove('active');
    hideQueryResults();
    searchImg.classList.add('active');
    fetchQueryProducts(query);
  }
}

function fetchQueryProducts (query) {
  console.log(query);
  fetch(`/fullstorage/products/search/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      console.log('fetching products');
      searchImg.classList.remove('active');
      if (!nonSearch.classList.contains('active')) {
        showQueryResults(html);
      }
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}
