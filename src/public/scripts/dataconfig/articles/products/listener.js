const dataconfigAddProduct = document.getElementById('dataconfigAddBtn');
const askScreen = document.getElementById('askScreen');

const cancelType = document.getElementById('cancelType');

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startProductsView);

dataconfigAddProduct.addEventListener('click', showAskScreen);

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

cancelType.addEventListener('click', finishAskScreen);

function viewAllProducts () {
  const configProdBox = document.getElementById('configProdBox');
  fetch('/dataconfig/products/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configProdBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startProductsView () {
  viewAllProducts();
}

function showAskScreen () {
  askScreen.classList.add('active');
}

function finishAskScreen () {
  askScreen.classList.remove('active');
  startProductsView();
}
