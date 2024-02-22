console.log('report');
const detailsBtn = document.querySelectorAll('.details-btn');
const detailsModule = document.querySelectorAll('.details-box-module');

function changeReportModule (item) {
  detailsBtn.forEach((btn) => btn.classList.remove('active'));
  item.classList.add('active');
}

detailsBtn.forEach((item, index) => {
  item.addEventListener('click', () => {
    detailsModule.forEach((module) => {
      module.style.display = 'none';
    });
    detailsModule[index].style.display = 'flex';
    changeReportModule(item);
  });
});
