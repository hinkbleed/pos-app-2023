const dataconfigAddProvidor = document.getElementById('dataconfigAddBtn');
const addProvidorScreen = document.getElementById('addScreen');
const cancelAddProvidorBtn = document.getElementById('cancelBtn');
const providorForm = document.getElementById('addForm');

const editProvidorScreen = document.getElementById('editScreen');
const cancelEditProvidorBtn = document.getElementById('cancelEditBtn');
const editProvidorForm = document.getElementById('editForm');

const deleteProvidorScreen = document.getElementById('deleteScreen');
const cancelDeleteProvidorBtn = document.getElementById('cancelDeleteBtn');
const acceptDeleteProvidorBtn = document.getElementById('acceptDeleteBtn');

const confirmDeleteScreen = document.getElementById('confirmDeleteScreen');
const cancelConfirmdeleteBtn = document.getElementById('cancelConfirmdeleteBtn');

cancelConfirmdeleteBtn.addEventListener('click', cancelDeletionScreens);

cancelDeleteProvidorBtn.addEventListener('click', cancelDeleteProvidorScreen);

acceptDeleteProvidorBtn.addEventListener('click', showConfirmDeleteScreen);

function deleteProvidor (id) {
  fetch(`/dataconfig/providors/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      cancelDeletionScreens();
      viewAllProvidors();
    })
    .catch(error => {
      console.error('Error al eliminar el proveedor:', error);
    });
}

function cancelDeletionScreens () {
  confirmDeleteScreen.classList.remove('active');
  deleteProvidorScreen.classList.remove('active');
}

function cancelDeleteProvidorScreen () {
  deleteProvidorScreen.classList.remove('active');
}

function showConfirmDeleteScreen () {
  confirmDeleteScreen.classList.add('active');
}

const exitBtn = document.getElementById('goBack');

document.addEventListener('DOMContentLoaded', startProvidorsView);

dataconfigAddProvidor.addEventListener('click', showAddProvidorScreen);

cancelAddProvidorBtn.addEventListener('click', finishAddProvidorScreen);

providorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddProvidor();
});

cancelEditProvidorBtn.addEventListener('click', cancelEditProvidorScreen);

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

function createProvidor (data) {
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
      providorForm.reset();
      finishAddProvidorScreen();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getProvidorData () {
  const name = document.getElementById('nameInput').value;
  const resp = document.getElementById('respInput').value;
  const number = document.getElementById('numberInput').value;

  const data = {
    provName: name,
    provResp: resp,
    provNumber: number
  };
  createProvidor(data);
}

function acceptAddProvidor () {
  getProvidorData();
}

function getNewProvidorData (id) {
  const newResp = document.getElementById('editRespInput').value;
  const newNumber = document.getElementById('editNumbInput').value;

  const data = {
    provResp: newResp,
    provNumber: newNumber
  };
  patchProvidor(data, id);
}

function acceptEditProvidor (id) {
  getNewProvidorData(id);
}

function cancelEditProvidorScreen () {
  editProvidorScreen.classList.remove('active');
}

function showOptions (event) {
  const editAskElement = event.target.closest('.providor-card').querySelector('.options-ask');
  editAskElement.classList.toggle('active');

  const editBtn = editAskElement.querySelector('.editBtn');
  const deleteBtn = editAskElement.querySelector('.deleteBtn');

  editBtn.addEventListener('click', startEditProvidor);
  deleteBtn.addEventListener('click', startDeleteProvidor);
}

function startEditProvidor (event) {
  const providorId = event.target.closest('.providor-card').querySelector('.prov-bit.id').textContent;
  const providorName = event.target.closest('.providor-card').querySelector('.providor-name').textContent;
  const providorResp = event.target.closest('.providor-card').querySelector('.prov-bit.resp').textContent;
  const providorNumbElement = event.target.closest('.providor-card').querySelector('.prov-bit.numb');
  const providorNumb = providorNumbElement.textContent.replace(/\s/g, '');
  console.log(`Recovery information: ${providorId}, ${providorName}, ${providorResp}, ${providorNumb}`);
  document.getElementById('editTag').innerHTML = `
  <div>Editar información de: <strong>${providorName}</strong></div>
 <div>con ID: <strong>${providorId}</strong></div>`;
  document.getElementById('editRespInput').value = providorResp;
  document.getElementById('editNumbInput').value = providorNumb;
  editProvidorScreen.classList.add('active');

  editProvidorForm.addEventListener('submit', function (event) {
    event.preventDefault();
    acceptEditProvidor(providorId);
  });
}

function patchProvidor (data, id) {
  fetch(`/dataconfig/providors/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error al actualizar el proveedor:', error);
    });
  finishEditProvidorScreen();
}
function finishEditProvidorScreen () {
  editProvidorScreen.classList.remove('active');
  viewAllProvidors();
}

let currentprovidorId = null;
function startDeleteProvidor (event) {
  const providorId = event.target.closest('.providor-card').querySelector('.prov-bit.id').textContent;
  const providorName = event.target.closest('.providor-card').querySelector('.providor-name').textContent;
  const providorResp = event.target.closest('.providor-card').querySelector('.prov-bit.resp').textContent;
  const providorNumbElement = event.target.closest('.providor-card').querySelector('.prov-bit.numb');
  const providorNumb = providorNumbElement.textContent.replace(/\s/g, '');
  console.log(`Recovery information: ${providorId}, ${providorName}, ${providorResp}, ${providorNumb}`);
  deleteProvidorScreen.classList.add('active');

  currentprovidorId = providorId;

  const idLabel = document.getElementById('idLabel');
  const nameLabel = document.getElementById('nameLabel');
  const respLabel = document.getElementById('respLabel');
  const numbLabel = document.getElementById('numbLabel');

  idLabel.innerHTML = providorId;
  nameLabel.innerHTML = providorName;
  respLabel.innerHTML = providorResp;
  numbLabel.innerHTML = providorNumb;
}

const acceptConfirmdeleteBtn = document.getElementById('acceptConfirmdeleteBtn');

acceptConfirmdeleteBtn.addEventListener('click', function () {
  deleteProvidor(currentprovidorId);
});
