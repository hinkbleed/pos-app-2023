const dataconfigAddEditorial = document.getElementById('dataconfigAddBtn');
const addEditorialScreen = document.getElementById('addScreen');
const cancelAddEditorialBtn = document.getElementById('cancelBtn');
const editorialForm = document.getElementById('addForm');

const deleteEditorialScreen = document.getElementById('deleteEditorialScreen');

const cancelDeleteEditorialBtn = document.getElementById('cancelDeleteEditorialBtn');
const acceptDeleteEditorialBtn = document.getElementById('acceptDeleteEditorialBtn');

const confirmDeleteEditorialScreen = document.getElementById('confirmDeleteScreen');

const cancelConfirmDeleteEditorialBtn = document.getElementById('cancelConfirmDeleteEditorialBtn');

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

cancelDeleteEditorialBtn.addEventListener('click', cancelDeleteEditorialScreen);

acceptDeleteEditorialBtn.addEventListener('click', askConfirmDeleteEditorial);

cancelConfirmDeleteEditorialBtn.addEventListener('click', cancelConfirmDeleteEditorial);

function askConfirmDeleteEditorial () {
  confirmDeleteEditorialScreen.classList.add('active');
}

function cancelDeleteEditorialScreen () {
  deleteEditorialScreen.classList.remove('active');
}

function cancelConfirmDeleteEditorial () {
  deleteEditorialScreen.classList.remove('active');
  confirmDeleteEditorialScreen.classList.remove('active');
}

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
      document.querySelectorAll('.opt-dots').forEach(card => {
        card.addEventListener('click', showOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function showOptions (event) {
  const editAskElement = event.target.closest('.editorial-card').querySelector('.options-ask');
  editAskElement.classList.toggle('active');

  const deleteBtn = editAskElement.querySelector('.deleteBtn');

  deleteBtn.addEventListener('click', startDeleteEditorial);
}

let currentEditorialId = null;
function startDeleteEditorial (event) {
  const editorialId = event.target.closest('.editorial-card').querySelector('.editorial-id').textContent;
  const editorialName = event.target.closest('.editorial-card').querySelector('.editorial-name').textContent;
  console.log(`Recovery information: ${editorialId}, ${editorialName}`);
  deleteEditorialScreen.classList.add('active');

  currentEditorialId = editorialId;

  const idLabel = document.getElementById('idLabel');
  const nameLabel = document.getElementById('nameLabel');

  idLabel.innerHTML = editorialId;
  nameLabel.innerHTML = editorialName;
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

const acceptConfirmDeleteEditorialBtn = document.getElementById('acceptConfirmDeleteEditorialBtn');

acceptConfirmDeleteEditorialBtn.addEventListener('click', deleteEditorial);

function deleteEditorial () {
  fetch(`/dataconfig/editorials/delete/${currentEditorialId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      cancelConfirmDeleteEditorial();
      viewAllEditorials();
    })
    .catch(error => {
      console.error('Error al eliminar la editorial:', error);
    });
}
