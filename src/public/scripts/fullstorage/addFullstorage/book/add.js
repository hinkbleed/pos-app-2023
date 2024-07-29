import { addFullstorageView, goBackBtnFDB, headerView } from '../script.js';

export const addBookToFullstorageForm = document.getElementById('addBookToFullstorageForm');

const addBookToFullstorageScreen = document.getElementById('addBookToFullstorageScreen');
const bookNameTag = document.getElementById('bookNameTag');
const cancelAddBookToFullstorageBtn = document.getElementById('cancelAddBookToFullstorageBtn');
const askBookToFullstorageScreen = document.getElementById('askBookToFullstorageScreen');
const bookAfterTag = document.getElementById('bookAfterTag');
const addAnotherBookBtn = document.getElementById('addAnotherBookBtn');
const addVariableBookBtn = document.getElementById('addVariableBookBtn');
const getOutFBook = document.getElementById('getOutFBook');

cancelAddBookToFullstorageBtn.addEventListener('click', cancelAddBookToFullstorage);

addBookToFullstorageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendBookToFullstorage();
});
addAnotherBookBtn.addEventListener('click', startAgain);

addVariableBookBtn.addEventListener('click', addVariableBook);

getOutFBook.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

export function fillAddBookToFullstorageForm (bookId, bookName) {
  console.log(bookId, bookName);
  const bookToFullstorageKindInput = document.getElementById('bookToFullstorageKindInput');
  bookToFullstorageKindInput.innerHTML = `
  <option value="Linea">Línea</option>
  <option value="Outlet">Outlet</option>`;
  bookNameTag.innerHTML = `
  Ingresa los datos faltantes de ${bookName} para añadirlo al inventario, si el precio no ha cambiado déjalo en blanco`;
  bookNameTag.dataset.id = bookId;
  addFullstorageView.classList.remove('active');
  headerView.classList.remove('active');
  goBackBtnFDB.classList.remove('active');
  addBookToFullstorageScreen.classList.add('active');
}

function cancelAddBookToFullstorage () {
  addBookToFullstorageScreen.classList.remove('active');
  addFullstorageView.classList.add('active');
  headerView.classList.add('active');
  goBackBtnFDB.classList.add('active');
}

function getSendBookToFullstorage () {
  const kindName = document.getElementById('bookToFullstorageKindInput').value;
  const amount = document.getElementById('bookToFullstorageAmountInput').value;
  const newPrice = document.getElementById('bookNewpriceInput').value;
  const bookId = document.getElementById('bookNameTag');

  const data = {
    bookfs_kind: String(kindName),
    bookfs_amount: Number(amount),
    bookfs_price: newPrice === '' ? 0 : Number(newPrice),
    book_id: String(bookId.dataset.id)
  };
  addBookToFullstorage(data);
}

function addBookToFullstorage (data) {
  fetch('/fullstorage/products/addbook', {
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
  addVariableBookBtn.classList.remove('hide');
  bookAfterTag.innerHTML = 'El producto se ha guardado correctamente en el inventario';
  bookAfterTag.dataset.id = info.book_id;
  bookAfterTag.dataset.kind = info.bookfs_kind;
  addBookToFullstorageScreen.classList.remove('active');
  askBookToFullstorageScreen.classList.add('active');
}

function addVariableBook () {
  const id = bookAfterTag.dataset.id;
  bookNameTag.dataset.id = id;
  bookNameTag.innerHTML = 'Ingresa los datos faltantes para añadir el libro al inventario';
  const bookToFullstorageKindInput = document.getElementById('bookToFullstorageKindInput');
  if (bookAfterTag.dataset.kind === 'Linea') {
    bookToFullstorageKindInput.innerHTML = `
    <option value="Outlet">Outlet</option>
    <option value="Linea">Línea</option>`;
  } else {
    bookToFullstorageKindInput.innerHTML = `
    <option value="Linea">Línea</option>
    <option value="Outlet">Outlet</option>`;
  }
  addBookToFullstorageForm.reset();
  askBookToFullstorageScreen.classList.remove('active');
  addBookToFullstorageScreen.classList.add('active');
}

function startAgain () {
  askBookToFullstorageScreen.classList.remove('active');
  addFullstorageView.classList.add('active');
  headerView.classList.add('active');
  goBackBtnFDB.classList.add('active');
}
