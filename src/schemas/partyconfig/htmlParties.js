// Función para obtener el nombre del mes
function getMonthName (date) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[date.getMonth()];
}

// Función para organizar eventos por año
function groupPartiesByYear (parties) {
  return parties.reduce((partiesByYear, party) => {
    const startYear = new Date(party.party_startDate).getFullYear();
    partiesByYear[startYear] = partiesByYear[startYear] || [];
    partiesByYear[startYear].push(party);
    return partiesByYear;
  }, {});
}

// Función para construir el HTML de los eventos
function buildPartyHtml (party) {
  const startDate = new Date(party.party_startDate);
  const endDate = new Date(party.party_endDate);
  const startDay = startDate.getDate();
  const startMonth = getMonthName(startDate);
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  const endDay = endDate.getDate();
  const endMonth = getMonthName(endDate);

  return `
    <div class="party-card" id-info="${party.party_id}">
      <div class="partyBox">
        <p class="partyName">${party.party_name}</p>
        <p class="partyDate">
          ${startDay === endDay && startMonth === endMonth && startYear === endYear
          ? `<span>${startDay} de ${startMonth} del ${startYear}</span>`
          : (startYear === endYear
          ? `<span>Del ${startDay} de ${startMonth} al ${endDay} de ${endMonth} del ${endYear}</span>`
          : `<span>Del ${startDay} de ${startMonth} del ${startYear} al ${endDay} de ${endMonth} del ${endYear}</span>`)}
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
