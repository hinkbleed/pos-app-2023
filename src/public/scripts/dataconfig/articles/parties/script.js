const dataconfigAddEvent = document.getElementById('dataconfigAddBtn');
const addEventScreen = document.getElementById('addScreen');
const cancelAddEventlBtn = document.getElementById('cancelBtn');
const eventForm = document.getElementById('addForm');

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startEventsView);

dataconfigAddEvent.addEventListener('click', showAddEventScreen);

cancelAddEventlBtn.addEventListener('click', finishAddEventScreen);

eventForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddEditorial();
});

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

function viewAllEvents () {
  const configEventBox = document.getElementById('configEventBox');
  fetch('/dataconfig/parties/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configEventBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startEventsView () {
  viewAllEvents();
}

function showAddEventScreen () {
  window.location.href = '/dataconfig/parties/addparty';
}

function finishAddEventScreen () {
  addEventScreen.classList.remove('active');
  eventForm.reset();
  viewAllEvents();
}

function sendToServer (data) {
  fetch('/home/parties/add', {
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
      return response.json();
    })
    .then(data => {
      console.log('Datos enviados correctamente:', data);
      eventForm.reset();
      finishAddEventScreen();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getSendData () {
  const name = document.getElementById('nameInput').value;

  const data = {
    editName: name
  };
  sendToServer(data);
}

function acceptAddEditorial () {
  getSendData();
}
