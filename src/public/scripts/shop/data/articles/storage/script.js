import { screenBox } from '../../../interface/script.js';
import { closeWinBtn } from '../../script.js';

export const storageSearchTypingInput = document.getElementById('storageSearchTypingInput');

const partyId = screenBox.getAttribute('id-info');
const storageBtn = document.getElementById('viewStorage');
const storageAddBtn = document.getElementById('storageAddBtn');
const addTable = document.getElementById('addTable');
const addSearchHeader = document.getElementById('addSearchHeader');
const addQueryResults = document.getElementById('addQueryResults');
const bookAddView = document.getElementById('bookAddView');
const separAddView = document.getElementById('separAddView');
const magAddView = document.getElementById('magAddView');
const addToPartyScreens = document.querySelector('.addToPartyScreens');
const partyNameTag = document.getElementById('partyNameTag');
const addBookToPartyScreen = document.querySelector('.addBookToPartyScreen');
const addBookNameTag = document.getElementById('addBookNameTag');
const cancelAddBookToPartyBtn = document.getElementById('cancelAddBookToPartyBtn');
const addBookToPartyForm = document.getElementById('addBookToPartyForm');

const addSeparToPartyScreen = document.querySelector('.addSeparToPartyScreen');
const addSeparNameTag = document.getElementById('addSeparNameTag');

const stgTable = document.getElementById('stgTable');
const storageNameBox = document.getElementById('storageNameBox');
const searchImg = document.getElementById('searchImg');

/*

const bookStorageView = document.getElementById('bookStorageView');
const separStorageView = document.getElementById('separStorageView');
const magStorageView = document.getElementById('magStorageView');

*/

storageBtn.addEventListener('click',
  changeToStorageMode, viewStorage(partyId));

storageAddBtn.addEventListener('click', function () {
  const addBtnMode = storageAddBtn.getAttribute('mode-info');

  if (addBtnMode === 'storage') {
    changeToAddMode();
  } else {
    changeToStorageMode();
  }
});

addBookToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendBookToParty();
});

storageSearchTypingInput.addEventListener('input', searchLog);
cancelAddBookToPartyBtn.addEventListener('click', cancelAddBookToParty);

function changeToAddMode () {
  storageSearchTypingInput.focus();
  storageAddBtn.innerHTML = 'Dejar de Añadir';
  storageNameBox.innerHTML = 'Añadiendo productos';
  storageAddBtn.setAttribute('mode-info', 'adding');
  storageSearchTypingInput.setAttribute('mode-info', 'adding');
  stgTable.classList.remove('active');
  addSearchHeader.classList.add('active');
  addTable.classList.add('active');
  storageSearchTypingInput.value = '';
  showAllDB();
  startAddingFunctions();
}

function changeToStorageMode () {
  storageSearchTypingInput.focus();
  storageAddBtn.innerHTML = '+ Añadir productos';
  storageNameBox.innerHTML = 'Inventario: de algo';
  storageAddBtn.setAttribute('mode-info', 'storage');
  storageSearchTypingInput.setAttribute('mode-info', 'storage');

  addSearchHeader.classList.remove('active');
  addTable.classList.remove('active');
  stgTable.classList.add('active');
  storageSearchTypingInput.value = '';
}

function viewStorage (partyId) {
  /*

  fetch(`/shop/getpartystorage/books/all/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      bookStorageView.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch(`/shop/getpartystorage/separs/all/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      separStorageView.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch(`/shop/getpartystorage/mags/all/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      magStorageView.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

    */
}

function startAddingFunctions () {
  const newProductBtn = document.getElementById('newProductBtn');

  newProductBtn.addEventListener('click', startAddScreens);
}

function startAddScreens () {
  window.location.href = '/fullstorage/addfromzero';
}

