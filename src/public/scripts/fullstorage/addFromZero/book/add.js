import { askProductTypeScreen, goBackBtnFZ } from '../script.js';

const addBtnBook = document.getElementById('addBtnBook');
const addBookForm = document.getElementById('addBookForm');
const addBookScreen = document.getElementById('addBookScreen');
const cancelAddBookBtn = document.getElementById('cancelAddBookBtn');
const bookEditorialInput = document.getElementById('bookEditorialInput');
const bookGenreInput = document.getElementById('bookGenreInput');
const bookSubgenreInput = document.getElementById('bookSubgenreInput');
const addBookToStorageScreen = document.getElementById('addBookToStorageScreen');
const bookNameTag = document.getElementById('bookNameTag');
const cancelAddBookToStorageBtn = document.getElementById('cancelAddBookToStorageBtn');
const addBookToStorageForm = document.getElementById('addBookToStorageForm');
const askBookToStorageScreen = document.getElementById('askBookToStorageScreen');
const bookAfterTag = document.getElementById('bookAfterTag');
const addAnotherBookBtn = document.getElementById('addAnotherBookBtn');
const addVariableBookBtn = document.getElementById('addVariableBookBtn');
const addAnotherProductFBookBtn = document.getElementById('addAnotherProductFBookBtn');
const getOutFBook = document.getElementById('getOutFBook');

let addBookEditorialName;
let addBookEditorialId;
let addBookGenreName;
let addBookGenreId;
let addBookGenreAbv;
let addBookSubgenreName;
let addBookSubgenreId;
let addBookSubgenreAbv;

addBtnBook.addEventListener('click', startAddBook);

cancelAddBookBtn.addEventListener('click', cancelAddBook);

addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewBook();
});

cancelAddBookToStorageBtn.addEventListener('click', cancelAddingBookToStorage);

addBookToStorageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendBookToStorage();
});

addAnotherBookBtn.addEventListener('click', startAddBook);

addVariableBookBtn.addEventListener('click', addVariableBook);

addAnotherProductFBookBtn.addEventListener('click', startAgainFBook);

getOutFBook.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

bookEditorialInput.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addBookEditorialId = selectedOption.dataset.id;
  addBookEditorialName = selectedOption.dataset.name;
});

bookGenreInput.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addBookGenreName = selectedOption.dataset.name;
  addBookGenreId = selectedOption.dataset.id;
  addBookGenreAbv = selectedOption.dataset.abv;
});

bookSubgenreInput.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addBookSubgenreName = selectedOption.dataset.name;
  addBookSubgenreId = selectedOption.dataset.id;
  addBookSubgenreAbv = selectedOption.dataset.abv;
});

function startAddBook () {
  addBookForm.reset();
  fetch('/dataconfig/editorials/alltoproducts')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      bookEditorialInput.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch('/dataconfig/genres/alltoproducts')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      bookGenreInput.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch('/dataconfig/subgenres/alltoproducts')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      bookSubgenreInput.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
  if (!askProductTypeScreen.classList.contains('hide')) {
    askProductTypeScreen.classList.add('hide');
  }
  if (askBookToStorageScreen.classList.contains('active')) {
    askBookToStorageScreen.classList.remove('active');
  }
  if (askBookToStorageScreen.classList.contains('active')) {
    askBookToStorageScreen.classList.remove('active');
  }
  if (!addBookScreen.classList.contains('active')) {
    addBookScreen.classList.add('active');
  }
  if (!goBackBtnFZ.classList.contains('hide')) {
    goBackBtnFZ.classList.add('hide');
  }
}

function cancelAddBook () {
  addBookScreen.classList.remove('active');
  askProductTypeScreen.classList.remove('hide');
  goBackBtnFZ.classList.remove('hide');
}

