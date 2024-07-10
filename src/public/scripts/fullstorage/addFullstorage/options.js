export function getOptions () {
  document.querySelectorAll('.book-toggle-btn').forEach(card => {
    card.addEventListener('click', showBookOptions);
  });
}

function showBookOptions (event) {
  const optionsMenuElement = event.target.closest('.product-card').querySelector('.productOptions-menu');
  optionsMenuElement.classList.toggle('active');

  /*
  const editBookBtn = editAskElement.querySelector('.editBookBtn');
  const addBookToPartyBtn = editAskElement.querySelector('.addBookToPartyBtn');

  editBookBtn.addEventListener('click', startEditBook);
  addBookToPartyBtn.addEventListener('click', startAddToPartyBook);
  */
}
