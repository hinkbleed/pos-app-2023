import { editSeparScreen, viewAllProducts } from '../script.js';

const deleteSeparBtn = document.getElementById('deleteSeparBtn');

const deleteSeparScreen = document.getElementById('deleteSeparScreen');

const cancelDeleteSeparBtn = document.getElementById('cancelDeleteSeparBtn');

const acceptDeleteSeparBtn = document.getElementById('acceptDeleteSeparBtn');

const confirmDeleteSeparScreen = document.getElementById('confirmDeleteSeparScreen');

const cancelConfirmDeleteSeparBtn = document.getElementById('cancelConfirmDeleteSeparBtn');

const acceptConfirmDeleteSeparBtn = document.getElementById('acceptConfirmDeleteSeparBtn');

let currentSeparId = null;

deleteSeparBtn.addEventListener('click', startDeleteSepar);

cancelDeleteSeparBtn.addEventListener('click', cancelDeleteSepar);

acceptDeleteSeparBtn.addEventListener('click', acceptDeleteSepar);

cancelConfirmDeleteSeparBtn.addEventListener('click', cancelConfirmDeleteSepar);

function startDeleteSepar () {
  const separId = document.getElementById('separIdEditInput').innerText;
  const separName = document.getElementById('separNameEditInput').innerText;
  const separMaterial = document.getElementById('separMaterialEditInput').innerText;
  const separPrint = document.getElementById('separPrintEditInput').innerText;
  const separDescription = document.getElementById('separDescriptionEditInput').innerText;
  const separBarcode = document.getElementById('separBarcodeEditInput').innerText;
  const separPrice = document.getElementById('separPriceEditInput').value;
  console.log(`Recovery information: ${separId}, ${separName}, ${separMaterial}, ${separPrint}, ${separDescription}, ${separBarcode}, ${separPrice}`);
  deleteSeparScreen.classList.add('active');

  currentSeparId = separId;

  const idLabel = document.getElementById('separIdLabel');
  const nameLabel = document.getElementById('separNameLabel');
  const materialLabel = document.getElementById('separMaterialLabel');
  const printLabel = document.getElementById('separPrintLabel');
  const descriptionLabel = document.getElementById('separDescriptionLabel');
  const barcodeLabel = document.getElementById('separBarcodeLabel');
  const priceLabel = document.getElementById('separPriceLabel');

  idLabel.innerHTML = separId;
  nameLabel.innerHTML = separName;
  materialLabel.innerHTML = separMaterial;
  printLabel.innerHTML = separPrint;
  descriptionLabel.innerHTML = separDescription;
  priceLabel.innerHTML = separPrice;
  barcodeLabel.innerHTML = separBarcode;
}

function cancelDeleteSepar () {
  deleteSeparScreen.classList.remove('active');
}

function acceptDeleteSepar () {
  confirmDeleteSeparScreen.classList.add('active');
}

function cancelConfirmDeleteSepar () {
  confirmDeleteSeparScreen.classList.remove('active');
  deleteSeparScreen.classList.remove('active');
}

acceptConfirmDeleteSeparBtn.addEventListener('click', startConfirmDeleteSepar);

function startConfirmDeleteSepar () {
  fetch(`/dataconfig/products/deletesepar/${currentSeparId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      editSeparScreen.classList.remove('active');
      cancelConfirmDeleteSepar();
      viewAllProducts();
    })
    .catch(error => {
      console.error('Error al eliminar el Separador:', error);
    });
}
