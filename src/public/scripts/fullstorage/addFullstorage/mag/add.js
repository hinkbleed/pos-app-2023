import { addFullstorageView, goBackBtnFDB, headerView } from '../script.js';

export const addMagToFullstorageForm = document.getElementById('addMagToFullstorageForm');

const addMagToFullstorageScreen = document.getElementById('addMagToFullstorageScreen');
const magNameTag = document.getElementById('magNameTag');
const cancelAddMagToFullstorageBtn = document.getElementById('cancelAddMagToFullstorageBtn');
const askMagToFullstorageScreen = document.getElementById('askMagToFullstorageScreen');
const magAfterTag = document.getElementById('magAfterTag');
const addAnotherMagBtn = document.getElementById('addAnotherMagBtn');
const addSameMagBtn = document.getElementById('addSameMagBtn');
const getOutFMag = document.getElementById('getOutFMag');

cancelAddMagToFullstorageBtn.addEventListener('click', cancelAddMagToFullstorage);

addMagToFullstorageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendMagToFullstorage();
});

addAnotherMagBtn.addEventListener('click', startAgain);

addSameMagBtn.addEventListener('click', addSameMag);

getOutFMag.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

export function fillAddMagToFullstorageForm (magId, magName) {
  console.log(magId, magName);
  magNameTag.innerHTML = `
  Ingresa la cantidad de ${magName} para añadirlo al inventario, si el precio no ha cambiado déjalo en blanco`;
  magNameTag.dataset.id = magId;
  addFullstorageView.classList.remove('active');
  headerView.classList.remove('active');
  goBackBtnFDB.classList.remove('active');
  addMagToFullstorageScreen.classList.add('active');
}

function cancelAddMagToFullstorage () {
  addMagToFullstorageScreen.classList.remove('active');
  addFullstorageView.classList.add('active');
  headerView.classList.add('active');
  goBackBtnFDB.classList.add('active');
}

function getSendMagToFullstorage () {
  const amount = document.getElementById('magToFullstorageAmountInput').value;
  const newPrice = document.getElementById('magNewpriceInput').value;
  const magId = document.getElementById('magNameTag');

  const data = {
    magfs_amount: Number(amount),
    magfs_price: newPrice === '' ? 0 : Number(newPrice),
    mag_id: String(magId.dataset.id)
  };
  console.log(data);
  addMagToFullstorage(data);
}

function addMagToFullstorage (data) {
  fetch('/fullstorage/products/addmag', {
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
        startAfterAddMag(data);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterAddMag (info) {
  magAfterTag.innerHTML = 'El separador se ha guardado correctamente en el inventario';
  magAfterTag.dataset.id = info.mag_id;
  addMagToFullstorageScreen.classList.remove('active');
  askMagToFullstorageScreen.classList.add('active');
}

function addSameMag () {
  const id = magAfterTag.dataset.id;
  magNameTag.dataset.id = id;
  magNameTag.innerHTML = 'Ingresa los datos faltantes para añadir la revista al inventario';
  addMagToFullstorageForm.reset();
  askMagToFullstorageScreen.classList.remove('active');
  addMagToFullstorageScreen.classList.add('active');
  console.log(id);
}

function startAgain () {
  askMagToFullstorageScreen.classList.remove('active');
  addFullstorageView.classList.add('active');
  headerView.classList.add('active');
  goBackBtnFDB.classList.add('active');
}
