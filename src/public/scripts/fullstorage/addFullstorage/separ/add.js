import { addFullstorageView, goBackBtnFDB, headerView } from '../script.js';

export const addSeparToFullstorageForm = document.getElementById('addSeparToFullstorageForm');

const addSeparToFullstorageScreen = document.getElementById('addSeparToFullstorageScreen');
const separNameTag = document.getElementById('separNameTag');
const cancelAddSeparToFullstorageBtn = document.getElementById('cancelAddSeparToFullstorageBtn');
const askSeparToFullstorageScreen = document.getElementById('askSeparToFullstorageScreen');
const separAfterTag = document.getElementById('separAfterTag');
const addAnotherSeparBtn = document.getElementById('addAnotherSeparBtn');
const addSameSeparBtn = document.getElementById('addSameSeparBtn');
const getOutFSepar = document.getElementById('getOutFSepar');

cancelAddSeparToFullstorageBtn.addEventListener('click', cancelAddSeparToFullstorage);

addSeparToFullstorageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendSeparToFullstorage();
});

addAnotherSeparBtn.addEventListener('click', startAgain);

addSameSeparBtn.addEventListener('click', addSameSepar);

getOutFSepar.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

export function fillAddSeparToFullstorageForm (separId, separName) {
  console.log(separId, separName);
  separNameTag.innerHTML = `
  Ingresa una cantidad de ${separName} para añadirlo al inventario, si el precio no ha cambiado déjalo en blanco`;
  separNameTag.dataset.id = separId;
  addFullstorageView.classList.remove('active');
  headerView.classList.remove('active');
  goBackBtnFDB.classList.remove('active');
  addSeparToFullstorageScreen.classList.add('active');
}

function cancelAddSeparToFullstorage () {
  addSeparToFullstorageScreen.classList.remove('active');
  addFullstorageView.classList.add('active');
  headerView.classList.add('active');
  goBackBtnFDB.classList.add('active');
}

function getSendSeparToFullstorage () {
  const amount = document.getElementById('separToFullstorageAmountInput').value;
  const newPrice = document.getElementById('separNewpriceInput').value;
  const separId = document.getElementById('separNameTag');

  const data = {
    separfs_amount: Number(amount),
    separfs_price: newPrice === '' ? 0 : Number(newPrice),
    separ_id: String(separId.dataset.id)
  };
  console.log(data);
  addSeparToFullstorage(data);
}

function addSeparToFullstorage (data) {
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
  separAfterTag.innerHTML = 'El separador se ha guardado correctamente en el inventario';
  separAfterTag.dataset.id = info.separ_id;
  addSeparToFullstorageScreen.classList.remove('active');
  askSeparToFullstorageScreen.classList.add('active');
}

function addSameSepar () {
  const id = separAfterTag.dataset.id;
  separNameTag.dataset.id = id;
  separNameTag.innerHTML = 'Ingresa los datos faltantes para añadir el separador al inventario';
  addSeparToFullstorageForm.reset();
  askSeparToFullstorageScreen.classList.remove('active');
  addSeparToFullstorageScreen.classList.add('active');
}

function startAgain () {
  askSeparToFullstorageScreen.classList.remove('active');
  addFullstorageView.classList.add('active');
  headerView.classList.add('active');
  goBackBtnFDB.classList.add('active');
}
