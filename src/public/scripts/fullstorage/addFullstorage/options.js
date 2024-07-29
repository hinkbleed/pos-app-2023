import { addBookToFullstorageForm, fillAddBookToFullstorageForm } from './book/add.js';
import { addMagToFullstorageForm, fillAddMagToFullstorageForm } from './mag/add.js';
import { addSeparToFullstorageForm, fillAddSeparToFullstorageForm } from './separ/add.js';

export function getOptions () {
  document.querySelectorAll('.book-toggle-btn').forEach(card => {
    card.addEventListener('click', showBookOptions);
  });
  document.querySelectorAll('.separ-toggle-btn').forEach(card => {
    card.addEventListener('click', showSeparOptions);
  });
  document.querySelectorAll('.mag-toggle-btn').forEach(card => {
    card.addEventListener('click', showMagOptions);
  });
}

function showBookOptions (event) {
  const bookMenuElement = event.target.closest('.product-card').querySelector('.productOptions-menu');
  bookMenuElement.classList.toggle('active');

  const addBookToFullstorageBtn = bookMenuElement.querySelector('.addBookToFullstorageBtn');

  addBookToFullstorageBtn.addEventListener('click', showAddBookToFullstorage);
}

function showSeparOptions (event) {
  const separMenuElement = event.target.closest('.product-card').querySelector('.productOptions-menu');
  separMenuElement.classList.toggle('active');

  const addSeparToFullstorageBtn = separMenuElement.querySelector('.addSeparToFullstorageBtn');

  addSeparToFullstorageBtn.addEventListener('click', showAddSeparToFullstorage);
}

function showMagOptions (event) {
  const magMenuElement = event.target.closest('.product-card').querySelector('.productOptions-menu');
  magMenuElement.classList.toggle('active');

  const addMagToFullstorageBtn = magMenuElement.querySelector('.addMagToFullstorageBtn');

  addMagToFullstorageBtn.addEventListener('click', showAddMagToFullstorage);

  /*
  const editMagBtn = editAskElement.querySelector('.editMagBtn');
  const addMagToPartyBtn = editAskElement.querySelector('.addMagToPartyBtn');

  editMagBtn.addEventListener('click', startEditMag);
  addMagToPartyBtn.addEventListener('click', startAddToPartyMag);
  */
}

function showAddBookToFullstorage (event) {
  const bookId = event.target.closest('.product-card').querySelector('.cardBookEDQid').textContent;
  const bookName = event.target.closest('.product-card').querySelector('.cardBookName').textContent;

  addBookToFullstorageForm.reset();

  fillAddBookToFullstorageForm(bookId, bookName);
}

function showAddSeparToFullstorage (event) {
  const separId = event.target.closest('.product-card').querySelector('.cardSeparEDQid').textContent;
  const separName = event.target.closest('.product-card').querySelector('.cardSeparName').textContent;

  addSeparToFullstorageForm.reset();

  fillAddSeparToFullstorageForm(separId, separName);
}

function showAddMagToFullstorage (event) {
  const magId = event.target.closest('.product-card').querySelector('.cardMagazineEDQid').textContent;
  const magName = event.target.closest('.product-card').querySelector('.cardMagazineName').textContent;

  addMagToFullstorageForm.reset();

  fillAddMagToFullstorageForm(magId, magName);
}
