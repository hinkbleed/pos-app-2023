
const exitBtn = document.getElementById('goBack');

const addEmployeeBtn = document.getElementById('dataconfigAddBtn');

const addEmployeeScreen = document.getElementById('addScreen');

const cancelAddEmployeeBtn = document.getElementById('cancelAddEmployeeBtn');

const addEmployeeForm = document.getElementById('addEmployeeForm');

const viewEmployeeScreen = document.getElementById('viewScreen');

const goBackToEmployeesBtn = document.getElementById('goBackToEmployees');

const editEmployeeBtn = document.getElementById('editEmployeeBtn');

const editEmployeeScreen = document.getElementById('editScreen');

const cancelEditEmployeeBtn = document.getElementById('cancelEditBtn');

const editForm = document.getElementById('editForm');

goBackToEmployeesBtn.addEventListener('click', goBackToEmployees);

exitBtn.addEventListener('click', function () {
  window.location.href = '/dataconfig';
});

document.addEventListener('DOMContentLoaded', startEmployeesView);

addEmployeeBtn.addEventListener('click', startAddEmployee);

cancelAddEmployeeBtn.addEventListener('click', cancelAddEmployee);

addEmployeeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddEmployee();
});

editEmployeeBtn.addEventListener('click', startEditEmployee);

cancelEditEmployeeBtn.addEventListener('click', cancelEditEmployee);

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const id = document.getElementById('employeeIdBit').textContent;
  acceptEditEmployee(id);
});

