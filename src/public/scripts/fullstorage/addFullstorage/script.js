export const goBackBtnFDB = document.getElementById('goBack');

const addFromZeroBtn = document.getElementById('addFromZeroBtn');

export const addFullstorageView = document.getElementById('addFullstorageView');

export const headerView = document.getElementById('headerView');

goBackBtnFDB.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

addFromZeroBtn.addEventListener('click', initFromZero);

function initFromZero () {
  window.location.href = '/fullstorage/addfromzero';
}
