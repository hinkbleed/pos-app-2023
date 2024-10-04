// Función para organizar eventos por año
function groupPartiesByYear (parties) {
  return parties.reduce((partiesByYear, party) => {
    const startYear = new Date(party.party_startDate).getFullYear();
    partiesByYear[startYear] = partiesByYear[startYear] || [];
    partiesByYear[startYear].push(party);
    return partiesByYear;
  }, {});
}

// Función para capitalizar el primer carácter del día y mes
function capitalizeDayAndMonth (string) {
  return string.split(' ').map(word => {
    if (word !== 'de') {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
}

// Función para construir el HTML de los eventos
function buildPartyHtml (party) {
  const startDate = new Date(party.party_startDate).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
  const endDate = new Date(party.party_endDate).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });

  const formattedStartDate = capitalizeDayAndMonth(startDate);
  const formattedEndDate = capitalizeDayAndMonth(endDate);

  const startDay = new Date(party.party_startDate).getDate();
  const endDay = new Date(party.party_endDate).getDate();

  const sameDate = startDay === endDay && startDate === endDate;

  return `
    <div class="party-card" id-info="${party.party_id}">
      <div class="partyBox">
        <p class="partyName">${party.party_name}</p>
        <p class="partyDate">
          ${sameDate
          ? `<span>${formattedStartDate}</span>`
          : `<span>Del ${formattedStartDate} al ${formattedEndDate}</span>`}
        </p>
        <div class="partyDetails">
          <p class="partyLocation">${party.party_place}, ${party.party_city}</p>
          <p class="partyId">${party.party_id}</p>
        </div>
      </div>
      <div class="edit-box">
        <img src="../svg/edit-icon.svg" class="edit-icon">
      </div> 
    </div>
  `;
}

// Función para construir el HTML de los eventos por año
function buildYearHtml (year, parties) {
  const partiesHtml = parties.reverse().map(buildPartyHtml).join('');
  return `
    <div class="parties-year" data-year="${year}">
      <div class="year-header">
        <span class="partyYear">${year}</span>
      </div>
      <div class="year-body">
        ${partiesHtml}
      </div>
    </div>
  `;
}

// Función principal para estructurar los eventos
export function structureParties (parties) {
  const partiesByYear = groupPartiesByYear(parties);
  const partiesHtml = Object.entries(partiesByYear).reverse().map(([year, parties]) => buildYearHtml(year, parties)).join('');
  return partiesHtml;
}
