const askBtnSepar = document.getElementById('askBtnSepar');
const addSeparScreen = document.getElementById('addSeparScreen');
const cancelAddSeparBtn = document.getElementById('cancelAddSeparBtn');

askBtnSepar.addEventListener('click', showAddSeparScreen);

function showAddSeparScreen () {
  addSeparScreen.classList.add('active');
}

cancelAddSeparBtn.addEventListener('click', cancelAddSeparScreen);

function cancelAddSeparScreen () {
  addSeparScreen.classList.remove('active');
}
