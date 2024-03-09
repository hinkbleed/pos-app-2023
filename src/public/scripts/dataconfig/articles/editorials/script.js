const dataconfigAddEditorial = document.getElementById('dataconfigAddBtn');
const addEditorialScreen = document.getElementById('addScreen');
const cancelAddEditorialBtn = document.getElementById('cancelBtn');
const editorialForm = document.getElementById('addForm');

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startEditorialsView);

dataconfigAddEditorial.addEventListener('click', showAddEditorialScreen);

cancelAddEditorialBtn.addEventListener('click', finishAddEditorialScreen);

editorialForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddEditorial();
});

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

function viewAllEditorials () {
  const configEditBox = document.getElementById('configEditBox');
  fetch('/dataconfig/editorials/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configEditBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startEditorialsView () {
  viewAllEditorials();
}

function showAddEditorialScreen () {
  addEditorialScreen.classList.add('active');
}

function finishAddEditorialScreen () {
  addEditorialScreen.classList.remove('active');
  editorialForm.reset();
  viewAllEditorials();
}

function sendToServer (data) {
  fetch('/dataconfig/editorials/add', {
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
      editorialForm.reset();
      finishAddEditorialScreen();
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
