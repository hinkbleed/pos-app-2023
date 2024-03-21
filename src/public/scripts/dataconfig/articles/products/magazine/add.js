const askBtnMag = document.getElementById('askBtnMag');
const addMagScreen = document.getElementById('addMagScreen');
const cancelAddMagBtn = document.getElementById('cancelAddMagBtn');
const magEditorialInput = document.getElementById('magEditorialInput');
const magSubgenreInput = document.getElementById('magSubgenreInput');
const addMagForm = document.getElementById('addMagForm');

askBtnMag.addEventListener('click', showAddMagScreen);

addMagForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewMagazine();
});

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
      addMagForm.reset();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

let addMagSubgenreName;
let addMagSubgenreId;
let addMagSubgenreAbv;

let addMagEditorialName;
let addMagEditorialId;

const magEditorialInfo = document.getElementById('magEditorialInput');

magEditorialInfo.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addMagEditorialName = selectedOption.dataset.name;
  addMagEditorialId = selectedOption.dataset.id;
});

const magSubgenreInfo = document.getElementById('magSubgenreInput');

magSubgenreInfo.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  addMagSubgenreName = selectedOption.dataset.name;
  addMagSubgenreId = selectedOption.dataset.id;
  addMagSubgenreAbv = selectedOption.dataset.abv;
});

function getSendNewMagazine () {
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
  console.log(data);
  createMag(data);
}

function showAddMagScreen () {
  addMagScreen.classList.add('active');
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
}

cancelAddMagBtn.addEventListener('click', cancelAddMagScreen);

function cancelAddMagScreen () {
  addMagScreen.classList.remove('active');
}
