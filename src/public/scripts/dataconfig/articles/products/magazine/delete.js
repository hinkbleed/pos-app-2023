import { editMagScreen, viewAllProducts } from '../script.js';

const deleteMagBtn = document.getElementById('deleteMagBtn');

const deleteMagScreen = document.getElementById('deleteMagScreen');

const cancelDeleteMagBtn = document.getElementById('cancelDeleteMagBtn');

const acceptDeleteMagBtn = document.getElementById('acceptDeleteMagBtn');

const confirmDeleteMagScreen = document.getElementById('confirmDeleteMagScreen');

const cancelConfirmDeleteMagBtn = document.getElementById('cancelConfirmDeleteMagBtn');

const acceptConfirmDeleteMagBtn = document.getElementById('acceptConfirmDeleteMagBtn');

let currentMagId = null;

deleteMagBtn.addEventListener('click', startDeleteMag);

cancelDeleteMagBtn.addEventListener('click', cancelDeleteMag);

acceptDeleteMagBtn.addEventListener('click', acceptDeleteMag);

cancelConfirmDeleteMagBtn.addEventListener('click', cancelConfirmDeleteMag);

function startDeleteMag () {
  const magId = document.getElementById('magIdEditInput').innerText;
  const magTitle = document.getElementById('magTitleEditInput').innerText;
  const magAuthor = document.getElementById('magAuthorEditInput').innerText;
  const magYear = document.getElementById('magYearEditInput').innerText;
  const magEditorial = document.getElementById('magEditorialEditInput').innerText;
  const magSubgenre = document.getElementById('magSubgenreEditInput').innerText;
  const magBarcode = document.getElementById('magBarcodeLabel').value;
  const magPrice = document.getElementById('magPriceEditInput').value;
  console.log(`Recovery information: ${magId}, ${magTitle}, ${magAuthor}, ${magYear}, ${magEditorial}, ${magSubgenre}, ${magBarcode} ${magPrice}`);
  deleteMagScreen.classList.add('active');

  currentMagId = magId;

  const idLabel = document.getElementById('magIdLabel');
  const titleLabel = document.getElementById('magTitleLabel');
  const authorLabel = document.getElementById('magAuthorLabel');
  const yearLabel = document.getElementById('magYearLabel');
  const editorialLabel = document.getElementById('magEditorialLabel');
  const subgenreLabel = document.getElementById('magSubgenreLabel');
  const barcodeLabel = document.getElementById('magBarcodeLabel');
  const priceLabel = document.getElementById('magPriceLabel');

  idLabel.innerHTML = magId;
  titleLabel.innerHTML = magTitle;
  authorLabel.innerHTML = magAuthor;
  yearLabel.innerHTML = magYear;
  editorialLabel.innerHTML = magEditorial;
  subgenreLabel.innerHTML = magSubgenre;
  barcodeLabel.innerHTML = magBarcode;
  priceLabel.innerHTML = magPrice;
}

function cancelDeleteMag () {
  deleteMagScreen.classList.remove('active');
}

function acceptDeleteMag () {
  confirmDeleteMagScreen.classList.add('active');
}

function cancelConfirmDeleteMag () {
  confirmDeleteMagScreen.classList.remove('active');
  deleteMagScreen.classList.remove('active');
}

acceptConfirmDeleteMagBtn.addEventListener('click', startConfirmDeleteMag);

function startConfirmDeleteMag () {
  fetch(`/dataconfig/products/deletemag/${currentMagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      editMagScreen.classList.remove('active');
      cancelConfirmDeleteMag();
      viewAllProducts();
    })
    .catch(error => {
      console.error('Error al eliminar el Separador:', error);
    });
}
