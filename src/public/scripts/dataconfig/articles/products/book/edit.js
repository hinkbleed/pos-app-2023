import { editBookScreen, viewAllProducts } from '../script.js';

const cancelEditBookBtn = document.getElementById('cancelEditBookBtn');

const editBookForm = document.getElementById('editBookForm');

cancelEditBookBtn.addEventListener('click', cancelEditBookScreen);

editBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptEditBook();
});

function cancelEditBookScreen () {
  editBookScreen.classList.remove('active');
}

function acceptEditBook () {
  getBookNewData();
}

function patchBook (data, id) {
  fetch(`/dataconfig/products/editbook/${id}`, {
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
      editBookForm.reset();
      finishEditBookScreen();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });

  editBookScreen.classList.remove('active');
}

function getBookNewData () {
  const id = document.getElementById('bookIdEditInput').innerText;
  const price = document.getElementById('bookPriceEditInput').value;

  const data = {
    bookPrice: Number(price)
  };
  console.log(data);
  patchBook(data, id);
}

function finishEditBookScreen () {
  editBookScreen.classList.remove('active');
  viewAllProducts();
}
