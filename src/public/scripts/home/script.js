const partiesBox = document.getElementById('eventsBox');

const homeDataConfig = document.getElementById('homeDataConfig');
const homeLogOut = document.getElementById('logout');

homeDataConfig.addEventListener('click', viewDataConfig);

function viewDataConfig () {
  window.location.href = '/dataconfig';
}

homeLogOut.addEventListener('click', function () {
  window.location.href = '/login';
});

document.addEventListener('DOMContentLoaded', initHub);

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
