const partiesBox = document.getElementById('eventsBox');

const homeFullStorage = document.getElementById('homeFullStorage');

const homeDataConfigBtn = document.getElementById('homeDataConfig');

const homeLogOut = document.getElementById('logout');

document.addEventListener('DOMContentLoaded', initHub);

homeFullStorage.addEventListener('click', viewFullStorage);

homeDataConfigBtn.addEventListener('click', viewDataConfig);

homeLogOut.addEventListener('click', function () {
  window.location.href = '/login';
});

function initHub () {
  fetch('/home/parties')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      partiesBox.innerHTML = html;
      const partycards = document.querySelectorAll('.card');

      partycards.forEach(card => {
        card.addEventListener('click', goToShop);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function goToShop () {
  window.location.href = '/shop';
}

function viewFullStorage () {
  window.location.href = '/fullstorage';
}

function viewDataConfig () {
  window.location.href = '/dataconfig';
}
