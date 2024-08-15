const goBack = document.getElementById('goBack');
const partyconfigBox = document.getElementById('partyconfigBox');
const partyconfigCreatePartyBtn = document.getElementById('partyconfigCreatePartyBtn');

document.addEventListener('DOMContentLoaded', initHub);

goBack.addEventListener('click', function () {
  window.location.href = '/home';
});

partyconfigCreatePartyBtn.addEventListener('click', startCreateParty);

function initHub () {
  fetch('/partyconfig/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      partyconfigBox.innerHTML = html;

      const partycards = document.querySelectorAll('.card');
      const eventId =
      partycards.forEach(card => {
        card.addEventListener('click', openEvenById(eventId));
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function openEvenById (eventId) {

}

function startCreateParty () {
  window.location.href = '/partyconfig/addparty';
}