function getSendNewBook () {
  const name = document.getElementById('bookNameInput').value;
  const author = document.getElementById('bookAuthorInput').value;
  const year = document.getElementById('bookYearInput').value;
  const editorialName = addBookEditorialName;
  const editorialId = addBookEditorialId;
  const barcode = document.getElementById('bookBarcodeInput').value;
  const price = document.getElementById('bookPriceInput').value;
  const genName = addBookGenreName;
  const genId = addBookGenreId;
  const genAbv = addBookGenreAbv;
  const subgenName = addBookSubgenreName;
  const subgenId = addBookSubgenreId;
  const subgenAbv = addBookSubgenreAbv;

  const data = {
    bookName: name,
    bookAuthor: author,
    bookYear: year,
    bookEditorialName: editorialName,
    bookEditorialId: editorialId,
    bookBarcode: barcode,
    bookPrice: parseFloat(price),
    bookGenreName: genName,
    bookGenreId: genId,
    bookGenreAbv: genAbv,
    bookSubgenreName: subgenName,
    bookSubgenreId: subgenId,
    bookSubgenreAbv: subgenAbv
  };
  createBook(data);
}

function createBook (data) {
  fetch('/dataconfig/products/addbook', {
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

      return response.json();
    })
    .then(result => {
      const bookId = result.book;
      console.log(bookId, data);
      showAddBookToFullstorage(bookId, data); // Usa el ID como sea necesario
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showAddBookToFullstorage (bookId, data) {
  addBookToStorageForm.reset();
  const bookToStorageKindInput = document.getElementById('bookToStorageKindInput');
  bookToStorageKindInput.innerHTML = `
  <option value="Linea">Línea</option>
  <option value="Outlet">Outlet</option>`;
  bookNameTag.innerHTML = `Se ha añadido ${data.bookName} correctamente a la base de datos.
  Ingresa los datos faltantes para añadirlo al inventario`;
  bookNameTag.dataset.id = bookId;
  addBookScreen.classList.remove('active');
  addBookToStorageScreen.classList.add('active');
}

function cancelAddingBookToStorage () {
  askProductTypeScreen.classList.remove('hide');
  addBookScreen.classList.remove('active');
  addBookToStorageScreen.classList.remove('active');
  goBackBtnFZ.classList.remove('hide');
}

function getSendBookToStorage () {
  const kindName = document.getElementById('bookToStorageKindInput').value;
  const amount = document.getElementById('bookToStorageAmountInput').value;
  const newPrice = document.getElementById('bookNewpriceInput').value;
  const bookId = document.getElementById('bookNameTag');
  console.log(newPrice);

  const data = {
    bookfs_kind: String(kindName),
    bookfs_amount: Number(amount),
    bookfs_price: newPrice === '' ? 0 : Number(newPrice),
    book_id: String(bookId.dataset.id)
  };
  addBookToStorage(data);
}

function addBookToStorage (data) {
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
  askBookToStorageScreen.classList.add('active');
  addBookScreen.classList.remove('active');
  addBookToStorageScreen.classList.remove('active');
}

function addVariableBook () {
  const id = bookAfterTag.dataset.id;
  bookNameTag.dataset.id = id;
  bookNameTag.innerHTML = 'Ingresa los datos faltantes para añadir el libro al inventario';
  const bookToStorageKindInput = document.getElementById('bookToStorageKindInput');
  if (bookAfterTag.dataset.kind === 'Linea') {
    bookToStorageKindInput.innerHTML = `
      <option value="Outlet">Outlet</option>
      <option value="Linea">Línea</option>`;
  } else {
    bookToStorageKindInput.innerHTML = `
    <option value="Linea">Línea</option>
    <option value="Outlet">Outlet</option>`;
  }
  addBookToStorageForm.reset();
  askBookToStorageScreen.classList.remove('active');
  addBookToStorageScreen.classList.add('active');
}

function startAgainFBook () {
  addBookScreen.classList.remove('active');
  addBookToStorageScreen.classList.remove('active');
  askBookToStorageScreen.classList.remove('active');
  askProductTypeScreen.classList.remove('hide');
  goBackBtnFZ.classList.remove('hide');
}
