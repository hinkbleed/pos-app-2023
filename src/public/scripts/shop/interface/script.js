export const screenBox = document.getElementById('screenBox');

const lastSection = getCookie('lastSection');
const partyId = getCookie('currentPartyId');
const symbolBtn = document.getElementById('symbol');
const shopBtn = document.getElementById('shopBtn');
const reportBtn = document.getElementById('reportBtn');
const dataBtn = document.getElementById('dataBtn');
const menuBox = document.getElementById('menuBox');
const menu = document.getElementById('menu');
const menuItems = document.querySelectorAll('.menu-item');
const partyHeaderInfo = document.getElementById('partyHeaderInfo');
const partyNameSpan = document.getElementById('partyNameSpan');
const partyIdSpan = document.getElementById('partyIdSpan');
const partyPlaceSpan = document.getElementById('partyPlaceSpan');
const partyDatesSpan = document.getElementById('partyDatesSpan');
const partyStatusSpan = document.getElementById('partyStatusSpan');

document.addEventListener('DOMContentLoaded', interfaceStarter(lastSection));

shopBtn.addEventListener('click', () => {
  sectionSelector('pointofsale');
});

reportBtn.addEventListener('click', () => {
  sectionSelector('report');
});

dataBtn.addEventListener('click', () => {
  sectionSelector('data');
});

function interfaceStarter (section) {
  console.log('Current Party ID:', partyId);
  if (partyId) {
    screenBox.setAttribute('id-info', partyId);
  }
  fetch(`/shop/partybyid/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.json();
    })
    .then(res => {
      fillShop(res);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  sectionSelector(section);
}

function fillShop (party) {
  const id = party.party_id;
  const name = party.party_name;
  const place = party.party_place;
  const city = party.party_city;
  const startDate = new Date(party.party_startDate);
  const startYear = startDate.getFullYear();
  const startMonth = getMonthName(startDate);
  const startDay = startDate.getDate();
  const endDate = new Date(party.party_endDate);
  const endYear = new Date(endDate).getFullYear();
  const endMonth = getMonthName(endDate);
  const endDay = endDate.getDate();
  const status = party.party_state;
  partyHeaderInfo.innerHTML = `
  ${name}, ${startYear}
  `;
  partyNameSpan.innerHTML = `${name}`;
  partyIdSpan.innerHTML = `${id}`;
  partyPlaceSpan.innerHTML = `${place}, ${city}`;
  partyDatesSpan.innerHTML = `
    ${startDay === endDay && startMonth === endMonth && startYear === endYear
    ? `${startDay} de ${startMonth} del ${startYear}`
    : startYear === endYear
    ? `Del ${startDay} de ${startMonth} al ${endDay} de ${endMonth} del ${endYear}`
    : `Del ${startDay} de ${startMonth} del ${startYear} al ${endDay} de ${endMonth} del ${endYear}`}`;
  partyStatusSpan.innerHTML = `Estado: ${status}`;
}

function sectionSelector (section) {
  if (section) {
    loadCSS(`/css/shop/${section}/styles.css`);
    selectBtn(section);
    setSectionCookie(section);

    if (section === 'report') {
      fetchShopData();
    }
    if (section === 'pointofsale') {
      fetchPosData();
    }
  } else {
    loadCSS('/css/shop/data/styles.css');
    selectBtn('shop');
    setSectionCookie('data');
  }
}

function fetchShopData () {
  console.log('Fetching Report data');
}

function fetchPosData () {
  console.log('POS init');
}

function loadCSS (href) {
  const cssModule = document.getElementById('cssModule');
  if (cssModule) {
    cssModule.href = href;
  } else {
    createLink(href);
  }
}

function createLink (href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.id = 'cssModule';
  document.head.appendChild(link);
}

function selectBtn (section) {
  menuItems.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.classList.contains(`${section}`)) {
      btn.classList.add('active');
    }
  });
}

symbolBtn.addEventListener('click', toggleMenu);

function toggleMenu () {
  menuBox.classList.toggle('open');
  showItems();
}

function showItems () {
  if (menu.classList.contains('hide')) {
    setTimeout(change, 300);
  } else {
    change();
  }
}

function change () {
  menu.classList.toggle('hide');
  menu.classList.toggle('appear');
}

function getMonthName (date) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[date.getMonth()];
}

function setSectionCookie (value) {
  const sixteenHours = 16 * 60 * 60;
  document.cookie = `lastSection=${value}; max-age=${sixteenHours}; path=/`;
  console.log(`Current section: ${value}`);
}

// Función para obtener el valor de una cookie
function getCookie (name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
