import { screenBox } from '../../../interface/script.js';
import { closeWinBtn } from '../../script.js';

export const storageSearchTypingInput = document.getElementById('storageSearchTypingInput');

const partyId = screenBox.getAttribute('id-info');

const storageBtn = document.getElementById('viewStorage');
const storageAddBtn = document.getElementById('storageAddBtn');
const addTable = document.getElementById('addTable');
const addSearchHeader = document.getElementById('addSearchHeader');
const addDBResults = document.getElementById('addDBResults');
const addQueryResults = document.getElementById('addQueryResults');
const storageDBResults = document.getElementById('storageDBResults');
const storageQueryResults = document.getElementById('storageQueryResults');

const bookAddView = document.getElementById('bookAddView');
const separAddView = document.getElementById('separAddView');
const magAddView = document.getElementById('magAddView');

const addToPartyScreens = document.querySelector('.addToPartyScreens');

const addBookToPartyScreen = document.querySelector('.addBookToPartyScreen');
const bookPartyNameTag = document.getElementById('bookPartyNameTag');
const addBookNameTag = document.getElementById('addBookNameTag');
const cancelAddBookToPartyBtn = document.getElementById('cancelAddBookToPartyBtn');
const addBookToPartyForm = document.getElementById('addBookToPartyForm');

const addSeparToPartyScreen = document.querySelector('.addSeparToPartyScreen');
const addSeparNameTag = document.getElementById('addSeparNameTag');
const separPartyNameTag = document.getElementById('separPartyNameTag');
const cancelAddSeparToPartyBtn = document.getElementById('cancelAddSeparToPartyBtn');
const addSeparToPartyForm = document.getElementById('addSeparToPartyForm');

const addMagToPartyScreen = document.querySelector('.addMagToPartyScreen');
const addMagNameTag = document.getElementById('addMagNameTag');
const magPartyNameTag = document.getElementById('magPartyNameTag');
const cancelAddMagToPartyBtn = document.getElementById('cancelAddMagToPartyBtn');
const addMagToPartyForm = document.getElementById('addMagToPartyForm');

const stgTable = document.getElementById('stgTable');
const storageNameBox = document.getElementById('storageNameBox');
const searchImg = document.getElementById('searchImg');

const bookStorageView = document.getElementById('bookStorageView');
const separStorageView = document.getElementById('separStorageView');
const magStorageView = document.getElementById('magStorageView');

const editBookAmountToPartyScreen = document.querySelector('.editBookAmountToPartyScreen');
const editBookAmountNameTag = document.getElementById('editBookAmountNameTag');
const bookAmountPartyNameTag = document.getElementById('bookAmountPartyNameTag');
const cancelEditBookAmountToPartyBtn = document.getElementById('cancelEditBookAmountToPartyBtn');
const editBookAmountToPartyForm = document.getElementById('editBookAmountToPartyForm');

const editSeparAmountToPartyScreen = document.querySelector('.editSeparAmountToPartyScreen');
const editSeparAmountNameTag = document.getElementById('editSeparAmountNameTag');
const separAmountPartyNameTag = document.getElementById('separAmountPartyNameTag');
const cancelEditSeparAmountToPartyBtn = document.getElementById('cancelEditSeparAmountToPartyBtn');
const editSeparAmountToPartyForm = document.getElementById('editSeparAmountToPartyForm');

const editMagAmountToPartyScreen = document.querySelector('.editMagAmountToPartyScreen');
const editMagAmountNameTag = document.getElementById('editMagAmountNameTag');

const magAmountPartyNameTag = document.getElementById('magAmountPartyNameTag');
const cancelEditMagAmountToPartyBtn = document.getElementById('cancelEditMagAmountToPartyBtn');
const editMagAmountToPartyForm = document.getElementById('editMagAmountToPartyForm');

storageBtn.addEventListener('click', changeToStorageMode);

