import { screenBox } from '../interface/script.js';

const partyId = screenBox.getAttribute('id-info');
const ticketRows = document.querySelectorAll('.ticketRow');
const posSearchTypingInput = document.getElementById('posSearchTypingInput');

const itemBoxAdvertise = document.getElementById('itemBoxAdvertise');
const posInfoBox = document.getElementById('posInfoBox');
const posQueryResults = document.getElementById('posQueryResults');
const posResultsBox = document.getElementById('posResultsBox');

let typingTimer;
posSearchTypingInput.addEventListener('input', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    posSearchLog();
  }, 800);
});

ticketRows.forEach(function (row) {
  row.addEventListener('click', function () {
    ticketRows.forEach(function (row) {
      row.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

function posSearchLog () {
  const query = posSearchTypingInput.value.trim() || 'emptyquerystring';
  console.log(query);

  if (query === 'emptyquerystring') {
    itemBoxAdvertise.classList.add('active');
    posInfoBox.classList.remove('active');
    posQueryResults.classList.remove('active');
  } else {
    itemBoxAdvertise.classList.remove('active');
    posInfoBox.classList.remove('active');
    posQueryResults.classList.remove('active');
    fetchPosInputProducts(query);
  }
}

function fetchPosInputProducts (query) {
  console.log(query);
  fetch(`/shop/pos/search/${partyId}/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      console.log(`${query} results.`);
      showPosQueryResults(html);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function showPosQueryResults (html) {
  console.log(html);
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = html;
  const productCards = tempContainer.querySelectorAll('.posProduct-card');
  const numberOfProductCards = productCards.length;
  console.log(`Number of .posProduct-card elements: ${numberOfProductCards}`);
  posResultsBox.innerHTML = html;
  posQueryResults.classList.add('active');

  if (numberOfProductCards === 1) {
    activePosOneProductFunctions();
  } else if (numberOfProductCards > 1) {
    activePosAddingFunctions();
  } else {
    posResultsBox.innerHTML = '<div class="noresult">No hay productos asignados a este evento para tu búsqueda</div>';
    posQueryResults.classList.add('active');
  }
}

function activePosAddingFunctions () {
  const posProductCard = document.querySelectorAll('.posProduct-card');
  posProductCard.forEach(card => {
    card.addEventListener('click', function (e) {
      getSendProductToListBox(e);
    });
  });
}

function activePosOneProductFunctions () {
  const posProductCard = document.querySelectorAll('.posProduct-card');
  const firstCard = posProductCard[0];
  firstCard.addEventListener('click', function (e) {
    getSendProductToListBox(e);
  });
  firstCard.click();
}

function getSendProductToListBox (event) {
  console.log('getting this card');
  const productCardElement = event.target.closest('.posProduct-card');
  const typeInfo = productCardElement.getAttribute('type-info');

  if (typeInfo === 'book') {
    const bookName = productCardElement.querySelector('.productName').textContent.trim();
    const bookInfo = productCardElement.querySelector('.productInfo').textContent.trim();
    const bookKind = productCardElement.querySelector('.productKind').textContent.trim();
    const bookId = productCardElement.querySelector('.productId').textContent.trim();
    const bookAmount = productCardElement.querySelector('.productAmount').textContent.trim();
    const bookPrice = productCardElement.querySelector('.productPrice').textContent.trim();

    const data = {
      book_name: bookName,
      book_info: bookInfo,
      book_kind: bookKind,
      book_id: bookId,
      book_amount: bookAmount,
      book_price: bookPrice
    };
    console.log(data);
    addBookToListBox(data);
  }

  if (typeInfo === 'separator') {
    const separName = productCardElement.querySelector('.productName').textContent.trim();
    const separInfo = productCardElement.querySelector('.productInfo').textContent.trim();
    const separId = productCardElement.querySelector('.productId').textContent.trim();
    const separAmount = productCardElement.querySelector('.productAmount').textContent.trim();
    const separPrice = productCardElement.querySelector('.productPrice').textContent.trim();

    const data = {
      separ_name: separName,
      separ_info: separInfo,
      separ_id: separId,
      separ_amount: separAmount,
      separ_price: separPrice
    };
    console.log(data);
    //  addProductToListBox(data);
  }

  if (typeInfo === 'magazine') {
    const magName = productCardElement.querySelector('.productName').textContent.trim();
    const magInfo = productCardElement.querySelector('.productInfo').textContent.trim();
    const magId = productCardElement.querySelector('.productId').textContent.trim();
    const magAmount = productCardElement.querySelector('.productAmount').textContent.trim();
    const magPrice = productCardElement.querySelector('.productPrice').textContent.trim();

    const data = {
      mag_name: magName,
      mag_info: magInfo,
      mag_id: magId,
      mag_amount: magAmount,
      mag_price: magPrice
    };
    console.log(data);
    //  addProductToListBox(data);
  }
}

function addBookToListBox (data) {
  console.log(`adding ${JSON.stringify(data)}`);
}
