import { screenBox } from '../interface/script.js';

const detailsBtn = document.querySelectorAll('.details-btn');
const detailsModule = document.querySelectorAll('.details-box-module');

export function fetchReportTickets (partyId) {
  const ventasBoxModule = document.getElementById('ventasBoxModule');
  fetch(`/shop/report/tickets/all/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los tickets');
      }
      return response.text();
    })
    .then(html => {
      ventasBoxModule.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

export function fetchReportBalance (partyId) {
  const balanceBoxModule = document.getElementById('balanceBoxModule');
  fetch(`/shop/report/balance/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los tickets');
      }
      return response.text();
    })
    .then(html => {
      balanceBoxModule.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

export function fetchReportPayments (partyId) {
  const pagosBoxModule = document.getElementById('pagosBoxModule');
  fetch(`/shop/report/payments/all/${partyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los tickets');
      }
      return response.text();
    })
    .then(html => {
      pagosBoxModule.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function changeReportModule (item) {
  detailsBtn.forEach((btn) => btn.classList.remove('active'));
  item.classList.add('active');
}

detailsBtn.forEach((item, index) => {
  item.addEventListener('click', () => {
    const itemId = item.id;
    const partyId = screenBox.getAttribute('id-info');
    if (itemId === 'ticketsReportBtn') {
      fetchReportTickets(partyId);
    }
    if (itemId === 'paymentsReportBtn') {
      fetchReportPayments(partyId);
    }
    detailsModule.forEach((module) => {
      module.style.display = 'none';
    });
    detailsModule[index].style.display = 'flex';
    changeReportModule(item);
  });
});
