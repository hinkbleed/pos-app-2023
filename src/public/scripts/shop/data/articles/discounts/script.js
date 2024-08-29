import { closeWinBtn } from '../../script.js';

const DiscountsBtn = document.getElementById('viewDiscounts');
const discountBoxes = document.getElementById('discountBoxes');
const addDiscountBtn = document.getElementById('addDiscountBtn');
const addDiscountsScreens = document.querySelector('.addDiscountsScreens');
const addDiscountToDBScreen = document.querySelector('.addDiscountToDBScreen');
const cancelAddDiscountToDBBtn = document.getElementById('cancelAddDiscountToDBBtn');
const addDiscountToDBForm = document.getElementById('addDiscountToDBForm');
const deleteDiscountFromDBScreen = document.querySelector('.deleteDiscountFromDBScreen');
const deleteDiscountNameTag = document.getElementById('deleteDiscountNameTag');
const cancelDeleteDiscountFromDBBtn = document.getElementById('cancelDeleteDiscountFromDBBtn');
const AcceptDeleteDiscountFromDBBtn = document.getElementById('AcceptDeleteDiscountFromDBBtn');

DiscountsBtn.addEventListener('click', startDiscountsView);
addDiscountBtn.addEventListener('click', startAddDiscount);
cancelAddDiscountToDBBtn.addEventListener('click', cancelAddDiscount);

addDiscountToDBForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendDiscountToDB();
});

cancelDeleteDiscountFromDBBtn.addEventListener('click', cancelDeleteDiscount);
function startDiscountsView () {
  fetch('/shop/discounts/getall')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      discountBoxes.innerHTML = html;
      const discountCards = document.querySelectorAll('.optionsViewToggle');
      discountCards.forEach(card => {
        card.addEventListener('click', showDiscountOptions);
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

AcceptDeleteDiscountFromDBBtn.addEventListener('click', () => {
  const discountId = deleteDiscountNameTag.getAttribute('id-info');
  fetchDiscountDeletion(discountId);
});

function startAddDiscount () {
  closeWinBtn.classList.add('hide');
  addDiscountToDBScreen.classList.add('active');
  addDiscountsScreens.classList.add('active');
  addDiscountToDBForm.reset();
}

function cancelAddDiscount () {
  closeWinBtn.classList.remove('hide');
  addDiscountToDBScreen.classList.remove('active');
  addDiscountsScreens.classList.remove('active');
  addDiscountToDBForm.reset();
}

function getSendDiscountToDB () {
  const amount = document.getElementById('discountAmountInput').value;
  const kind = document.getElementById('discountKindInput').value;

  const data = {
    discount_amount: Number(amount),
    discount_kind: kind
  };
  addDiscountToDB(data);
}

function addDiscountToDB (data) {
  fetch('/shop/discounts/add', {
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
        startAfterAddDiscount();
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterAddDiscount () {
  closeWinBtn.classList.remove('hide');
  addDiscountToDBScreen.classList.remove('active');
  addDiscountsScreens.classList.remove('active');
  addDiscountToDBForm.reset();
  startDiscountsView();
}

function showDiscountOptions (event) {
  const productCardElement = event.target.closest('.discount-card');
  const editAskElement = productCardElement.querySelector('.discountOptions-ask');
  editAskElement.classList.toggle('active');
  const deleteDiscountBtn = editAskElement.querySelector('.deleteDiscountBtn');
  const discountId = productCardElement.querySelector('.cardDiscountKind').getAttribute('id-info').trim();
  deleteDiscountBtn.addEventListener('click', () => startDeleteDiscount(discountId));
}

function startDeleteDiscount (discountId) {
  closeWinBtn.classList.add('hide');
  deleteDiscountFromDBScreen.classList.add('active');
  addDiscountsScreens.classList.add('active');
  deleteDiscountNameTag.setAttribute('id-info', discountId);
}

function cancelDeleteDiscount () {
  closeWinBtn.classList.remove('hide');
  deleteDiscountFromDBScreen.classList.remove('active');
  addDiscountsScreens.classList.remove('active');
  deleteDiscountNameTag.setAttribute('id-info', '');
}

function fetchDiscountDeletion (discountId) {
  fetch(`/shop/discounts/delete/${discountId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor.');
      }

      if (response.ok) {
        startAfterDeleteDiscount();
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startAfterDeleteDiscount () {
  closeWinBtn.classList.remove('hide');
  deleteDiscountFromDBScreen.classList.remove('active');
  addDiscountsScreens.classList.remove('active');
  deleteDiscountNameTag.setAttribute('id-info', '');
  startDiscountsView();
}
