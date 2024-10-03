import { screenBox } from '../interface/script.js';

const partyId = screenBox.getAttribute('id-info');
const posSearchTypingInput = document.getElementById('posSearchTypingInput');
const itemBoxAdvertise = document.getElementById('itemBoxAdvertise');
const posInfoBox = document.getElementById('posInfoBox');
const posQueryResults = document.getElementById('posQueryResults');
const posResultsBox = document.getElementById('posResultsBox');
const shopListProducts = document.getElementById('shopListProducts');

const acceptPaymentBtn = document.getElementById('acceptPaymentBtn');

const saleScreens = document.getElementById('saleScreens');
const confirmSaleScreen = document.getElementById('confirmSaleScreen');
const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
const ticketList = document.getElementById('ticketList');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');

const ticketWrongDone = document.getElementById('ticketWrongDone');
const ticketWellDone = document.getElementById('ticketWellDone');

const giveMoneyBtn = document.getElementById('giveMoneyBtn');
const giveMoneyScreens = document.getElementById('giveMoneyScreens');
const giveMoneyForm = document.getElementById('giveMoneyForm');
const cancelNewGiveMoneyBtn = document.getElementById('cancelNewGiveMoneyBtn');

let typingTimer;

posSearchTypingInput.addEventListener('input', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    posSearchLog();
  }, 600);
});

acceptPaymentBtn.addEventListener('click', startNewTicket);

cancelPaymentBtn.addEventListener('click', cancelNewTicket);

confirmPaymentBtn.addEventListener('click', startSaveNewTicket);

giveMoneyBtn.addEventListener('click', startNewGiveMoneyScreen);

cancelNewGiveMoneyBtn.addEventListener('click', cancelGiveMoneyScreen);

giveMoneyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSendNewGiveMoney();
});

function posSearchLog () {
  const query = posSearchTypingInput.value.trim() || 'emptyquerystring';
  console.log(query);

  if (query === 'emptyquerystring') {
    itemBoxAdvertise.classList.add('active');
    posInfoBox.classList.remove('active');
    posQueryResults.classList.remove('active');
  } else {
    itemBoxAdvertise.classList.remove('active');
    posInfoBox.classList.remove('active');
    posQueryResults.classList.remove('active');
    fetchPosInputProducts(query);
  }
}

