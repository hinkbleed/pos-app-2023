import { editSeparScreen, viewAllProducts } from '../script.js';

const cancelEditSeparBtn = document.getElementById('cancelEditSeparBtn');

const editSeparForm = document.getElementById('editSeparForm');

cancelEditSeparBtn.addEventListener('click', cancelEditSeparScreen);

editSeparForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptEditSepar();
});

function cancelEditSeparScreen () {
  editSeparScreen.classList.remove('active');
}

function acceptEditSepar () {
  getSeparNewData();
}

function patchSepar (data, id) {
  fetch(`/dataconfig/products/editsepar/${id}`, {
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
      editSeparForm.reset();
      finishEditSeparScreen();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });

  editSeparScreen.classList.remove('active');
}

function getSeparNewData () {
  const id = document.getElementById('separIdEditInput').innerText;
  const price = document.getElementById('separPriceEditInput').value;
  const description = document.getElementById('separDescriptionEditInput').value;

  const data = {
    separPrice: Number(price),
    separDescription: String(description)
  };
  console.log(data, id);
  patchSepar(data, id);
}

function finishEditSeparScreen () {
  editSeparScreen.classList.remove('active');
  viewAllProducts();
}
