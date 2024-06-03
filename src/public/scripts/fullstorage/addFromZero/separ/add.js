import { askProductTypeScreen, goBackBtn } from '../script.js';

const addBtnSepar = document.getElementById('addBtnSepar');
const addSeparForm = document.getElementById('addSeparForm');
const addSeparScreen = document.getElementById('addSeparScreen');
const cancelAddSeparBtn = document.getElementById('cancelAddSeparBtn');
const addSeparToStorageScreen = document.getElementById('addSeparToStorageScreen');
const separNameTag = document.getElementById('separNameTag');
const cancelAddBookToStorageBtn = document.getElementById('cancelAddBookToStorageBtn');
const addSeparToStorageForm = document.getElementById('addSeparToStorageForm');
const askSeparToStorageScreen = document.getElementById('askSeparToStorageScreen');
const separAfterTag = document.getElementById('separAfterTag');
const addAnotherSeparBtn = document.getElementById('addAnotherSeparBtn');
const addAnotherProductFSeparBtn = document.getElementById('addAnotherProductFSeparBtn');
const getOutFSepar = document.getElementById('getOutFSepar');

addBtnSepar.addEventListener('click', startAddSepar);

cancelAddSeparBtn.addEventListener('click', cancelAddSepar);

addSeparForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewSepar();
});

cancelAddBookToStorageBtn.addEventListener('click', cancelAddingSeparToStorage);

addSeparToStorageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendSeparToStorage();
});

addAnotherSeparBtn.addEventListener('click', startAddSepar);

addAnotherProductFSeparBtn.addEventListener('click', startAgainFSepar);

getOutFSepar.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

function startAddSepar () {
  addSeparForm.reset();

  if (!askProductTypeScreen.classList.contains('hide')) {
    askProductTypeScreen.classList.add('hide');
  }
  if (askSeparToStorageScreen.classList.contains('active')) {
    askSeparToStorageScreen.classList.remove('active');
  }
  if (askSeparToStorageScreen.classList.contains('active')) {
    askSeparToStorageScreen.classList.remove('active');
  }
  if (!addSeparScreen.classList.contains('active')) {
    addSeparScreen.classList.add('active');
  }
  if (!goBackBtn.classList.contains('hide')) {
    goBackBtn.classList.add('hide');
  }
}

function cancelAddSepar () {
  addSeparScreen.classList.remove('active');
  askProductTypeScreen.classList.remove('hide');
  goBackBtn.classList.remove('hide');
}

function getSendNewSepar () {
  const name = document.getElementById('separNameInput').value;
  const material = document.getElementById('separMaterialInput').value;
  const print = document.getElementById('separPrintInput').value;
  const description = document.getElementById('separDescriptionInput').value;
  const barcode = document.getElementById('separBarcodeInput').value;
  const price = document.getElementById('separPriceInput').value;

  const data = {
    separName: name,
    separMaterial: material,
    separPrint: print,
    separDescription: description,
    separBarcode: barcode,
    separPrice: parseFloat(price)
  };
  createSepar(data);
}

function createSepar (data) {
  fetch('/dataconfig/products/addsepar', {
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
      const newSeparId = result.separ;
      showSeparToStorage(newSeparId, data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showSeparToStorage (newSeparId, data) {
  addSeparToStorageForm.reset();
  separNameTag.innerHTML = `Se añadió el producto "${data.separName}" correctamente a la base de datos.
  Ingresa los datos faltantes para añadir el separador al inventario`;
  separNameTag.dataset.id = newSeparId;
  addSeparToStorageScreen.classList.add('active');
  addSeparScreen.classList.remove('active');
}

function cancelAddingSeparToStorage () {
  askProductTypeScreen.classList.remove('hide');
  addSeparScreen.classList.remove('active');
  addSeparToStorageScreen.classList.remove('active');
  goBackBtn.classList.remove('hide');
}

function getSendSeparToStorage () {
  const amount = document.getElementById('separToStorageAmountInput').value;
  const newPrice = document.getElementById('separNewpriceInput').value;
  const separId = separNameTag.dataset.id;

  const data = {
    separfs_amount: Number(amount),
    separfs_price: Number(newPrice),
    separ_id: String(separId)
  };
  addSeparToStorage(data);
}

function addSeparToStorage (data) {
  fetch('/fullstorage/products/addsepar', {
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
  separAfterTag.innerHTML = 'El producto se ha guardado correctamente en el inventario';
  separAfterTag.dataset.id = info.separ_id;
  askSeparToStorageScreen.classList.add('active');
  addSeparScreen.classList.remove('active');
  addSeparToStorageScreen.classList.remove('active');
}

function startAgainFSepar () {
  addSeparScreen.classList.remove('active');
  addSeparToStorageScreen.classList.remove('active');
  askSeparToStorageScreen.classList.remove('active');
  askProductTypeScreen.classList.remove('hide');
  goBackBtn.classList.remove('hide');
}
