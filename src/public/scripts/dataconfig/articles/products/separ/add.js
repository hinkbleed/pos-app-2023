const askBtnSepar = document.getElementById('askBtnSepar');
const addSeparScreen = document.getElementById('addSeparScreen');
const cancelAddSeparBtn = document.getElementById('cancelAddSeparBtn');
const addSeparForm = document.getElementById('addSeparForm');

addSeparForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewSepar();
});

function getSendNewSepar () {
  const name = document.getElementById('separNameInput').value;
  const material = document.getElementById('separMaterialInput').value;
  const print = document.getElementById('separPrintInput').value;
  const description = document.getElementById('separDescriptionInput').value;
  const price = document.getElementById('separPriceInput').value;
  const barcode = document.getElementById('separBarcodeInput').value;

  const data = {
    separName: name,
    separMaterial: material,
    separPrint: print,
    separDescription: description,
    separPrice: parseFloat(price),
    separBarcode: barcode
  };
  console.log(data);
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
      addSeparForm.reset();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

askBtnSepar.addEventListener('click', showAddSeparScreen);

function showAddSeparScreen () {
  addSeparScreen.classList.add('active');
}

cancelAddSeparBtn.addEventListener('click', cancelAddSeparScreen);

function cancelAddSeparScreen () {
  addSeparScreen.classList.remove('active');
}
