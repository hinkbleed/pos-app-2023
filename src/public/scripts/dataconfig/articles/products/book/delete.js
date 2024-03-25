import { editBookScreen, viewAllProducts } from '../script.js';

const deleteBookBtn = document.getElementById('deleteBookBtn');

const deleteBookScreen = document.getElementById('deleteBookScreen');

const cancelDeleteBookBtn = document.getElementById('cancelDeleteBookBtn');

const acceptDeleteBookBtn = document.getElementById('acceptDeleteBookBtn');

const confirmDeleteBookScreen = document.getElementById('confirmDeleteBookScreen');

const cancelConfirmdeleteBookBtn = document.getElementById('cancelConfirmdeleteBookBtn');

const acceptConfirmDeleteBookBtn = document.getElementById('acceptConfirmdeleteBookBtn');

let currentBookId = null;

deleteBookBtn.addEventListener('click', startDeleteBook);

cancelDeleteBookBtn.addEventListener('click', cancelDeleteBook);

acceptDeleteBookBtn.addEventListener('click', acceptDeleteBook);

cancelConfirmdeleteBookBtn.addEventListener('click', cancelConfirmDeleteBook);

function startDeleteBook () {
  const bookId = document.getElementById('bookIdEditInput').innerText;
  const bookTitle = document.getElementById('bookTitleEditInput').innerText;
  const bookAuthor = document.getElementById('bookAuthorEditInput').innerText;
  const bookYear = document.getElementById('bookYearEditInput').innerText;
  const bookEditorial = document.getElementById('bookEditorialEditInput').innerText;
  const bookGenres = document.getElementById('bookGenreEditInput').innerText;
  const bookBarcode = document.getElementById('bookBarcodeEditInput').innerText;
  const bookPrice = document.getElementById('bookPriceEditInput').value;
  console.log(`Recovery information: ${bookId}, ${bookTitle}, ${bookAuthor}, ${bookYear}, ${bookEditorial}, ${bookGenres}, ${bookBarcode}, ${bookPrice}`);
  deleteBookScreen.classList.add('active');

  currentBookId = bookId;

  const idLabel = document.getElementById('bookIdLabel');
  const titleLabel = document.getElementById('bookTitleLabel');
  const authorLabel = document.getElementById('bookAuthorLabel');
  const yearLabel = document.getElementById('bookYearLabel');
  const editorialLabel = document.getElementById('bookEditorialLabel');
  const genresLabel = document.getElementById('bookGenresLabel');
  const barcodeLabel = document.getElementById('bookBarcodeLabel');
  const priceLabel = document.getElementById('bookPriceLabel');

  idLabel.innerHTML = bookId;
  titleLabel.innerHTML = bookTitle;
  authorLabel.innerHTML = bookAuthor;
  yearLabel.innerHTML = bookYear;
  editorialLabel.innerHTML = bookEditorial;
  genresLabel.innerHTML = bookGenres;
  priceLabel.innerHTML = bookPrice;
  barcodeLabel.innerHTML = bookBarcode;
}

function cancelDeleteBook () {
  deleteBookScreen.classList.remove('active');
}

function acceptDeleteBook () {
  confirmDeleteBookScreen.classList.add('active');
}

function cancelConfirmDeleteBook () {
  confirmDeleteBookScreen.classList.remove('active');
  deleteBookScreen.classList.remove('active');
}

acceptConfirmDeleteBookBtn.addEventListener('click', startConfirmDeleteBook);

function startConfirmDeleteBook () {
  fetch(`/dataconfig/products/deletebook/${currentBookId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      editBookScreen.classList.remove('active');
      cancelConfirmDeleteBook();
      viewAllProducts();
    })
    .catch(error => {
      console.error('Error al eliminar el Libro:', error);
    });
}