function showAllDB () {
  fetch('/fullstorage/products/books/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      bookAddView.innerHTML = html;
      document.querySelectorAll('.book-toggle-btn').forEach(card => {
        card.addEventListener('click', showBookOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch('/fullstorage/products/separs/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      separAddView.innerHTML = html;
      document.querySelectorAll('.separ-toggle-btn').forEach(card => {
        card.addEventListener('click', showSeparOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch('/fullstorage/products/mags/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      magAddView.innerHTML = html;
      document.querySelectorAll('.mag-toggle-btn').forEach(card => {
        card.addEventListener('click', showMagOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
  hideQueryResults();
}

function hideAllDB () {
  bookAddView.innerHTML = '';
  separAddView.innerHTML = '';
  magAddView.innerHTML = '';
}

function showBookOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editAskElement = productCardElement.querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const addBookToPartyBtn = editAskElement.querySelector('.addBookToPartyBtn');
  const bookName = productCardElement.querySelector('.cardBookName').textContent.trim();
  const bookId = event.target.closest('.product-card').querySelector('.cardBookEDQid').textContent.trim();
  addBookToPartyBtn.addEventListener('click', () => startAddToPartyBook(bookName, bookId));
}

function showSeparOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editAskElement = productCardElement.querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const addSeparToPartyBtn = editAskElement.querySelector('.addSeparToPartyBtn');
  const separName = productCardElement.querySelector('.cardSeparName').textContent.trim();
  const separId = event.target.closest('.product-card').querySelector('.cardSeparEDQid').textContent.trim();

  console.log(separName, separId);
  addSeparToPartyBtn.addEventListener('click', startAddToPartySepar(separName, separId));
}

function showMagOptions (event) {
  const editAskElement = event.target.closest('.product-card').querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const addMagToPartyBtn = editAskElement.querySelector('.addMagToPartyBtn');

  addMagToPartyBtn.addEventListener('click', startAddToPartyMag);
}

function startAddToPartyBook (bookName, bookId) {
  closeWinBtn.classList.add('hide');
  addBookToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  partyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addBookNameTag.innerHTML = `${bookName} con id <div class="bookIdTag">${bookId}</div>`;
}

function startAddToPartySepar (separName, separId) {
  closeWinBtn.classList.add('hide');
  addSeparToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  partyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addSeparNameTag.innerHTML = `${separName} con id <div class="separIdTag">${separId}</div>`;
}

function startAddToPartyMag () {
  console.log('start mag');
}

function cancelAddBookToParty () {
  closeWinBtn.classList.remove('hide');
  addBookToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addBookToPartyForm.reset();
  partyNameTag.innerHTML = '';
  addBookNameTag.innerHTML = '';
}

function getSendBookToParty () {
  const bookIdTag = document.querySelector('.bookIdTag').innerHTML;
  const amount = document.getElementById('bookToPartyAmountInput').value;
  const price = document.getElementById('bookToPartyNewpriceInput').value;

  const data = {
    fs_id: String(bookIdTag),
    party_id: String(partyId),
    amount: Number(amount),
    party_price: price === '' ? 0 : Number(price)
  };
  addBookToParty(data);
}

function addBookToParty (data) {
  fetch('/shop/data/storage/addbook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor.');
      }

      if (response.ok) {
        startAfterAddBook(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterAddBook (info) {
  /*
  addVariableBookBtn.classList.remove('hide');
  bookAfterTag.innerHTML = 'El producto se ha guardado correctamente en el inventario';
  bookAfterTag.dataset.id = info.book_id;
  bookAfterTag.dataset.kind = info.bookfs_kind;
  addBookToFullstorageScreen.classList.remove('active');
  askBookToFullstorageScreen.classList.add('active');
  */
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
      showQueryResults(html);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function hideQueryResults () {
  addQueryResults.classList.remove('active');
  addQueryResults.innerHTML = '';
}

function showQueryResults (html) {
  addQueryResults.classList.add('active');
  addQueryResults.innerHTML = html;
}

function searchLog () {
  const query = storageSearchTypingInput.value.trim() || 'emptyquerystring';

  if (query === 'emptyquerystring') {
    searchImg.classList.remove('active');
    showAllDB();
  } else {
    hideAllDB();
    hideQueryResults();
    searchImg.classList.add('active');
    fetchQueryProducts(query);
  }
}
