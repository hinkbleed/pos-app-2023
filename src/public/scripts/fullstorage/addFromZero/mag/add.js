import { askProductTypeScreen, goBackBtn } from '../script.js';

const addBtnMag = document.getElementById('addBtnMag');
const addMagForm = document.getElementById('addMagForm');
const addMagScreen = document.getElementById('addMagScreen');
const cancelAddMagBtn = document.getElementById('cancelAddMagBtn');
const magEditorialInput = document.getElementById('magEditorialInput');
const magSubgenreInput = document.getElementById('magSubgenreInput');
const addMagToStorageScreen = document.getElementById('addMagToStorageScreen');
const magNameTag = document.getElementById('magNameTag');
const cancelAddMagToStorageBtn = document.getElementById('cancelAddMagToStorageBtn');
const addMagToStorageForm = document.getElementById('addMagToStorageForm');
const askMagToStorageScreen = document.getElementById('askMagToStorageScreen');
const magAfterTag = document.getElementById('magAfterTag');
const addAnotherMagBtn = document.getElementById('addAnotherMagBtn');
const addAnotherProductFMagBtn = document.getElementById('addAnotherProductFMagBtn');
const getOutFMag = document.getElementById('getOutFMag');

let addMagEditorialName;
let addMagEditorialId;
let addMagSubgenreName;
let addMagSubgenreId;
let addMagSubgenreAbv;

addBtnMag.addEventListener('click', startAddMag);

cancelAddMagBtn.addEventListener('click', cancelAddMag);

addMagForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewMag();
});

cancelAddMagToStorageBtn.addEventListener('click', cancelAddingMagToStorage);

addMagToStorageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendMagToStorage();
});

addAnotherMagBtn.addEventListener('click', startAddMag);

addAnotherProductFMagBtn.addEventListener('click', startAgainFMag);

getOutFMag.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

magEditorialInput.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addMagEditorialId = selectedOption.dataset.id;
  addMagEditorialName = selectedOption.dataset.name;
});

magSubgenreInput.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addMagSubgenreName = selectedOption.dataset.name;
  addMagSubgenreId = selectedOption.dataset.id;
  addMagSubgenreAbv = selectedOption.dataset.abv;
});

function startAddMag () {
  addMagForm.reset();
  fetch('/dataconfig/editorials/alltoproducts')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      magEditorialInput.innerHTML = html;
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
      magSubgenreInput.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
  if (!askProductTypeScreen.classList.contains('hide')) {
    askProductTypeScreen.classList.add('hide');
  }
  if (askMagToStorageScreen.classList.contains('active')) {
    askMagToStorageScreen.classList.remove('active');
  }
  if (askMagToStorageScreen.classList.contains('active')) {
    askMagToStorageScreen.classList.remove('active');
  }
  if (!addMagScreen.classList.contains('active')) {
    addMagScreen.classList.add('active');
  }
  if (!goBackBtn.classList.contains('hide')) {
    goBackBtn.classList.add('hide');
  }
}

function cancelAddMag () {
  addMagScreen.classList.remove('active');
  askProductTypeScreen.classList.remove('hide');
  goBackBtn.classList.remove('hide');
}

function getSendNewMag () {
  const name = document.getElementById('magNameInput').value;
  const author = document.getElementById('magAuthorInput').value;
  const year = document.getElementById('magYearInput').value;
  const editorialName = addMagEditorialName;
  const editorialId = addMagEditorialId;
  const barcode = document.getElementById('magBarcodeInput').value;
  const price = document.getElementById('magPriceInput').value;
  const subgenName = addMagSubgenreName;
  const subgenId = addMagSubgenreId;
  const subgenAbv = addMagSubgenreAbv;

  const data = {
    magName: name,
    magAuthor: author,
    magYear: year,
    magEditorialName: editorialName,
    magEditorialId: editorialId,
    magBarcode: barcode,
    magPrice: parseFloat(price),
    magSubgenreName: subgenName,
    magSubgenreId: subgenId,
    magSubgenreAbv: subgenAbv
  };
  createMag(data);
}

function createMag (data) {
  fetch('/dataconfig/products/addmag', {
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
      const newMagId = result.mag;
      showMagToStorage(newMagId, data); // Usa el ID como sea necesario
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showMagToStorage (newMagId, data) {
  addMagToStorageForm.reset();
  magNameTag.innerHTML = `Se ha añadido ${data.magName} correctamente a la base de datos.
  Ingresa los datos faltantes para añadir la revista al inventario`;
  magNameTag.dataset.id = newMagId;
  addMagToStorageScreen.classList.add('active');
  addMagScreen.classList.remove('active');
}

function cancelAddingMagToStorage () {
  askProductTypeScreen.classList.remove('hide');
  addMagScreen.classList.remove('active');
  addMagToStorageScreen.classList.remove('active');
  goBackBtn.classList.remove('hide');
}

function getSendMagToStorage () {
  const amount = document.getElementById('magToStorageAmountInput').value;
  const newPrice = document.getElementById('magNewpriceInput').value;
  const magId = document.getElementById('magNameTag');

  const data = {
    magfs_amount: Number(amount),
    magfs_price: Number(newPrice),
    mag_id: String(magId.dataset.id)
  };
  addMagToStorage(data);
}

function addMagToStorage (data) {
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
  magAfterTag.innerHTML = 'El producto se ha guardado correctamente en el inventario';
  magAfterTag.dataset.id = info.mag_id;
  askMagToStorageScreen.classList.add('active');
  addMagScreen.classList.remove('active');
  addMagToStorageScreen.classList.remove('active');
}

function startAgainFMag () {
  addMagScreen.classList.remove('active');
  addMagToStorageScreen.classList.remove('active');
  askMagToStorageScreen.classList.remove('active');
  askProductTypeScreen.classList.remove('hide');
  goBackBtn.classList.remove('hide');
}