function createEmployee (data) {
  fetch('/dataconfig/employees/add', {
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
      addEmployeeForm.reset();
      viewAllEmployees();
      cancelAddEmployee();
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getNewEmployeeData () {
  const name = document.getElementById('nameAddInput').value;
  const lastname = document.getElementById('lastnameAddInput').value;
  const number = document.getElementById('numberAddInput').value;
  const alias = document.getElementById('aliasAddInput').value;

  const data = {
    employName: name,
    employLastname: lastname,
    employNumber: number,
    employAlias: alias === '' ? name : alias

  };

  createEmployee(data);
}

function acceptAddEmployee () {
  getNewEmployeeData();
}

function cancelAddEmployee () {
  addEmployeeScreen.classList.remove('active');
}

function startAddEmployee () {
  addEmployeeScreen.classList.add('active');
}

function startEmployeesView () {
  viewAllEmployees();
}

function viewAllEmployees () {
  const configEmployeeBox = document.getElementById('configEmployeesBox');
  fetch('/dataconfig/employees/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      configEmployeeBox.innerHTML = html;
      document.querySelectorAll('.employee-card').forEach(card => {
        card.addEventListener('click', startViewEmployeeInfo);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function startViewEmployeeInfo (event) {
  document.getElementById('employeeNameBit').innerText = '';
  document.getElementById('employeeLastnameBit').innerText = '';
  document.getElementById('employeeNumberBit').innerText = '';
  document.getElementById('employeeStatusBit').innerText = '';
  document.getElementById('employeeIdBit').innerText = '';
  document.getElementById('viewEmployeeTag').innerText = '';
  const employeeId = event.target.closest('.employee-card').querySelector('.employee-card-id').textContent;
  document.getElementById('employeeIdBit').innerText = employeeId;
  getEmployeeInfo(employeeId);
  viewEmployeeScreen.classList.add('active');
}

function getEmployeeInfo (id) {
  function formatPhoneNumber (phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const formatted = cleaned.substring(0, 2) + ' ' + cleaned.substring(2, 6) + ' ' + cleaned.substring(6, 10);
    return formatted;
  }
  fetch(`/dataconfig/employees/get/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('viewEmployeeTag').innerText = data.employ_alias;
      document.getElementById('employeeNameBit').innerText = data.employ_name;
      document.getElementById('employeeLastnameBit').innerText = data.employ_lastname;
      document.getElementById('employeeNumberBit').innerText = formatPhoneNumber(data.employ_number);
      document.getElementById('employeeStatusBit').innerText = data.employ_status;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function goBackToEmployees () {
  viewAllEmployees();
  viewEmployeeScreen.classList.remove('active');
}

function startEditEmployee () {
  const employeeId = document.getElementById('employeeIdBit').textContent;
  const employeeAlias = document.getElementById('viewEmployeeTag').textContent;
  const employeeName = document.getElementById('employeeNameBit').textContent;
  const employeeLastname = document.getElementById('employeeLastnameBit').textContent;
  const employeeNumberElement = document.getElementById('employeeNumberBit');

  const employeeNumber = employeeNumberElement.textContent.replace(/\s/g, '');

  console.log(`Recovery information: ${employeeId}, ${employeeAlias}, ${employeeName}, ${employeeLastname}, ${employeeNumber}`);

  document.getElementById('editEmployeeTag').innerHTML = `
  <div>Editar información de: <strong>${employeeAlias}</strong></div>
 <div>ID: <strong>${employeeId}</strong></div>`;
  document.getElementById('editNameInput').value = employeeName;
  document.getElementById('editLastnameInput').value = employeeLastname;
  document.getElementById('editNumbInput').value = employeeNumber;
  document.getElementById('editAliasInput').value = employeeAlias;
  editEmployeeScreen.classList.add('active');
}

function cancelEditEmployee () {
  editEmployeeScreen.classList.remove('active');
  editForm.reset();
}

function acceptEditEmployee (id) {
  getEmployeeNewData(id);
}

function getEmployeeNewData (id) {
  const newName = document.getElementById('editNameInput').value;
  const newLastname = document.getElementById('editLastnameInput').value;
  const newNumber = document.getElementById('editNumbInput').value;
  const newAlias = document.getElementById('editAliasInput').value;

  const newData = {
    employName: newName,
    employLastname: newLastname,
    employNumber: newNumber,
    employAlias: newAlias === '' ? newName : newAlias
  };

  patchEmployee(newData, id);
}

function patchEmployee (newData, id) {
  fetch(`/dataconfig/employees/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error al actualizar la información del empleado:', error);
    });
  finishEditEmployee(id);
}

function finishEditEmployee (id) {
  getEmployeeInfo(id);
  editEmployeeScreen.classList.remove('active');
}
/*

function viewAllProvidors () {
  const configProvBox = document.getElementById('configProvBox');
  fetch('/dataconfig/providors/all')
    .then(html => {
      configProvBox.innerHTML = html;

      document.querySelectorAll('.opt-dots').forEach(card => {
        card.addEventListener('click', showOptions);
      });
    })
}

function showOptions (event) {
  const editAskElement = event.target.closest('.providor-card').querySelector('.options-ask');
  editAskElement.classList.toggle('active');

  const editBtn = editAskElement.querySelector('.editBtn');
  const deleteBtn = editAskElement.querySelector('.deleteBtn');

  editBtn.addEventListener('click', startEditProvidor);
  deleteBtn.addEventListener('click', startDeleteProvidor);
}

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

dataconfigAddProvidor.addEventListener('click', showAddProvidorScreen);

cancelAddProvidorBtn.addEventListener('click', finishAddProvidorScreen);

providorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  acceptAddProvidor();
});

cancelEditProvidorBtn.addEventListener('click', cancelEditProvidorScreen);

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

function startEditProvidor (event) {
  const providorId = event.target.closest('.providor-card').querySelector('.prov-bit.id').textContent;
  const providorName = event.target.closest('.providor-card').querySelector('.providor-name').textContent;
  const providorResp = event.target.closest('.providor-card').querySelector('.prov-bit.resp').textContent;
  const providorNumbElement = event.target.closest('.providor-card').querySelector('.prov-bit.numb');
  const providorNumb = providorNumbElement.textContent.replace(/\s/g, '');
  console.log(`Recovery information: ${providorId}, ${providorName}, ${providorResp}, ${providorNumb}`);
  document.getElementById('editProvidorTag').innerHTML = `
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

let currentProvidorId = null;
function startDeleteProvidor (event) {
  const providorId = event.target.closest('.providor-card').querySelector('.prov-bit.id').textContent;
  const providorName = event.target.closest('.providor-card').querySelector('.providor-name').textContent;
  const providorResp = event.target.closest('.providor-card').querySelector('.prov-bit.resp').textContent;
  const providorNumbElement = event.target.closest('.providor-card').querySelector('.prov-bit.numb');
  const providorNumb = providorNumbElement.textContent.replace(/\s/g, '');
  console.log(`Recovery information: ${providorId}, ${providorName}, ${providorResp}, ${providorNumb}`);
  deleteProvidorScreen.classList.add('active');

  currentProvidorId = providorId;

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
  deleteProvidor(currentProvidorId);
});

*/
