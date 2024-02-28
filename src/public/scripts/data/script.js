const optionBtn = document.querySelectorAll('.option-btn');
const artModules = document.querySelectorAll('.data-box');
const sectionView = document.getElementById('sectionDataView');
const closeWinBtn = document.getElementById('closeDataWin');

optionBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    sectionView.classList.remove('disappear');
    sectionView.classList.add('active');
    artModules.forEach((module) => {
      module.style.display = 'none';
    });
    artModules[index].style.display = 'flex';
  });
});

closeWinBtn.addEventListener('click', () => {
  sectionView.classList.add('disappear');
  setTimeout(() => {
    sectionView.classList.remove('active');
  }, 300);
});

const mainIndexBtn = document.querySelectorAll('.main-index-btn');

mainIndexBtn.forEach((button) => {
  button.addEventListener('click', () => {
    mainIndexBtn.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
