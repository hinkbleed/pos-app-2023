const dataconfigAddProduct = document.getElementById('dataconfigAddBtn');
const askScreen = document.getElementById('askScreen');

const cancelType = document.getElementById('cancelType');

export const editBookScreen = document.getElementById('editBookScreen');

export const editSeparScreen = document.getElementById('editSeparScreen');

export const editMagScreen = document.getElementById('editMagScreen');

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startProductsView);

dataconfigAddProduct.addEventListener('click', showAskScreen);

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

cancelType.addEventListener('click', finishAskScreen);

export function viewAllProducts () {
  const configProdBox = document.getElementById('configProdBox');
  fetch('/dataconfig/products/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configProdBox.innerHTML = html;

      document.querySelectorAll('.book-toggle-btn').forEach(card => {
        card.addEventListener('click', showBookOptions);
      });
      document.querySelectorAll('.separ-toggle-btn').forEach(card => {
        card.addEventListener('click', showSeparOptions);
      });
      document.querySelectorAll('.mag-toggle-btn').forEach(card => {
        card.addEventListener('click', showMagOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function showBookOptions (event) {
  const editAskElement = event.target.closest('.product-card').querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');

  const editBookBtn = editAskElement.querySelector('.editBookBtn');
  const addBookToPartyBtn = editAskElement.querySelector('.addBookToPartyBtn');

  editBookBtn.addEventListener('click', startEditBook);
  addBookToPartyBtn.addEventListener('click', startAddToPartyBook);
}

function showSeparOptions (event) {
  const editAskElement = event.target.closest('.product-card').querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');

  const editSeparBtn = editAskElement.querySelector('.editSeparBtn');
  const addSeparToPartyBtn = editAskElement.querySelector('.addSeparToPartyBtn');

  editSeparBtn.addEventListener('click', startEditSepar);
  addSeparToPartyBtn.addEventListener('click', startAddToPartySepar);
}

function showMagOptions (event) {
  const editAskElement = event.target.closest('.product-card').querySelector('.productOptions-ask');
  editAskElement.classList.toggle('active');

  const editMagBtn = editAskElement.querySelector('.editMagBtn');
  const addMagToPartyBtn = editAskElement.querySelector('.addMagToPartyBtn');

  editMagBtn.addEventListener('click', startEditMag);
  addMagToPartyBtn.addEventListener('click', startAddToPartyMag);
}

function startEditBook (event) {
  const bookId = event.target.closest('.product-card').querySelector('.cardBookEDQid').textContent;
  const bookName = event.target.closest('.product-card').querySelector('.cardBookName').textContent;
  const bookAuthor = event.target.closest('.product-card').querySelector('.cardBookAuthor').textContent;
  const bookYear = event.target.closest('.product-card').querySelector('.cardBookYear').textContent;
  const bookEditorial = event.target.closest('.product-card').querySelector('.cardBookEditorial').textContent;
  const bookGenres = event.target.closest('.product-card').querySelector('.cardBookGenres').textContent;
  const bookPrice = event.target.closest('.product-card').querySelector('.cardBookPrice').textContent;
  const bookPriceValue = bookPrice.replace(/[^\d.]/g, '');

  const bookBarcode = event.target.closest('.product-card').querySelector('.cardBookBarcode').textContent;

  console.log(`Recovery information: ${bookId}, ${bookName}, ${bookAuthor}, ${bookYear}, ${bookEditorial}, ${bookGenres}, ${bookBarcode}, ${bookPrice}`);
  document.getElementById('editBookTag').innerHTML = `
    <div>Editar información de: <strong>${bookName}</strong></div>
    <div>con ID: <strong id="bookIdEditInput">${bookId}</strong></div>`;

  document.getElementById('bookBarcodeEditInput').innerHTML = `
  ${bookBarcode}`;

  document.getElementById('bookTitleEditInput').innerHTML = `
  ${bookName}`;

  document.getElementById('bookAuthorEditInput').innerHTML = `
  ${bookAuthor}`;

  document.getElementById('bookYearEditInput').innerHTML = `
  ${bookYear}`;

  document.getElementById('bookEditorialEditInput').innerHTML = `
  ${bookEditorial}`;

  document.getElementById('bookGenreEditInput').innerHTML = `
  ${bookGenres}`;
  console.log(bookPrice, bookPriceValue);

  document.getElementById('bookPriceEditInput').value = `${bookPriceValue}`;

  editBookScreen.classList.add('active');
}

function startAddToPartyBook () {
  console.log('agregando libro');
}

function startEditSepar (event) {
  console.log('editando separador');
  const separId = event.target.closest('.product-card').querySelector('.cardSeparEDQid').textContent;
  const separName = event.target.closest('.product-card').querySelector('.cardSeparName').textContent;
  const separMaterial = event.target.closest('.product-card').querySelector('.cardSeparMaterial').textContent;
  const separPrint = event.target.closest('.product-card').querySelector('.cardSeparPrint').textContent;
  const separDescription = event.target.closest('.product-card').querySelector('.cardSeparDescription').textContent;
  const separBarcode = event.target.closest('.product-card').querySelector('.cardSeparBarcode').textContent;
  const separPrice = event.target.closest('.product-card').querySelector('.cardSeparPrice').textContent;
  const separPriceValue = separPrice.replace(/[^\d.]/g, '');

  console.log(`Recovery information: ${separId}, ${separName}, ${separMaterial}, ${separPrint}, ${separDescription}, ${separBarcode}, ${separPrice}`);
  document.getElementById('editSeparTag').innerHTML = `
    <div>Editar información de: <strong>${separName}</strong></div>
    <div>con ID: <strong id="separIdEditInput">${separId}</strong></div>`;

  document.getElementById('separBarcodeEditInput').innerHTML = `
    ${separBarcode}`;

  document.getElementById('separNameEditInput').innerHTML = `
    ${separName}`;

  document.getElementById('separMaterialEditInput').innerHTML = `
    ${separMaterial}`;

  document.getElementById('separPrintEditInput').innerHTML = `
    ${separPrint}`;

  document.getElementById('separDescriptionEditInput').value = `
    ${separDescription}`;

  document.getElementById('separPriceEditInput').value = `${separPriceValue}`;

  editSeparScreen.classList.add('active');
}

function startAddToPartySepar () {
  console.log('añadiendo separador');
}

function startEditMag (event) {
  const magId = event.target.closest('.product-card').querySelector('.cardMagazineEDQid').textContent;
  const magName = event.target.closest('.product-card').querySelector('.cardMagazineName').textContent;
  const magAuthor = event.target.closest('.product-card').querySelector('.cardMagazineAuthor').textContent;
  const magYear = event.target.closest('.product-card').querySelector('.cardMagazineYear').textContent;
  const magEditorial = event.target.closest('.product-card').querySelector('.cardMagazineEditorial').textContent;
  const magSubgenre = event.target.closest('.product-card').querySelector('.cardMagazineSubgenre').textContent;
  const magPrice = event.target.closest('.product-card').querySelector('.cardMagazinePrice').textContent;

  const magPriceValue = magPrice.replace(/[^\d.]/g, '');
  const magBarcode = event.target.closest('.product-card').querySelector('.cardMagazineBarcode').textContent;

  console.log(`Recovery information: ${magId}, ${magName}, ${magAuthor}, ${magYear}, ${magEditorial}, ${magSubgenre}, ${magBarcode}, ${magPrice}`);
  document.getElementById('editMagTag').innerHTML = `
    <div>Editar información de: <strong>${magName}</strong></div>
    <div>con ID: <strong id="magIdEditInput">${magId}</strong></div>`;

  document.getElementById('magBarcodeEditInput').innerHTML = `
    ${magBarcode}`;

  document.getElementById('magTitleEditInput').innerHTML = `
    ${magName}`;

  document.getElementById('magAuthorEditInput').innerHTML = `
    ${magAuthor}`;

  document.getElementById('magYearEditInput').innerHTML = `
    ${magYear}`;

  document.getElementById('magEditorialEditInput').innerHTML = `
    ${magEditorial}`;

  document.getElementById('magSubgenreEditInput').innerHTML = `
    ${magSubgenre}`;
  console.log(magPrice, magPriceValue);

  document.getElementById('magPriceEditInput').value = `${magPriceValue}`;

  editMagScreen.classList.add('active');
}

function startAddToPartyMag () {
  console.log('añadiendo revista');
}

function startProductsView () {
  viewAllProducts();
}

function showAskScreen () {
  askScreen.classList.add('active');
}

function finishAskScreen () {
  askScreen.classList.remove('active');
}
