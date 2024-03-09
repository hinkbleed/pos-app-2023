const dataconfigAddProvidor = document.getElementById('dataconfigAddBtn');
const addProvidorScreen = document.getElementById('addScreen');
const cancelAddProvidorBtn = document.getElementById('cancelBtn');
const providorForm = document.getElementById('addForm');

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startProvidorsView);

dataconfigAddProvidor.addEventListener('click', showAddProvidorScreen);

cancelAddProvidorBtn.addEventListener('click', finishAddProvidorScreen);

providorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddProvidor();
});

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

function viewAllProvidors () {
  const configProvBox = document.getElementById('configProvBox');
  fetch('/dataconfig/providors/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configProvBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startProvidorsView () {
  viewAllProvidors();
}

function showAddProvidorScreen () {
  addProvidorScreen.classList.add('active');
}

function finishAddProvidorScreen () {
  addProvidorScreen.classList.remove('active');
  providorForm.reset();
  viewAllProvidors();
}

function sendToServer (data) {
  fetch('/dataconfig/providors/add', {
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
      providorForm.reset();
      finishAddProvidorScreen();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getSendData () {
  const name = document.getElementById('nameInput').value;
  const resp = document.getElementById('respInput').value;
  const number = document.getElementById('numberInput').value;

  const data = {
    provName: name,
    provResp: resp,
    provNumber: number
  };
  sendToServer(data);
}

function acceptAddProvidor () {
  getSendData();
}
