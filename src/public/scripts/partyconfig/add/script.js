const cancelAddPartyBtn = document.getElementById('cancelAddPartyBtn');
const addPartyForm = document.getElementById('addPartyForm');

cancelAddPartyBtn.addEventListener('click', function () {
  window.location.href = '/home';
});

addPartyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Starting to save party');
  getSendParty();
});

function getSendParty () {
  const name = document.getElementById('partyNameInput').value;
  const startDate = document.getElementById('partyStartDateInput').value;
  const endDate = document.getElementById('partyEndDateInput').value;
  const place = document.getElementById('partyPlaceInput').value;
  const street = document.getElementById('partyStreetInput').value;
  const addressNumber = document.getElementById('partyNumberInput').value;
  const city = document.getElementById('partyCityInput').value;
  const postalCode = document.getElementById('partyPostalcodeInput').value;

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
  addPartyToSystem(data);
}

function addPartyToSystem (data) {
  console.log(data);
  fetch('/partyconfig/createparty', {
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
      if (response.ok) {
        startAfterAddParty();
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterAddParty () {
  window.location.href = '/home';
}
