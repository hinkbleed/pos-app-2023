
const dataconfigAddGenre = document.getElementById('dataconfigAddBtn1');
const dataconfigAddSubgenre = document.getElementById('dataconfigAddBtn2');
const addGenreScreen = document.getElementById('addGenreScreen');
const addSubgenreScreen = document.getElementById('addSubgenreScreen');
const cancelAddGenreBtn = document.getElementById('cancelBtnGenre');
const cancelAddSubgenreBtn = document.getElementById('cancelBtnSubgenre');
const genreForm = document.getElementById('addFormGenre');

const subgenreForm = document.getElementById('addFormSubgenre');

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startGenresView);

dataconfigAddGenre.addEventListener('click', showAddGenreScreen);
dataconfigAddSubgenre.addEventListener('click', showAddSubgenreScreen);

cancelAddGenreBtn.addEventListener('click', finishAddGenreScreen);
cancelAddSubgenreBtn.addEventListener('click', finishAddSubgenreScreen);

genreForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddGenre();
});

subgenreForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddSubgenre();
});

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

function viewAllGenres () {
  const configGenreBox = document.getElementById('configGenreBox');
  fetch('/dataconfig/genres/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configGenreBox.innerHTML = html;
      document.querySelectorAll('.genre-dots').forEach(card => {
        card.addEventListener('click', showGenreOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function showGenreOptions (event) {
  const editAskElement = event.target.closest('.genre-card').querySelector('.genreOptions-ask');
  editAskElement.classList.toggle('active');

  const deleteBtn = editAskElement.querySelector('.deleteBtn');

  deleteBtn.addEventListener('click', startDeleteGenre);
}
const deleteGenreScreen = document.getElementById('deleteGenreScreen');

let currentGenreId = null;
function startDeleteGenre (event) {
  const genreId = event.target.closest('.genre-card').querySelector('.genre-id').textContent;
  const genreName = event.target.closest('.genre-card').querySelector('.genre-name').textContent;
  const genreAbv = event.target.closest('.genre-card').querySelector('.genre-abv').textContent;
  console.log(`Recovery information: ${genreId}, ${genreName}, ${genreAbv}`);
  deleteGenreScreen.classList.add('active');

  currentGenreId = genreId;

  const idLabel = document.getElementById('genreIdLabel');
  const nameLabel = document.getElementById('genreNameLabel');
  const abvLabel = document.getElementById('genreAbvLabel');

  idLabel.innerHTML = genreId;
  nameLabel.innerHTML = genreName;
  abvLabel.innerHTML = genreAbv;
}

const cancelDeleteGenreBtn = document.getElementById('cancelDeleteGenreBtn');
const acceptDeleteGenreBtn = document.getElementById('acceptDeleteGenreBtn');
const confirmDeleteGenreScreen = document.getElementById('confirmDeleteGenreScreen');
const cancelConfirmDeleteGenreBtn = document.getElementById('cancelConfirmDeleteGenreBtn');
const acceptConfirmDeleteGenreBtn = document.getElementById('acceptConfirmDeleteGenreBtn');

cancelDeleteGenreBtn.addEventListener('click', cancelDeleteGenre);
acceptDeleteGenreBtn.addEventListener('click', acceptDeleteGenre);
cancelConfirmDeleteGenreBtn.addEventListener('click', cancelConfirmDeleteGenre);
acceptConfirmDeleteGenreBtn.addEventListener('click', deleteGenre);

function cancelDeleteGenre () {
  deleteGenreScreen.classList.remove('active');
}

function acceptDeleteGenre () {
  confirmDeleteGenreScreen.classList.add('active');
}

function cancelConfirmDeleteGenre () {
  deleteGenreScreen.classList.remove('active');
  confirmDeleteGenreScreen.classList.remove('active');
}

function deleteGenre () {
  fetch(`/dataconfig/genres/delete/${currentGenreId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      cancelConfirmDeleteGenre();
      viewAllGenres();
    })
    .catch(error => {
      console.error('Error al eliminar el proveedor:', error);
    });
}

function viewAllSubgenres () {
  const configSubgenreBox = document.getElementById('configSubgenreBox');
  fetch('/dataconfig/subgenres/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configSubgenreBox.innerHTML = html;
      document.querySelectorAll('.subgenre-dots').forEach(card => {
        card.addEventListener('click', showSubgenreOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function showSubgenreOptions (event) {
  const editAskElement = event.target.closest('.subgenre-card').querySelector('.subgenreOptions-ask');
  editAskElement.classList.toggle('active');

  const deleteBtn = editAskElement.querySelector('.deleteBtn');

  deleteBtn.addEventListener('click', startDeleteSubgenre);
}

const deleteSubgenreScreen = document.getElementById('deleteSubgenreScreen');

let currentSubgenreId = null;
function startDeleteSubgenre (event) {
  const subgenreId = event.target.closest('.subgenre-card').querySelector('.subgenre-id').textContent;
  const subgenreName = event.target.closest('.subgenre-card').querySelector('.subgenre-name').textContent;
  const subgenreAbv = event.target.closest('.subgenre-card').querySelector('.subgenre-abv').textContent;
  console.log(`Recovery information: ${subgenreId}, ${subgenreName}, ${subgenreAbv}`);
  deleteSubgenreScreen.classList.add('active');

  currentSubgenreId = subgenreId;

  const idLabel = document.getElementById('subgenreIdLabel');
  const nameLabel = document.getElementById('subgenreNameLabel');
  const abvLabel = document.getElementById('subgenreAbvLabel');

  idLabel.innerHTML = subgenreId;
  nameLabel.innerHTML = subgenreName;
  abvLabel.innerHTML = subgenreAbv;
}

const cancelDeleteSubgenreBtn = document.getElementById('cancelDeleteSubgenreBtn');
const acceptDeleteSubgenreBtn = document.getElementById('acceptDeleteSubgenreBtn');
const confirmDeleteSubgenreScreen = document.getElementById('confirmDeleteSubgenreScreen');
const cancelConfirmDeleteSubgenreBtn = document.getElementById('cancelConfirmDeleteSubgenreBtn');
const acceptConfirmDeleteSubgenreBtn = document.getElementById('acceptConfirmDeleteSubgenreBtn');

cancelDeleteSubgenreBtn.addEventListener('click', cancelDeleteSubgenre);
acceptDeleteSubgenreBtn.addEventListener('click', acceptDeleteSubgenre);
cancelConfirmDeleteSubgenreBtn.addEventListener('click', cancelConfirmDeleteSubgenre);
acceptConfirmDeleteSubgenreBtn.addEventListener('click', deleteSubgenre);

function cancelDeleteSubgenre () {
  deleteSubgenreScreen.classList.remove('active');
}

function acceptDeleteSubgenre () {
  confirmDeleteSubgenreScreen.classList.add('active');
}

function cancelConfirmDeleteSubgenre () {
  deleteSubgenreScreen.classList.remove('active');
  confirmDeleteSubgenreScreen.classList.remove('active');
}

function deleteSubgenre () {
  fetch(`/dataconfig/subgenres/delete/${currentSubgenreId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      cancelConfirmDeleteSubgenre();
      viewAllSubgenres();
    })
    .catch(error => {
      console.error('Error al eliminar el subgénero:', error);
    });
}

function startGenresView () {
  viewAllGenres();
  viewAllSubgenres();
}

function showAddGenreScreen () {
  addGenreScreen.classList.add('active');
}

function showAddSubgenreScreen () {
  addSubgenreScreen.classList.add('active');
}

function finishAddGenreScreen () {
  addGenreScreen.classList.remove('active');
  genreForm.reset();
  viewAllGenres();
}

function finishAddSubgenreScreen () {
  addSubgenreScreen.classList.remove('active');
  subgenreForm.reset();
  viewAllSubgenres();
}

function sendGenreToServer (data) {
  fetch('/dataconfig/genres/add', {
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
      genreForm.reset();
      finishAddGenreScreen();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getSendGenreData () {
  const nameInput = document.getElementById('genreNameInput').value;
  const abvInput = document.getElementById('genreAbvInput').value;

  const formattedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

  const formattedAbv = abvInput.toUpperCase();

  const data = {
    genreName: formattedName,
    genreAbv: formattedAbv
  };

  sendGenreToServer(data);
}

function acceptAddGenre () {
  getSendGenreData();
}

function sendSubgenreToServer (data) {
  fetch('/dataconfig/subgenres/add', {
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
      subgenreForm.reset();
      finishAddSubgenreScreen();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getSendSubgenreData () {
  const nameInput = document.getElementById('subgenreNameInput').value;
  const abvInput = document.getElementById('subgenreAbvInput').value;

  const formattedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

  const formattedAbv = abvInput.toUpperCase();

  const data = {
    subgenreName: formattedName,
    subgenreAbv: formattedAbv
  };

  sendSubgenreToServer(data);
}

function acceptAddSubgenre () {
  getSendSubgenreData();
}
