import { hideCloseWin, showCloseWin } from '../providors/script.js';

const editorialsBtn = document.getElementById('viewEditorials');
const addEditorialBtn = document.getElementById('addEditorialBtn');
const editorialsScreen = document.getElementById('editorialsScreen');
const addEditorialScreen = document.getElementById('addEditorialScreen');
const cancelAddEditBtn = document.getElementById('cancelAddEditBtn');
const acceptEditForm = document.getElementById('addEditorialForm');

const editCardsBox = document.getElementById('editCardsBox');

editorialsBtn.addEventListener('click', viewEditorials);

addEditorialBtn.addEventListener('click', startAddEditorial);

cancelAddEditBtn.addEventListener('click', cancelAddEdit);

acceptEditForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddEdit();
});

function viewEditorials () {
  fetch('/data/editorials')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      editCardsBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startAddEditorial () {
  hideCloseWin();
  editorialsScreen.classList.add('hide');
  addEditorialScreen.classList.add('active');
}

function cancelAddEdit () {
  showCloseWin();
  editorialsScreen.classList.remove('hide');
  addEditorialScreen.classList.remove('active');
  viewEditorials();
  acceptEditForm.reset();
}

function sendToServer (data) {
  fetch('/data/editorials/add', {
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
      acceptEditForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getInputsData () {
  const name = document.getElementById('editNameInput').value;

  const data = {
    editName: name
  };
  sendToServer(data);
}

function acceptAddEdit () {
  getInputsData();
  showCloseWin();
  editorialsScreen.classList.remove('hide');
  addEditorialScreen.classList.remove('active');

  viewEditorials();
}

/*
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
*/
