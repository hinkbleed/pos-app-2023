import { editMagScreen, viewAllProducts } from '../script.js';

const cancelEditMagBtn = document.getElementById('cancelEditMagBtn');

const editMagForm = document.getElementById('editMagForm');

cancelEditMagBtn.addEventListener('click', cancelEditMagScreen);

editMagForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptEditMag();
});

function cancelEditMagScreen () {
  editMagScreen.classList.remove('active');
}

function acceptEditMag () {
  getMagNewData();
}

function patchMag (data, id) {
  console.log(data, id);
  fetch(`/dataconfig/products/editmag/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor.');
      }
      editMagForm.reset();
      finishEditMagScreen();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });

  editMagScreen.classList.remove('active');
}

function getMagNewData () {
  const id = document.getElementById('magIdEditInput').innerText;
  const price = document.getElementById('magPriceEditInput').value;

  const data = {
    magPrice: Number(price)
  };
  patchMag(data, id);
}

function finishEditMagScreen () {
  editMagScreen.classList.remove('active');
  viewAllProducts();
}
