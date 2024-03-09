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
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
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
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
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
  const name = document.getElementById('genreNameInput').value;
  const abv = document.getElementById('genreAbvInput').value;

  const data = {
    genreName: name,
    genreAbv: abv
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
  const name = document.getElementById('subgenreNameInput').value;
  const abv = document.getElementById('subgenreAbvInput').value;

  const data = {
    subgenreName: name,
    subgenreAbv: abv
  };
  sendSubgenreToServer(data);
}

function acceptAddSubgenre () {
  getSendSubgenreData();
}
