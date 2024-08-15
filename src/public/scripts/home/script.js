const partiesBox = document.getElementById('partiesBox');

const homeFullStorageBtn = document.getElementById('homeFullStorageBtn');

const createPartyBtn = document.getElementById('createPartyBtn');

const homeDataConfigBtn = document.getElementById('homeDataConfigBtn');

const homeLogOut = document.getElementById('logout');

document.addEventListener('DOMContentLoaded', initHub);

homeFullStorageBtn.addEventListener('click', viewFullStorage);

createPartyBtn.addEventListener('click', createParty);

homeDataConfigBtn.addEventListener('click', viewDataConfig);

homeLogOut.addEventListener('click', function () {
  window.location.href = '/login';
});

function initHub () {
  fetch('/partyconfig/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      partiesBox.innerHTML = html;
      const partycards = document.querySelectorAll('.party-card');

      partycards.forEach(card => {
        card.addEventListener('click', goToShop);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function goToShop (event) {
  const partyId = event.currentTarget.getAttribute('id-info');
  setPartyIdCookie(partyId);
  window.location.href = '/shop';
}

function setPartyIdCookie (partyId) {
  const sixteenHours = 16 * 60 * 60;
  document.cookie = `currentPartyId=${partyId}; max-age=${sixteenHours}; path=/`;
}

// AQUÍ TERMINA EL DOMLOADED

function viewFullStorage () {
  window.location.href = '/fullstorage';
}

function createParty () {
  window.location.href = '/partyconfig/addparty';
}

function viewDataConfig () {
  window.location.href = '/dataconfig';
}
