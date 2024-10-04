import { interfaceStarter, screenBox } from '../interface/script.js';

export const closeWinBtn = document.getElementById('closeDataWin');

const partyId = screenBox.getAttribute('id-info');
const dataOptionBtn = document.querySelectorAll('.dataOptionBtn');
const artModules = document.querySelectorAll('.articleBox');
const sectionView = document.getElementById('sectionDataView');

const editPartyDataBtn = document.getElementById('editPartyDataBtn');
const editPartyDataScreen = document.getElementById('editPartyDataScreen');
const editFormBox = document.getElementById('editFormBox');
const cancelEditPartyBtn = document.getElementById('cancelEditPartyBtn');
const editPartyForm = document.getElementById('editPartyForm');
const confirmEditScreen = document.getElementById('confirmEditScreen');
const cancelConfirmPartyEditBtn = document.getElementById('cancelConfirmPartyEditBtn');
const acceptConfirmPartyEditBtn = document.getElementById('acceptConfirmPartyEditBtn');
const SuccesPartyEdit = document.getElementById('SuccesPartyEdit');

dataOptionBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    sectionView.classList.remove('disappear');
    sectionView.classList.add('active');
    artModules.forEach((module) => {
      module.style.display = 'none';
    });
    artModules[index].style.display = 'flex';
  });
});

closeWinBtn.addEventListener('click', () => {
  sectionView.classList.add('disappear');
  setTimeout(() => {
    sectionView.classList.remove('active');
  }, 300);
});

editPartyDataBtn.addEventListener('click', () => {
  startEditPartyInterface();
});

cancelEditPartyBtn.addEventListener('click', () => {
  cancelEditPartyInterface();
});

editPartyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  askConfirmEdit();
});

cancelConfirmPartyEditBtn.addEventListener('click', () => {
  cancelConfirmEditParty();
});

acceptConfirmPartyEditBtn.addEventListener('click', () => {
  getSendNewPartyInfo();
});

function startEditPartyInterface () {
  fetch(`/shop/data/partyconfig/partybyid/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.json();
    })
    .then(response => {
      fillEditForm(response);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
  editPartyDataScreen.classList.add('active');
  editFormBox.classList.add('active');
}

function cancelEditPartyInterface () {
  editPartyDataScreen.classList.remove('active');
  editFormBox.classList.remove('active');
  editPartyForm.reset();
}

function fillEditForm (partyData) {
  const editPartyTag = document.getElementById('editPartyTag');
  const editPartyNameInput = document.getElementById('editPartyNameInput');
  const editPartyStartDateInput = document.getElementById('editPartyStartDateInput');
  const editPartyEndDateInput = document.getElementById('editPartyEndDateInput');
  const editPartyPlaceInput = document.getElementById('editPartyPlaceInput');
  const editPartyStreetInput = document.getElementById('editPartyStreetInput');
  const editPartyNumberInput = document.getElementById('editPartyNumberInput');
  const editPartyCityInput = document.getElementById('editPartyCityInput');
  const editPartyPostalcodeInput = document.getElementById('editPartyPostalcodeInput');
  const partyId = partyData.party_id;
  const partyName = partyData.party_name;
  const partyStartDate = partyData.party_startDate;
  const partyEndDate = partyData.party_endDate;
  const partyPlace = partyData.party_place;
  const partyStreet = partyData.party_street;
  const partyNumber = partyData.party_adressNumber;
  const partyCity = partyData.party_city;
  const partyPostalcode = partyData.party_postalCode;

  editPartyTag.innerHTML = `Editando ${partyName} con ID: ${partyId}`;
  editPartyNameInput.value = partyName;
  editPartyStartDateInput.value = partyStartDate;
  editPartyEndDateInput.value = partyEndDate;
  editPartyPlaceInput.value = partyPlace;
  editPartyStreetInput.value = partyStreet;
  editPartyNumberInput.value = partyNumber;
  editPartyCityInput.value = partyCity;
  editPartyPostalcodeInput.value = partyPostalcode;
}

function askConfirmEdit () {
  confirmEditScreen.classList.add('active');
}

function cancelConfirmEditParty () {
  confirmEditScreen.classList.remove('active');
}

function getSendNewPartyInfo () {
  const name = document.getElementById('editPartyNameInput').value;
  const startDate = document.getElementById('editPartyStartDateInput').value;
  const endDate = document.getElementById('editPartyEndDateInput').value;
  const place = document.getElementById('editPartyPlaceInput').value;
  const street = document.getElementById('editPartyStreetInput').value;
  const addressNumber = document.getElementById('editPartyNumberInput').value;
  const city = document.getElementById('editPartyCityInput').value;
  const postalCode = document.getElementById('editPartyPostalcodeInput').value;

  const data = {
    party_name: String(name),
    party_startDate: startDate,
    party_endDate: endDate,
    party_place: String(place),
    party_street: String(street),
    party_adressNumber: addressNumber === '' ? 'S/N' : String(addressNumber),
    party_city: String(city),
    party_postalCode: String(postalCode)
  };
  updatePartyToSystem(data);
}

function updatePartyToSystem (data) {
  fetch(`/partyconfig/updateparty/${partyId}`, {
    method: 'PATCH',
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
    .then(responseData => {
      console.log('Respuesta del servidor:', responseData);
      startAfterUpdateParty();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterUpdateParty () {
  interfaceStarter('data');
  showSuccesMessage();
  cancelConfirmEditParty();
  cancelEditPartyInterface();
}

function showSuccesMessage () {
  SuccesPartyEdit.classList.add('active');
  setTimeout(() => {
    SuccesPartyEdit.classList.remove('active');
  }, 5000);
}