storageAddBtn.addEventListener('click', function () {
  const addBtnMode = storageAddBtn.getAttribute('mode-info');

  if (addBtnMode === 'storage') {
    changeToAddMode();
  } else {
    changeToStorageMode();
  }
});

storageSearchTypingInput.addEventListener('input', searchLog);

cancelAddBookToPartyBtn.addEventListener('click', cancelAddBookToParty);
cancelAddSeparToPartyBtn.addEventListener('click', cancelAddSeparToParty);
cancelAddMagToPartyBtn.addEventListener('click', cancelAddMagToParty);

addBookToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendBookToParty();
});

addSeparToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendSeparToParty();
});

addMagToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendMagToParty();
});

cancelEditBookAmountToPartyBtn.addEventListener('click', cancelEditBookAmountToParty);
cancelEditSeparAmountToPartyBtn.addEventListener('click', cancelEditSeparAmountToParty);

cancelEditMagAmountToPartyBtn.addEventListener('click', cancelEditMagAmountToParty);

editBookAmountToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendBookAmountToParty();
});

editSeparAmountToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendSeparAmountToParty();
});

editMagAmountToPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendMagAmountToParty();
});

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
  storageAddBtn.innerHTML = '+ Añadir productos';
  storageAddBtn.setAttribute('mode-info', 'storage');
  storageSearchTypingInput.setAttribute('mode-info', 'storage');
  addSearchHeader.classList.remove('active');
  addTable.classList.remove('active');
  stgTable.classList.add('active');
  storageDBResults.classList.add('active');
  storageSearchTypingInput.value = '';
  storageSearchTypingInput.focus();
  viewStorage(partyId);
}

