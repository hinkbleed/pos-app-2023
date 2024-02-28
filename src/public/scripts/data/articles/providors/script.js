const providorsBtn = document.getElementById('viewProvidors');
const addProvidorBtn = document.getElementById('addProvidorBtn');
const providorsScreen = document.getElementById('providorsScreen');
const addProvidorScreen = document.getElementById('addProvidorScreen');
const cancelAddProvBtn = document.getElementById('cancelAddProvBtn');
const acceptProvForm = document.getElementById('addProvidorForm');
const closeWin = document.getElementById('closeDataWin');
const cardsBox = document.getElementById('cardsBox');

providorsBtn.addEventListener('click', viewProvidors);

addProvidorBtn.addEventListener('click', startAddProvidor);

cancelAddProvBtn.addEventListener('click', cancelAddProv);

acceptProvForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddProv();
});

function viewProvidors () {
  fetch('/data/providors')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      cardsBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startAddProvidor () {
  closeWin.classList.add('hide');
  providorsScreen.classList.add('hide');
  addProvidorScreen.classList.add('active');
}

function cancelAddProv () {
  closeWin.classList.remove('hide');
  providorsScreen.classList.remove('hide');
  addProvidorScreen.classList.remove('active');
  viewProvidors();
  acceptProvForm.reset();
}

function sendToServer (data) {
  fetch('/data/providors/add', {
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
      // Manejar la respuesta del servidor si es necesario
      console.log('Datos enviados correctamente:', data);
      acceptProvForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getInputsData () {
  const name = document.getElementById('provNameInput').value;
  const resp = document.getElementById('provRespInput').value;
  const number = document.getElementById('provNumberInput').value;

  const data = {
    provName: name,
    provResp: resp,
    provNumber: number
  };
  sendToServer(data);
}

function acceptAddProv () {
  getInputsData();

  closeWin.classList.remove('hide');
  providorsScreen.classList.remove('hide');
  addProvidorScreen.classList.remove('active');

  viewProvidors();
}
