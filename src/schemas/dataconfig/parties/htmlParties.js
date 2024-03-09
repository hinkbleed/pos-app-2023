// Función para obtener el nombre del mes
function getMonthName (date) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[date.getMonth()];
}

// Función para organizar eventos por año
function groupEventsByYear (parties) {
  return parties.reduce((eventsByYear, party) => {
    const startYear = new Date(party.event_start_date).getFullYear();
    eventsByYear[startYear] = eventsByYear[startYear] || [];
    eventsByYear[startYear].push(party);
    return eventsByYear;
  }, {});
}

// Función para construir el HTML de los eventos
function buildEventHtml (event) {
  const startDate = new Date(event.event_start_date);
  const endDate = new Date(event.event_end_date);
  const startDay = startDate.getDate();
  const startMonth = getMonthName(startDate);
  const endDay = endDate.getDate();
  const endMonth = getMonthName(endDate);

  return `
    <div class="event-card">
      <div class="card">
        <p class="eventName">${event.event_name}</p>
        <p class="eventLocation">${event.event_location}</p>
        <p class="eventDate">
          <span>Del ${startDay} de ${startMonth}</span><span>Al ${endDay} de ${endMonth}</span>
        </p>
        <p class="eventId">${event.event_id}</p>
      </div>
      <div class="edit-box">
        <img src="../svg/edit-icon.svg" class="edit-icon">
      </div> 
    </div>
  `;
}

// Función para construir el HTML de los eventos por año
function buildYearHtml (year, events) {
  const eventsHtml = events.reverse().map(buildEventHtml).join('');
  return `
    <div class="events-year" data-year="${year}">
      <div class="year-header">
        <span class="eventYear">${year}</span>
      </div>
      <div class="year-body">
        ${eventsHtml}
      </div>
    </div>
  `;
}

// Función principal para estructurar los eventos
export function structureParties (parties) {
  const eventsByYear = groupEventsByYear(parties);
  const partiesHtml = Object.entries(eventsByYear).reverse().map(([year, events]) => buildYearHtml(year, events)).join('');
  return partiesHtml;
}