function viewStorage (partyId) {
  fetch(`/shop/getpartystorage/books/all/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      bookStorageView.innerHTML = html;
      const productCards = document.querySelectorAll('.partyStorageProductCard');
      const totalProductCards = productCards.length;
      storageNameBox.innerHTML = `${totalProductCards} productos en este evento`;
      document.querySelectorAll('.book-toggle-btn').forEach(card => {
        card.addEventListener('click', showStorageBookOptions);
      });
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
      const productCards = document.querySelectorAll('.partyStorageProductCard');
      const totalProductCards = productCards.length;
      storageNameBox.innerHTML = `${totalProductCards} productos en este evento`;
      document.querySelectorAll('.separ-toggle-btn').forEach(card => {
        card.addEventListener('click', showStorageSeparOptions);
      });
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
      const productCards = document.querySelectorAll('.partyStorageProductCard');
      const totalProductCards = productCards.length;
      storageNameBox.innerHTML = `${totalProductCards} productos en este evento`;
      document.querySelectorAll('.mag-toggle-btn').forEach(card => {
        card.addEventListener('click', showStorageMagOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
  storageDBResults.classList.add('active');
  hideStorageQueryResults();
}

function showStorageBookOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editAskElement = productCardElement.querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const editPartyBookAmountBtn = editAskElement.querySelector('.editPartyBookAmountBtn');
  const bookName = productCardElement.querySelector('.cardBookName').textContent.trim();
  const bookId = event.target.closest('.product-card').querySelector('.cardBookEDQid').textContent.trim();
  editPartyBookAmountBtn.addEventListener('click', () => startEditAmountToPartyBook(bookName, bookId));
}

function showStorageSeparOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editAskElement = productCardElement.querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const editPartySeparAmountBtn = editAskElement.querySelector('.editPartySeparAmountBtn');
  const separName = productCardElement.querySelector('.cardSeparName').textContent.trim();
  const separId = event.target.closest('.product-card').querySelector('.cardSeparEDQid').textContent.trim();
  editPartySeparAmountBtn.addEventListener('click', () => startEditAmountToPartySepar(separName, separId));
}

function showStorageMagOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editAskElement = productCardElement.querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const editPartyMagAmountBtn = editAskElement.querySelector('.editPartyMagAmountBtn');
  const magName = productCardElement.querySelector('.cardMagazineName').textContent.trim();
  const magId = event.target.closest('.product-card').querySelector('.cardMagazineEDQid').textContent.trim();
  editPartyMagAmountBtn.addEventListener('click', () => startEditAmountToPartyMag(magName, magId));
}

function startEditAmountToPartyBook (bookName, bookId) {
  closeWinBtn.classList.add('hide');
  editBookAmountToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  bookAmountPartyNameTag.innerHTML = `Editando en este evento con id : ${partyId}`;
  editBookAmountNameTag.innerHTML = `${bookName} con id : <div class="idTag amountBookIdTag">${bookId}</div>`;
}

function startEditAmountToPartySepar (separName, separId) {
  closeWinBtn.classList.add('hide');
  editSeparAmountToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  separAmountPartyNameTag.innerHTML = `Editando en este evento con id : ${partyId}`;
  editSeparAmountNameTag.innerHTML = `${separName} con id : <div class="idTag amountSeparIdTag">${separId}</div>`;
}

function startEditAmountToPartyMag (magName, magId) {
  closeWinBtn.classList.add('hide');
  editMagAmountToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  magAmountPartyNameTag.innerHTML = `Editando en este evento con id : ${partyId}`;
  editMagAmountNameTag.innerHTML = `${magName} con id : <div class="idTag amountMagIdTag">${magId}</div>`;
}

function cancelEditBookAmountToParty () {
  closeWinBtn.classList.remove('hide');
  editBookAmountToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  editBookAmountToPartyForm.reset();
  bookAmountPartyNameTag.innerHTML = '';
  editBookAmountNameTag.innerHTML = '';
}

function cancelEditSeparAmountToParty () {
  closeWinBtn.classList.remove('hide');
  editSeparAmountToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  editSeparAmountToPartyForm.reset();
  separAmountPartyNameTag.innerHTML = '';
  editSeparAmountNameTag.innerHTML = '';
}

function cancelEditMagAmountToParty () {
  closeWinBtn.classList.remove('hide');
  editMagAmountToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  editMagAmountToPartyForm.reset();
  magAmountPartyNameTag.innerHTML = '';
  editMagAmountNameTag.innerHTML = '';
}

function getSendBookAmountToParty () {
  const bookIdTag = document.querySelector('.amountBookIdTag').innerHTML;
  const amount = document.getElementById('bookAmountToPartyInput').value;
  const price = document.getElementById('bookNewpriceToPartyInput').value;

  const data = {
    fs_id: String(bookIdTag),
    party_id: String(partyId),
    amount: amount === '' ? 0 : Number(amount),
    party_price: price === '' ? 0 : Number(price)
  };
  console.log(data);
  updateBookToParty(data);
}

function updateBookToParty (data) {
  fetch('/shop/data/storage/updatebook', {
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
        startAfterEditBookAmount(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getSendSeparAmountToParty () {
  const separIdTag = document.querySelector('.amountSeparIdTag').innerHTML;
  const amount = document.getElementById('separAmountToPartyInput').value;
  const price = document.getElementById('separNewpriceToPartyInput').value;

  const data = {
    fs_id: String(separIdTag),
    party_id: String(partyId),
    amount: amount === '' ? 0 : Number(amount),
    party_price: price === '' ? 0 : Number(price)
  };
  console.log(data);
  updateSeparToParty(data);
}

function updateSeparToParty (data) {
  fetch('/shop/data/storage/updatesepar', {
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
        startAfterEditSeparAmount(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getSendMagAmountToParty () {
  const magIdTag = document.querySelector('.amountMagIdTag').innerHTML;
  const amount = document.getElementById('magAmountToPartyInput').value;
  const price = document.getElementById('magNewpriceToPartyInput').value;

  const data = {
    fs_id: String(magIdTag),
    party_id: String(partyId),
    amount: amount === '' ? 0 : Number(amount),
    party_price: price === '' ? 0 : Number(price)
  };
  console.log(data);
  updateMagToParty(data);
}

function updateMagToParty (data) {
  fetch('/shop/data/storage/updatemag', {
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
        startAfterEditMagAmount(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterEditBookAmount (info) {
  closeWinBtn.classList.remove('hide');
  editBookAmountToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  editBookAmountToPartyForm.reset();
  bookAmountPartyNameTag.innerHTML = '';
  editBookAmountNameTag.innerHTML = '';
  viewStorage(partyId);
}

function startAfterEditSeparAmount (info) {
  closeWinBtn.classList.remove('hide');
  editSeparAmountToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  editSeparAmountToPartyForm.reset();
  separAmountPartyNameTag.innerHTML = '';
  editSeparAmountNameTag.innerHTML = '';
  viewStorage(partyId);
}

function startAfterEditMagAmount (info) {
  closeWinBtn.classList.remove('hide');
  editMagAmountToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  editMagAmountToPartyForm.reset();
  magAmountPartyNameTag.innerHTML = '';
  editMagAmountNameTag.innerHTML = '';
  viewStorage(partyId);
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
  addDBResults.classList.add('active');
  hideAddQueryResults();
}

function hideAllDB () {
  addDBResults.classList.remove('active');
  bookAddView.innerHTML = '';
  separAddView.innerHTML = '';
  magAddView.innerHTML = '';
}

function hideStorageDB () {
  storageDBResults.classList.remove('active');
  bookStorageView.innerHTML = '';
  separStorageView.innerHTML = '';
  magStorageView.innerHTML = '';
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

  addSeparToPartyBtn.addEventListener('click', () => startAddToPartySepar(separName, separId));
}

function showMagOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editAskElement = productCardElement.querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');
  const addMagToPartyBtn = editAskElement.querySelector('.addMagToPartyBtn');
  const magName = productCardElement.querySelector('.cardMagazineName').textContent.trim();
  const magId = event.target.closest('.product-card').querySelector('.cardMagazineEDQid').textContent.trim();

  addMagToPartyBtn.addEventListener('click', () => startAddToPartyMag(magName, magId));
}

function startAddToPartyBook (bookName, bookId) {
  closeWinBtn.classList.add('hide');
  addBookToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  bookPartyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addBookNameTag.innerHTML = `${bookName} con id : <div class="idTag bookIdTag">${bookId}</div>`;
}

function startAddToPartySepar (separName, separId) {
  closeWinBtn.classList.add('hide');
  addSeparToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  separPartyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addSeparNameTag.innerHTML = `${separName} con id : <div class="idTag separIdTag">${separId}</div>`;
}

function startAddToPartyMag (magName, magId) {
  closeWinBtn.classList.add('hide');
  addMagToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  magPartyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addMagNameTag.innerHTML = `${magName} con id : <div class="idTag magIdTag">${magId}</div>`;
}

function cancelAddBookToParty () {
  closeWinBtn.classList.remove('hide');
  addBookToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addBookToPartyForm.reset();
  bookPartyNameTag.innerHTML = '';
  addBookNameTag.innerHTML = '';
}

function cancelAddSeparToParty () {
  closeWinBtn.classList.remove('hide');
  addSeparToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addSeparToPartyForm.reset();
  separPartyNameTag.innerHTML = '';
  addSeparNameTag.innerHTML = '';
}

function cancelAddMagToParty () {
  closeWinBtn.classList.remove('hide');
  addMagToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addMagToPartyForm.reset();
  magPartyNameTag.innerHTML = '';
  addMagNameTag.innerHTML = '';
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
  closeWinBtn.classList.remove('hide');
  addBookToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addBookToPartyForm.reset();
  bookPartyNameTag.innerHTML = '';
  addBookNameTag.innerHTML = '';
}

function getSendSeparToParty () {
  const separIdTag = document.querySelector('.separIdTag').innerHTML;
  const amount = document.getElementById('separToPartyAmountInput').value;
  const price = document.getElementById('separToPartyNewpriceInput').value;

  const data = {
    fs_id: String(separIdTag),
    party_id: String(partyId),
    amount: Number(amount),
    party_price: price === '' ? 0 : Number(price)
  };
  addSeparToParty(data);
}

function addSeparToParty (data) {
  fetch('/shop/data/storage/addsepar', {
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
        startAfterAddSepar(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterAddSepar (info) {
  closeWinBtn.classList.remove('hide');
  addSeparToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addSeparToPartyForm.reset();
  separPartyNameTag.innerHTML = '';
  addSeparNameTag.innerHTML = '';
}

function getSendMagToParty () {
  const bookIdTag = document.querySelector('.magIdTag').innerHTML;
  const amount = document.getElementById('magToPartyAmountInput').value;
  const price = document.getElementById('magToPartyNewpriceInput').value;

  const data = {
    fs_id: String(bookIdTag),
    party_id: String(partyId),
    amount: Number(amount),
    party_price: price === '' ? 0 : Number(price)
  };
  addMagToParty(data);
}

function addMagToParty (data) {
  fetch('/shop/data/storage/addmagazine', {
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
        startAfterAddMagazine(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterAddMagazine (info) {
  closeWinBtn.classList.remove('hide');
  addMagToPartyScreen.classList.remove('active');
  addToPartyScreens.classList.remove('active');
  addMagToPartyForm.reset();
  magPartyNameTag.innerHTML = '';
  addMagNameTag.innerHTML = '';
}

function searchLog () {
  const query = storageSearchTypingInput.value.trim() || 'emptyquerystring';
  const inputModeInfo = storageSearchTypingInput.getAttribute('mode-info');
  console.log(inputModeInfo);

  if (query === 'emptyquerystring') {
    if (inputModeInfo === 'storage') {
      searchImg.classList.remove('active');
      viewStorage(partyId);
    }
    if (inputModeInfo === 'adding') {
      searchImg.classList.remove('active');
      showAllDB();
    }
  } else {
    if (inputModeInfo === 'storage') {
      hideStorageDB();
      hideStorageQueryResults();
      searchImg.classList.add('active');
      fetchPartyStorageQueryProducts(query);
    }
    if (inputModeInfo === 'adding') {
      hideAllDB();
      hideAddQueryResults();
      searchImg.classList.add('active');
      fetchPartyAddQueryProducts(query);
    }
  }
}

function fetchPartyAddQueryProducts (query) {
  console.log(query);
  fetch(`/shop/search/fullstorage/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      console.log(`${query} results.`);
      searchImg.classList.remove('active');
      showAddQueryResults(html);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function fetchPartyStorageQueryProducts (query) {
  console.log(query);
  fetch(`/shop/search/partystorage/${partyId}/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      console.log(`${query} results.`);
      searchImg.classList.remove('active');
      showStorageQueryResults(html);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function hideAddQueryResults () {
  addQueryResults.classList.remove('active');
  addQueryResults.innerHTML = '';
}

function hideStorageQueryResults () {
  storageQueryResults.classList.remove('active');
  storageQueryResults.innerHTML = '';
}

function showAddQueryResults (html) {
  addQueryResults.classList.add('active');
  addQueryResults.innerHTML = html;
  document.querySelectorAll('.product-toggle-btn').forEach(card => {
    card.addEventListener('click', showAddQueryProductOptions);
  });
}

function showStorageQueryResults (html) {
  storageQueryResults.classList.add('active');
  storageQueryResults.innerHTML = html;
  document.querySelectorAll('.stg-product-toggle-btn').forEach(card => {
    card.addEventListener('click', showStorageQueryProductOptions);
  });
}

function showAddQueryProductOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editMenuElement = productCardElement.querySelector('.productOptions-menu');
  editMenuElement.classList.toggle('active');

  const queryInfo = productCardElement.querySelector('.cardProductInfo').getAttribute('query-info');

  if (queryInfo === 'book') {
    const bookName = productCardElement.querySelector('.cardBookName').textContent.trim();
    const bookId = productCardElement.querySelector('.cardBookEDQid').textContent.trim();

    const addFullstorageBookToPartyBtn = editMenuElement.querySelector('.addBookToFullstorageBtn');
    addFullstorageBookToPartyBtn.addEventListener('click', () => startQueryAddToPartyBook(bookName, bookId));
  }
  if (queryInfo === 'separ') {
    const separName = productCardElement.querySelector('.cardSeparName').textContent.trim();
    const separId = productCardElement.querySelector('.cardSeparEDQid').textContent.trim();

    const addFullstorageSeparToPartyBtn = editMenuElement.querySelector('.addSeparToFullstorageBtn');
    addFullstorageSeparToPartyBtn.addEventListener('click', () => startQueryAddToPartySepar(separName, separId));
  }
  if (queryInfo === 'mag') {
    const magName = productCardElement.querySelector('.cardMagazineName').textContent.trim();
    const magId = productCardElement.querySelector('.cardMagazineEDQid').textContent.trim();

    const addFullstorageMagazineToPartyBtn = editMenuElement.querySelector('.addMagToFullstorageBtn');
    addFullstorageMagazineToPartyBtn.addEventListener('click', () => startQueryAddToPartyMag(magName, magId));
  }
}

function showStorageQueryProductOptions (event) {
  const productCardElement = event.target.closest('.product-card');
  const editMenuElement = productCardElement.querySelector('.productOptions-menu');
  editMenuElement.classList.toggle('active');

  const queryInfo = productCardElement.querySelector('.cardProductInfo').getAttribute('query-info');

  if (queryInfo === 'book') {
    const bookName = productCardElement.querySelector('.cardBookName').textContent.trim();
    const bookId = productCardElement.querySelector('.cardBookEDQid').textContent.trim();

    const editPartyBookAmountBtn = editMenuElement.querySelector('.editPartyBookAmountBtn');
    editPartyBookAmountBtn.addEventListener('click', () => startEditAmountToPartyBook(bookName, bookId));
  }
  if (queryInfo === 'separ') {
    const separName = productCardElement.querySelector('.cardSeparName').textContent.trim();
    const separId = productCardElement.querySelector('.cardSeparEDQid').textContent.trim();

    const editPartySeparAmountBtn = editMenuElement.querySelector('.editPartySeparAmountBtn');
    editPartySeparAmountBtn.addEventListener('click', () => startEditAmountToPartySepar(separName, separId));
  }
  if (queryInfo === 'mag') {
    const magName = productCardElement.querySelector('.cardMagazineName').textContent.trim();
    const magId = productCardElement.querySelector('.cardMagazineEDQid').textContent.trim();

    const editPartyMagAmountBtn = editMenuElement.querySelector('.editPartyMagAmountBtn');
    editPartyMagAmountBtn.addEventListener('click', () => startEditAmountToPartyMag(magName, magId));
  }
}

function startQueryAddToPartyBook (bookName, bookId) {
  closeWinBtn.classList.add('hide');
  addBookToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  bookPartyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addBookNameTag.innerHTML = `${bookName} con id : <div class="idTag bookIdTag">${bookId}</div>`;
}

function startQueryAddToPartySepar (separName, separId) {
  closeWinBtn.classList.add('hide');
  addSeparToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  separPartyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addSeparNameTag.innerHTML = `${separName} con id : <div class="idTag separIdTag">${separId}</div>`;
}

function startQueryAddToPartyMag (magName, magId) {
  closeWinBtn.classList.add('hide');
  addMagToPartyScreen.classList.add('active');
  addToPartyScreens.classList.add('active');
  magPartyNameTag.innerHTML = `Añadiendo a este evento con id : ${partyId}`;
  addMagNameTag.innerHTML = `${magName} con id : <div class="idTag magIdTag">${magId}</div>`;
}
