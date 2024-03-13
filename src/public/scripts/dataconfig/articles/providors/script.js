const dataconfigAddProvidor = document.getElementById('dataconfigAddBtn');
const addProvidorScreen = document.getElementById('addScreen');
const cancelAddProvidorBtn = document.getElementById('cancelBtn');
const providorForm = document.getElementById('addForm');

const editScreen = document.getElementById('editScreen');

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

      document.querySelectorAll('.opt-dots').forEach(card => {
        card.addEventListener('click', showOptions);
      });
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

function showOptions (event) {
  const editAskElement = event.target.closest('.providor-card').querySelector('.options-ask');
  editAskElement.classList.toggle('active');

  const editBtn = editAskElement.querySelector('.editBtn');
  const deleteBtn = editAskElement.querySelector('.deleteBtn');

  editBtn.addEventListener('click', startEditProvidor);
  deleteBtn.addEventListener('click', deleteProvidor);
}

function startEditProvidor (event) {
  const providorId = event.target.closest('.providor-card').querySelector('.prov-bit.id').textContent;
  const providorName = event.target.closest('.providor-card').querySelector('.providor-name').textContent;
  document.getElementById('editTag').innerHTML = `
  <div>Editar información de: <strong>${providorName}</strong></div>
 <div>con ID: <strong>${providorId}</strong></div>`;

  editScreen.classList.add('active');
  console.log(`
  Editar providor con Nombre ${providorName} e ID: ${providorId}`);
  // Agregar lógica para editar el proveedor con el ID proporcionado
}

function deleteProvidor (event) {
  const providorId = event.target.closest('.providor-card').querySelector('.prov-bit.id').textContent;
  const providorName = event.target.closest('.providor-card').querySelector('.providor-name').textContent;
  console.log(`
  Eliminar providor con Nombre ${providorName} e ID: ${providorId}`);
  // Agregar lógica para eliminar el proveedor con el ID proporcionado
}
