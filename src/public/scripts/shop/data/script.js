export const closeWinBtn = document.getElementById('closeDataWin');

const dataOptionBtn = document.querySelectorAll('.dataOptionBtn');
const artModules = document.querySelectorAll('.articleBox');
const sectionView = document.getElementById('sectionDataView');

dataOptionBtn.forEach((button, index) => {
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