function fetchPosInputProducts (query) {
  fetch(`/shop/pos/search/${partyId}/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      console.log(`${query} results.`);
      showPosQueryResults(html);
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function showPosQueryResults (html) {
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = html;
  const productCards = tempContainer.querySelectorAll('.posProduct-card');
  const numberOfProductCards = productCards.length;
  console.log(`Products in this party: ${numberOfProductCards}`);
  posResultsBox.innerHTML = html;
  posQueryResults.classList.add('active');

  if (numberOfProductCards === 1) {
    activePosOneProductFunctions();
  } else if (numberOfProductCards > 1) {
    activePosAddingFunctions();
  } else {
    posResultsBox.innerHTML = '<div class="noresult">No hay productos asignados a este evento para tu búsqueda</div>';
    posQueryResults.classList.add('active');
  }
}

function activePosAddingFunctions () {
  const posProductCard = document.querySelectorAll('.posProduct-card');
  posProductCard.forEach(card => {
    card.addEventListener('click', function (e) {
      getSendProductToListBox(e);
    });
  });
}

function activePosOneProductFunctions () {
  const posProductCard = document.querySelectorAll('.posProduct-card');
  const firstCard = posProductCard[0];
  firstCard.addEventListener('click', function (e) {
    getSendProductToListBox(e);
  });
  firstCard.click();
}

function getSendProductToListBox (event) {
  const productCardElement = event.target.closest('.posProduct-card');
  const typeInfo = productCardElement.getAttribute('type-info');

  if (typeInfo === 'book') {
    const bookName = productCardElement.querySelector('.productName').textContent.trim();
    const bookInfo = productCardElement.querySelector('.productInfo').textContent.trim();
    const bookMoreInfo = productCardElement.querySelector('.productKind').textContent.trim();
    const [bookKind, bookEditorial] = bookMoreInfo.split(',').map(item => item.trim());
    const bookId = productCardElement.querySelector('.productId').textContent.trim();
    const bookAmount = productCardElement.querySelector('.productAmount').textContent.trim();
    const bookPrice = productCardElement.querySelector('.productPrice').textContent.trim();
    const bookBarcode = productCardElement.querySelector('.productBarcode').textContent.trim();

    const data = {
      book_name: bookName,
      book_info: bookInfo,
      book_kind: bookKind,
      book_editorial: bookEditorial,
      book_id: bookId,
      book_amount: bookAmount,
      book_price: parseFloat(bookPrice.replace('$', '').replace(',', '')),
      book_barcode: bookBarcode
    };
    addBookToListBox(data);
  }

  if (typeInfo === 'separator') {
    const separName = productCardElement.querySelector('.productName').textContent.trim();
    const separInfo = productCardElement.querySelector('.productInfo').textContent.trim();
    const separId = productCardElement.querySelector('.productId').textContent.trim();
    const separAmount = productCardElement.querySelector('.productAmount').textContent.trim();
    const separPrice = productCardElement.querySelector('.productPrice').textContent.trim();
    const separBarcode = productCardElement.querySelector('.productBarcode').textContent.trim();

    const data = {
      separ_name: separName,
      separ_info: separInfo,
      separ_id: separId,
      separ_amount: separAmount,
      separ_price: parseFloat(separPrice.replace('$', '').replace(',', '')),
      separ_barcode: separBarcode
    };
    addSeparToListBox(data);
  }

  if (typeInfo === 'magazine') {
    const magName = productCardElement.querySelector('.productName').textContent.trim();
    const magInfo = productCardElement.querySelector('.productInfo').textContent.trim();
    const magId = productCardElement.querySelector('.productId').textContent.trim();
    const magAmount = productCardElement.querySelector('.productAmount').textContent.trim();
    const magPrice = productCardElement.querySelector('.productPrice').textContent.trim();
    const magBarcode = productCardElement.querySelector('.productBarcode').textContent.trim();

    const data = {
      mag_name: magName,
      mag_info: magInfo,
      mag_id: magId,
      mag_amount: magAmount,
      mag_price: parseFloat(magPrice.replace('$', '').replace(',', '')),
      mag_barcode: magBarcode
    };
    addMagToListBox(data);
  }
  posSearchTypingInput.value = '';
}

function addBookToListBox (data) {
  const existingProduct = shopListProducts.querySelector(`.ticketRow[data-id="${data.book_id}"]`);

  if (existingProduct) {
    const amountElement = existingProduct.querySelector('.amount-numb');
    let currentAmount = parseInt(amountElement.textContent, 10);
    currentAmount += 1;
    amountElement.textContent = currentAmount;
    const price = parseFloat(existingProduct.querySelector('.itemPrice').textContent.replace('$', ''));
    const subtotalElement = existingProduct.querySelector('.itemSubtotal');
    subtotalElement.textContent = `$${(currentAmount * price).toFixed(2)}`;
    calculateTotalSubtotal();
  } else {
    const currentProducts = shopListProducts.querySelectorAll('.ticketRow');
    const newPosition = currentProducts.length + 1;
    const structuredProduct = `
      <div class="ticketRow" data-id="${data.book_id}" data-barcode="${data.book_barcode}" data-type="book">
        <div class="shopBodyItem itemPosition">${newPosition}</div>
        <div class="shopBodyItem itemName" product-info="${data.book_info}" product-kind="${data.book_kind}" product-editorial="${data.book_editorial}">${data.book_name}, ${data.book_kind} ${data.book_editorial}</div>
        <div class="shopBodyItem itemPrice">$${(data.book_price).toFixed(2)}</div>
        <div class="shopBodyItem itemAmount">
          <div class="amount-btn less">-</div>
          <div class="amount-btn amount-numb">1</div>
          <div class="amount-btn more">+</div>
        </div>
        <div class="shopBodyItem itemSubtotal">$${(data.book_price).toFixed(2)}</div>
        <div class="shopBodyItem itemDiscount">
          <select class="selectDiscount">
          </select>
        </div>
      </div>
    `;
    shopListProducts.innerHTML += structuredProduct;
    updateShopUI();
  }
}

function addSeparToListBox (data) {
  const existingProduct = shopListProducts.querySelector(`.ticketRow[data-id="${data.separ_id}"]`);
  if (existingProduct) {
    const amountElement = existingProduct.querySelector('.amount-numb');
    let currentAmount = parseInt(amountElement.textContent, 10);
    currentAmount += 1;
    amountElement.textContent = currentAmount;
    const price = parseFloat(existingProduct.querySelector('.itemPrice').textContent.replace('$', ''));
    const subtotalElement = existingProduct.querySelector('.itemSubtotal');
    subtotalElement.textContent = `$${(currentAmount * price).toFixed(2)}`;
    calculateTotalSubtotal();
  } else {
    const currentProducts = shopListProducts.querySelectorAll('.ticketRow');
    const newPosition = currentProducts.length + 1;
    const structuredProduct = `
      <div class="ticketRow" data-id="${data.separ_id}" data-barcode="${data.separ_barcode}" data-type="separator">
        <div class="shopBodyItem itemPosition">${newPosition}</div>
        <div class="shopBodyItem itemName" product-info="${data.separ_info}">${data.separ_name}</div>
        <div class="shopBodyItem itemPrice">$${(data.separ_price).toFixed(2)}</div>
        <div class="shopBodyItem itemAmount">
          <div class="amount-btn less">-</div>
          <div class="amount-btn amount-numb">1</div>
          <div class="amount-btn more">+</div>
        </div>
        <div class="shopBodyItem itemSubtotal">$${(data.separ_price).toFixed(2)}</div>
        <div class="shopBodyItem itemDiscount">
          <select class="selectDiscount">
          </select>
        </div>
      </div>
    `;
    shopListProducts.innerHTML += structuredProduct;
    updateShopUI();
  }
}

function addMagToListBox (data) {
  const existingProduct = shopListProducts.querySelector(`.ticketRow[data-id="${data.mag_id}"]`);
  if (existingProduct) {
    const amountElement = existingProduct.querySelector('.amount-numb');
    let currentAmount = parseInt(amountElement.textContent, 10);
    currentAmount += 1;
    amountElement.textContent = currentAmount;
    const price = parseFloat(existingProduct.querySelector('.itemPrice').textContent.replace('$', ''));
    const subtotalElement = existingProduct.querySelector('.itemSubtotal');
    subtotalElement.textContent = `$${(currentAmount * price).toFixed(2)}`;
    calculateTotalSubtotal();
  } else {
    const currentProducts = shopListProducts.querySelectorAll('.ticketRow');
    const newPosition = currentProducts.length + 1;
    const structuredProduct = `
      <div class="ticketRow" data-id="${data.mag_id}" data-barcode="${data.mag_barcode}" data-type="magazine">
        <div class="shopBodyItem itemPosition">${newPosition}</div>
        <div class="shopBodyItem itemName" product-info="${data.mag_info}">${data.mag_name}</div>
        <div class="shopBodyItem itemPrice">$${(data.mag_price).toFixed(2)}</div>
        <div class="shopBodyItem itemAmount">
          <div class="amount-btn less">-</div>
          <div class="amount-btn amount-numb">1</div>
          <div class="amount-btn more">+</div>
        </div>
        <div class="shopBodyItem itemSubtotal">$${(data.mag_price).toFixed(2)}</div>
        <div class="shopBodyItem itemDiscount">
          <select class="selectDiscount">
          </select>
        </div>
      </div>
    `;
    shopListProducts.innerHTML += structuredProduct;
    updateShopUI();
  }
}

function updateShopUI () {
  const ticketRows = document.querySelectorAll('.ticketRow');
  activeColorFunctions(ticketRows);
  activeAmountFunctions(ticketRows);
  activeDiscountFunctions(ticketRows);
  calculateTotalSubtotal();
}

function activeColorFunctions (ticketRows) {
  ticketRows.forEach(function (row) {
    const showBtn = row.querySelector('.itemName');
    showBtn.addEventListener('click', function () {
      const productType = row.getAttribute('data-type');

      if (productType === 'book') {
        const bookName = row.querySelector('.itemName').textContent.trim();
        const bookDetails = row.querySelector('.itemName').getAttribute('product-info');
        const bookKind = row.querySelector('.itemName').getAttribute('product-kind');
        const bookPrice = row.querySelector('.itemPrice').textContent.replace('$', '').trim();
        const bookBarcode = row.getAttribute('data-barcode');
        const bookId = row.getAttribute('data-id');
        posInfoBox.innerHTML = `
        <div class="posItemInfo" id="posItemTitle">${bookName}</div>
        <div class="posItemInfo" id="posItemDetails">${bookDetails}</div>
        <div class="posItemInfo" id="posItemKind">${bookKind}, <div class="productId">${bookId}</div></div>
        <div class="posItemInfo" id="posItemPrice"><span>${bookPrice}</span> MXN</div>
        <div class="posItemInfo" id="posCodebarNumber">${bookBarcode}</div>
      `;
      }
      posInfoBox.classList.add('active');
      posQueryResults.classList.remove('active');
      itemBoxAdvertise.classList.remove('active');
    });
    row.addEventListener('click', function () {
      ticketRows.forEach(function (row) {
        row.classList.remove('selected');
      });
      this.classList.add('selected');
    });
  });
}

function activeAmountFunctions (ticketRows) {
  ticketRows.forEach(row => {
    const lessBtn = row.querySelector('.less');
    const moreBtn = row.querySelector('.more');
    const amountNumb = row.querySelector('.amount-numb');
    const price = parseFloat(row.querySelector('.itemPrice').textContent.replace('$', ''));
    const subtotalElement = row.querySelector('.itemSubtotal');
    function getCurrentDiscount () {
      const discountSelect = row.querySelector('.selectDiscount');
      return discountSelect ? parseFloat(discountSelect.value) || 0 : 0;
    }
    lessBtn.addEventListener('click', function () {
      let currentAmount = parseInt(amountNumb.textContent);
      if (currentAmount > 0) {
        currentAmount--;
        amountNumb.textContent = currentAmount;
        const discount = getCurrentDiscount();
        updateSubtotal(subtotalElement, currentAmount, price, discount);
      }
      if (currentAmount === 0) {
        row.remove();
        updatePositions();
        calculateTotalSubtotal();
      }
    });
    moreBtn.addEventListener('click', function () {
      let currentAmount = parseInt(amountNumb.textContent);
      currentAmount++;
      amountNumb.textContent = currentAmount;
      const discount = getCurrentDiscount();
      updateSubtotal(subtotalElement, currentAmount, price, discount);
    });
  });
}

function activeDiscountFunctions (ticketRows) {
  fetch('/shop/pos/discounts/alltorows')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      ticketRows.forEach(row => {
        const discountElement = row.querySelector('.itemDiscount');
        const discountSelect = discountElement.querySelector('.selectDiscount');
        discountSelect.innerHTML = `
          <option>0%</option>
          ${html}
        `;
        discountSelect.addEventListener('change', () => {
          processNewDiscountValue(row, discountSelect);
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}

function processNewDiscountValue (row, discountSelect) {
  const selectedDiscount = parseFloat(discountSelect.value);
  const amountNumb = row.querySelector('.amount-numb');
  const price = parseFloat(row.querySelector('.itemPrice').textContent.replace('$', ''));
  const subtotalElement = row.querySelector('.itemSubtotal');
  const currentAmount = parseInt(amountNumb.textContent);
  updateSubtotal(subtotalElement, currentAmount, price, selectedDiscount);
}

function updateSubtotal (subtotalElement, amount, price, discount) {
  let subtotal = amount * price;

  if (discount > 0) {
    const discountAmount = subtotal * (discount / 100);
    subtotal = subtotal - discountAmount;
  }

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  calculateTotalSubtotal();
}

function updatePositions () {
  const ticketRows = document.querySelectorAll('.ticketRow');
  ticketRows.forEach((row, index) => {
    const positionElement = row.querySelector('.itemPosition');
    positionElement.textContent = index + 1;
  });
}

function calculateTotalSubtotal () {
  const ticketRows = document.querySelectorAll('.ticketRow');
  let totalSubtotal = 0;

  ticketRows.forEach(row => {
    const subtotalElement = row.querySelector('.itemSubtotal');
    const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
    totalSubtotal += subtotal;
  });
  const totalPriceBox = document.getElementById('totalPriceBox');
  totalPriceBox.innerHTML = `
    $<div id="totalPriceValue">${(totalSubtotal).toFixed(2)}</div>
  `;
  const cardTypingInput = document.getElementById('cardTypingInput');
  const transferTypingInput = document.getElementById('transferTypingInput');
  const cashTypingInput = document.getElementById('cashTypingInput');

  const cardValue = parseFloat(cardTypingInput.value) || 0;
  const transferValue = parseFloat(transferTypingInput.value) || 0;
  const newCashValue = totalSubtotal - (cardValue + transferValue);
  cashTypingInput.value = newCashValue;

  let calculateTimer;
  cardTypingInput.addEventListener('input', () => {
    clearTimeout(calculateTimer);
    calculateTimer = setTimeout(() => {
      updateMethods(totalSubtotal);
    }, 400);
  });
  transferTypingInput.addEventListener('input', () => {
    clearTimeout(calculateTimer);
    calculateTimer = setTimeout(() => {
      updateMethods(totalSubtotal);
    }, 400);
  });
}

function updateMethods (totalSubtotal) {
  const cardTypingInput = document.getElementById('cardTypingInput');
  const transferTypingInput = document.getElementById('transferTypingInput');
  const cashTypingInput = document.getElementById('cashTypingInput');

  const cardValue = parseFloat(cardTypingInput.value) || 0;
  const transferValue = parseFloat(transferTypingInput.value) || 0;
  const newCashValue = totalSubtotal - (cardValue + transferValue);
  cashTypingInput.value = newCashValue;
}

function cancelNewTicket () {
  saleScreens.classList.remove('active');
  confirmSaleScreen.classList.remove('active');
  ticketList.innerHTML = '';
}

function startNewTicket () {
  const organizedData = organizeTicketData();
  const htmlContent = createDivsFromData(organizedData);
  const totalPriceValue = document.getElementById('totalPriceValue').textContent.replace('$', '').trim();
  const cardTypingInput = document.getElementById('cardTypingInput').value;
  const cardValue = cardTypingInput === '' ? 0 : parseFloat(cardTypingInput);
  const transferTypingInput = document.getElementById('transferTypingInput').value;
  const transferValue = transferTypingInput === '' ? 0 : parseFloat(transferTypingInput);
  const cashTypingInput = document.getElementById('cashTypingInput').value;
  const cashValue = cashTypingInput === '' ? 0 : parseFloat(cashTypingInput);
  const paymentMoneyTotal = document.getElementById('paymentMoneyTotal');
  const paymentMoneyCard = document.getElementById('paymentMoneyCard');
  const paymentMoneyTransfer = document.getElementById('paymentMoneyTransfer');
  const paymentMoneyCash = document.getElementById('paymentMoneyCash');
  const paymentMoneyGiven = document.getElementById('paymentMoneyGiven');
  const paymentMoneyChange = document.getElementById('paymentMoneyChange');

  ticketList.innerHTML = htmlContent;
  paymentMoneyTotal.innerHTML = `Cobra $${totalPriceValue}`;
  if (cardValue !== 0) {
    paymentMoneyCard.innerHTML = `En tarjeta ${cardTypingInput} MXN`;
    paymentMoneyCard.classList.add('active');
  }
  if (cardValue === 0) {
    paymentMoneyCard.innerHTML = '';
    paymentMoneyCard.classList.remove('active');
  }

  if (transferValue !== 0) {
    paymentMoneyTransfer.innerHTML = `En Transferencia ${transferTypingInput} MXN`;
    paymentMoneyTransfer.classList.add('active');
  }
  if (transferValue === 0) {
    paymentMoneyTransfer.innerHTML = '';
    paymentMoneyTransfer.classList.remove('active');
  }

  if (cashValue !== 0) {
    paymentMoneyCash.innerHTML = `En efectivo ${cashTypingInput} MXN`;
    paymentMoneyCash.classList.add('active');
  }
  if (cashValue === 0) {
    paymentMoneyCash.innerHTML = '';
    paymentMoneyCash.classList.remove('active');
  }
  saleScreens.classList.add('active');
  confirmSaleScreen.classList.add('active');
  paymentMoneyGiven.addEventListener('input', () => {
    const moneyChange = paymentMoneyGiven.value - cashValue;
    if (moneyChange >= 0) {
      paymentMoneyChange.innerHTML = `Devuelve ${moneyChange.toFixed(2)} MXN`;
    } else {
      paymentMoneyChange.innerHTML = '';
    }
  });
}

function organizeTicketData () {
  const ticketRows = document.querySelectorAll('.ticketRow');
  const organizedData = [];

  ticketRows.forEach(row => {
    const type = row.getAttribute('data-type');

    if (type === 'book') {
      const id = row.getAttribute('data-id');
      const barcode = row.getAttribute('data-barcode');
      const position = row.querySelector('.itemPosition').textContent.trim();
      const name = row.querySelector('.itemName').textContent.trim();
      const productData = row.querySelector('.itemName').getAttribute('product-info');
      const productKind = row.querySelector('.itemName').getAttribute('product-kind');
      const productEditorial = row.querySelector('.itemName').getAttribute('product-editorial');
      const productInfo = `${productData}, ${productKind}, ${productEditorial}`;
      const price = parseFloat(row.querySelector('.itemPrice').textContent.replace('$', '').trim());
      const amount = parseInt(row.querySelector('.amount-numb').textContent.trim());
      const subtotal = parseFloat(row.querySelector('.itemSubtotal').textContent.replace('$', '').trim());
      const discount = parseFloat(row.querySelector('.selectDiscount').value) || 0;

      const rowData = {
        id,
        barcode,
        type,
        position: parseInt(position),
        name,
        productInfo,
        price,
        amount,
        subtotal,
        discount
      };

      organizedData.push(rowData);
    }

    if (type === 'separator') {
      const id = row.getAttribute('data-id');
      const barcode = row.getAttribute('data-barcode');
      const position = row.querySelector('.itemPosition').textContent.trim();
      const name = row.querySelector('.itemName').textContent.trim();
      const productInfo = row.querySelector('.itemName').getAttribute('product-info');
      const price = parseFloat(row.querySelector('.itemPrice').textContent.replace('$', '').trim());
      const amount = parseInt(row.querySelector('.amount-numb').textContent.trim());
      const subtotal = parseFloat(row.querySelector('.itemSubtotal').textContent.replace('$', '').trim());
      const discount = parseFloat(row.querySelector('.selectDiscount').value) || 0;

      const rowData = {
        id,
        barcode,
        type,
        position: parseInt(position),
        name,
        productInfo,
        price,
        amount,
        subtotal,
        discount
      };

      organizedData.push(rowData);
    }

    if (type === 'magazine') {
      const id = row.getAttribute('data-id');
      const barcode = row.getAttribute('data-barcode');
      const position = row.querySelector('.itemPosition').textContent.trim();
      const name = row.querySelector('.itemName').textContent.trim();
      const productInfo = row.querySelector('.itemName').getAttribute('product-info');
      const price = parseFloat(row.querySelector('.itemPrice').textContent.replace('$', '').trim());
      const amount = parseInt(row.querySelector('.amount-numb').textContent.trim());
      const subtotal = parseFloat(row.querySelector('.itemSubtotal').textContent.replace('$', '').trim());
      const discount = parseFloat(row.querySelector('.selectDiscount').value) || 0;

      const rowData = {
        id,
        barcode,
        type,
        position: parseInt(position),
        name,
        productInfo,
        price,
        amount,
        subtotal,
        discount
      };

      organizedData.push(rowData);
    }
  });

  return organizedData;
}

function createDivsFromData (organizedData) {
  return organizedData.map((data, index) => {
    const discountAmount = data.discount > 0 ? (data.price * data.amount * (data.discount / 100)).toFixed(2) : '';

    const discountDiv = data.discount > 0 ? `${data.discount}% - $${discountAmount}` : '';

    const calculatedSubtotal = (data.price * data.amount - discountAmount).toFixed(2);

    return `
      <div class="ticketItem">
        <div class="itemPart ticketPosition">${index + 1}</div>
        <div class="itemPart ticketName">${data.name}</div>
        <div class="itemPart ticketSubtotal">$${calculatedSubtotal}</div>
        <div class="itemPart ticketAmount">${data.amount} ${data.amount === 1 ? 'pieza' : 'piezas'}</div>
        <div class="itemPart ticketPrice">$${data.price.toFixed(2)}</div>
        <div class="itemPart ticketBeforeSubtotal">$${(data.price * data.amount).toFixed(2)}</div>
        <div class="itemPart ticketDiscount">${discountDiv}</div>
      </div>
    `;
  }).join('');
}

function getPaymentInfo () {
  const cardTypingInput = document.getElementById('cardTypingInput').value;
  const cardValue = cardTypingInput === '' ? 0 : parseFloat(cardTypingInput);
  const transferTypingInput = document.getElementById('transferTypingInput').value;
  const transferValue = transferTypingInput === '' ? 0 : parseFloat(transferTypingInput);
  const cashTypingInput = document.getElementById('cashTypingInput').value;
  const cashValue = cashTypingInput === '' ? 0 : parseFloat(cashTypingInput);

  const totalPriceValueText = document.getElementById('totalPriceValue').innerText.trim();
  const totalPriceValue = parseFloat(totalPriceValueText);
  console.log(totalPriceValue);

  return { total: totalPriceValue, card: cardValue, transfer: transferValue, cash: cashValue };
}

function startSaveNewTicket () {
  const productsData = organizeTicketData();
  const paymentInfo = getPaymentInfo();

  const ticketData = { products: productsData, payment: paymentInfo };
  console.log(ticketData);
  fetch(`/shop/pos/ticket/savenew/${partyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticketData)
  })
    .then(response => {
      if (!response.ok) {
        startWrongTicket();
      }
      if (response.ok) {
        startCompletedTicket();
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startWrongTicket () {
  ticketWrongDone.innerHTML = 'Error al guardar compra. Verifica los datos que ingresaste sean correctos o reinicia el sistema. Si no se soluciona el problema, contacta con el programador';
  ticketWrongDone.classList.add('active');
  setTimeout(() => {
    ticketWrongDone.classList.remove('active');
  }, 15000);
}

function startCompletedTicket () {
  shopListProducts.innerHTML = '';
  itemBoxAdvertise.classList.add('active');
  posInfoBox.classList.remove('active');
  posQueryResults.classList.remove('active');

  const cardTypingInput = document.getElementById('cardTypingInput');
  const transferTypingInput = document.getElementById('transferTypingInput');
  const cashTypingInput = document.getElementById('cashTypingInput');
  const totalPriceBox = document.getElementById('totalPriceBox');
  cardTypingInput.value = '';
  transferTypingInput.value = '';
  cashTypingInput.value = '';
  totalPriceBox.innerHTML = '$<div id="totalPriceValue">0.00</div>';

  confirmSaleScreen.classList.remove('active');
  saleScreens.classList.remove('active');
  const paymentMoneyTotal = document.getElementById('paymentMoneyTotal');
  const paymentMoneyCard = document.getElementById('paymentMoneyCard');
  const paymentMoneyTransfer = document.getElementById('paymentMoneyTransfer');
  const paymentMoneyCash = document.getElementById('paymentMoneyCash');
  const paymentMoneyGiven = document.getElementById('paymentMoneyGiven');
  const paymentMoneyChange = document.getElementById('paymentMoneyChange');
  paymentMoneyTotal.innerHTML = '';
  paymentMoneyCard.innerHTML = '';
  paymentMoneyTransfer.innerHTML = '';
  paymentMoneyCash.innerHTML = '';
  paymentMoneyGiven.value = '';
  paymentMoneyChange.innerHTML = '';

  ticketWellDone.innerHTML = '¡Venta Realizada Correctamente!';
  ticketWellDone.classList.add('active');

  setTimeout(() => {
    ticketWellDone.classList.remove('active');
  }, 7000);
}

function startNewGiveMoneyScreen () {
  giveMoneyScreens.classList.add('active');
}

function cancelGiveMoneyScreen () {
  giveMoneyForm.reset();
  giveMoneyScreens.classList.remove('active');
}

function getSendNewGiveMoney () {
  const type = document.getElementById('giveMoneyTypeInput').value;
  const amount = document.getElementById('giveMoneyAmountInput').value;
  const concept = document.getElementById('giveMoneyConceptInput').value;

  const data = {
    pay_type: type,
    pay_amount: Number(amount),
    pay_concept: concept
  };
  createPayment(data);
}

function createPayment (data) {
  console.log(data);
  fetch(`/shop/pos/payment/savenew/${partyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        startWrongPayment();
      }
      if (response.ok) {
        startWellPayment();
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function startWrongPayment () {
  ticketWrongDone.innerHTML = 'Error al guardar el pago. Verifica los datos que ingresaste sean correctos o reinicia el sistema. Si no se soluciona el problema, contacta con el programador';
  ticketWrongDone.classList.add('active');
  setTimeout(() => {
    ticketWrongDone.classList.remove('active');
  }, 15000);
}

function startWellPayment () {
  ticketWellDone.innerHTML = '¡Pago Realizado Correctamente!';
  ticketWellDone.classList.add('active');

  setTimeout(() => {
    ticketWellDone.classList.remove('active');
  }, 7000);
  cancelGiveMoneyScreen();
}
