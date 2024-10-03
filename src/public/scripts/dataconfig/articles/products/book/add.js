const askBtnBook = document.getElementById('askBtnBook');
const addBookScreen = document.getElementById('addBookScreen');
const cancelAddBookBtn = document.getElementById('cancelAddBookBtn');
const bookEditorialInput = document.getElementById('bookEditorialInput');
const bookGenreInput = document.getElementById('bookGenreInput');
const bookSubgenreInput = document.getElementById('bookSubgenreInput');

const addBookForm = document.getElementById('addBookForm');

addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewBook();
});

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
      completeAddingBook();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

let addBookEditorialName;
let addBookEditorialId;

let addBookGenreName;
let addBookGenreId;
let addBookGenreAbv;

let addBookSubgenreName;
let addBookSubgenreId;
let addBookSubgenreAbv;

const editorialInfo = document.getElementById('bookEditorialInput');

editorialInfo.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addBookEditorialId = selectedOption.dataset.id;
  addBookEditorialName = selectedOption.dataset.name;
});

const genreInfo = document.getElementById('bookGenreInput');

genreInfo.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addBookGenreName = selectedOption.dataset.name;
  addBookGenreId = selectedOption.dataset.id;
  addBookGenreAbv = selectedOption.dataset.abv;
});

const bookSubgenreInfo = document.getElementById('bookSubgenreInput');

bookSubgenreInfo.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addBookSubgenreName = selectedOption.dataset.name;
  addBookSubgenreId = selectedOption.dataset.id;
  addBookSubgenreAbv = selectedOption.dataset.abv;
});

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
  console.log(data);
  createBook(data);
}

askBtnBook.addEventListener('click', showAddBookScreen);

function showAddBookScreen () {
  addBookScreen.classList.add('active');
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
}

cancelAddBookBtn.addEventListener('click', cancelAddBookScreen);

function cancelAddBookScreen () {
  addBookScreen.classList.remove('active');
}

function completeAddingBook () {
  addBookScreen.classList.remove('active');
  addBookForm.reset();
}
