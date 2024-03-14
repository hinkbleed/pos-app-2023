const askBtnBook = document.getElementById('askBtnBook');
const addBookScreen = document.getElementById('addBookScreen');
const cancelAddBookBtn = document.getElementById('cancelAddBookBtn');

askBtnBook.addEventListener('click', showAddBookScreen);

function showAddBookScreen () {
  addBookScreen.classList.add('active');
}

cancelAddBookBtn.addEventListener('click', cancelAddBookScreen);

function cancelAddBookScreen () {
  addBookScreen.classList.remove('active');
}
