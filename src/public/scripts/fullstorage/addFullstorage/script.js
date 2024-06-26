const exitBtn = document.getElementById('goBack');

const addFromZeroBtn = document.getElementById('addFromZeroBtn');

exitBtn.addEventListener('click', function () {
  window.location.href = '/fullstorage';
});

addFromZeroBtn.addEventListener('click', initFromZero);

function initFromZero () {
  window.location.href = '/fullstorage/addfromzero';
}
