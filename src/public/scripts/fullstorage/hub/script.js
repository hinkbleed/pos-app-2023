// #region CONSTANTS
const exitBtn = document.getElementById('goBack');

const productsSwitch = document.querySelectorAll('.product-switch');
const switchCheck = document.querySelectorAll('.switch-check');
const allProductsSwitch = document.getElementById('allProductsSwitch');

const booksExistenceBox = document.getElementById('booksExistenceBox');
const separsExistenceBox = document.getElementById('separsExistenceBox');
const magsExistenceBox = document.getElementById('magsExistenceBox');
const nonSelection = document.getElementById('nonSelection');

const addFullstorageBtn = document.getElementById('addToFullstorageBtn');
const askBtnZero = document.getElementById('askBtnZero');
const askBtnDatabase = document.getElementById('askBtnDatabase');

// #region LISTENERS
document.addEventListener('DOMContentLoaded', initFullstorageWin);

exitBtn.addEventListener('click', function () {
  window.location.href = '/home';
});

allProductsSwitch.addEventListener('change', function () {
  if (this.checked) {
    productsSwitch.forEach(checkbox => {
      checkbox.checked = true;
    });
  } else {
    productsSwitch.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
  checkPathSelector();
}
);

productsSwitch.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (!this.checked) {
      allProductsSwitch.checked = false;
    }

    const allChecked = Array.from(productsSwitch).every(checkbox => checkbox.checked);
    if (allChecked) {
      allProductsSwitch.checked = true;
    }
    checkPathSelector();
  });
});

addFullstorageBtn.addEventListener('click', addToFullstorage);
askBtnZero.addEventListener('click', startAddFromZero);
askBtnDatabase.addEventListener('click', startAddDatabase);

// #region FUNCTIONS
// #region init
function initFullstorageWin () {
  markAllSwitchesOn();
  checkPathSelector();
}

function markAllSwitchesOn () {
  switchCheck.forEach(checkbox => {
    checkbox.checked = true;
  });
}

function checkPathSelector () {
  const results = {};

  switchCheck.forEach(checkbox => {
    results[checkbox.parentNode.textContent.trim()] = checkbox.checked;
  });
  choosePath(results);
}

function choosePath (results) {
  const booksChecked = results.Libros;
  const separsChecked = results.Separadores;
  const magsChecked = results.Revistas;

  if (!booksChecked && !separsChecked && !magsChecked) {
    noSelection();
  } else {
    if (!booksChecked) {
      noBooks();
    }
    if (!separsChecked) {
      noSepars();
    }
    if (!magsChecked) {
      noMags();
    }
    if (booksChecked) {
      viewBooks();
    }
    if (separsChecked) {
      viewSepars();
    }
    if (magsChecked) {
      viewMags();
    }
  }
}

function noBooks () {
  booksExistenceBox.innerHTML = '';
  booksExistenceBox.classList.add('hide');
}

function noSepars () {
  separsExistenceBox.innerHTML = '';
  separsExistenceBox.classList.add('hide');
}
function noMags () {
  magsExistenceBox.innerHTML = '';
  magsExistenceBox.classList.add('hide');
}

function noSelection () {
  noBooks();
  noSepars();
  noMags();
  nonSelection.classList.add('active');
}

function viewBooks () {
  nonSelection.classList.remove('active');
  fetch('/fullstorage/products/books/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      booksExistenceBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  booksExistenceBox.classList.remove('hide');
}

function viewSepars () {
  nonSelection.classList.remove('active');
  fetch('/fullstorage/products/separs/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      separsExistenceBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  separsExistenceBox.classList.remove('hide');
}

function viewMags () {
  nonSelection.classList.remove('active');
  fetch('/fullstorage/products/mags/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      magsExistenceBox.innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  magsExistenceBox.classList.remove('hide');
}

function addToFullstorage () {
  window.location.href = '/fullstorage/addfullstorage';
}

function startAddFromZero () {
  window.location.href = '/fullstorage/addfromzero';
}

function startAddDatabase () {
  window.location.href = '/fullstorage/addfullstorage';
}
