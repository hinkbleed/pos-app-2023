export const goBackBtnFDB = document.getElementById('goBack');

const addFromZeroBtn = document.getElementById('addFromZeroBtn');

const addFromFileBtn = document.getElementById('addFromFileBtn');

export const addFullstorageView = document.getElementById('addFullstorageView');

export const headerView = document.getElementById('headerView');

goBackBtnFDB.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

addFromZeroBtn.addEventListener('click', initFromZero);

addFromFileBtn.addEventListener('click', initFromFile);

function initFromZero () {
  window.location.href = '/fullstorage/addfromzero';
}

function initFromFile () {
  window.location.href = '/fullstorage/addfromfile';
}
