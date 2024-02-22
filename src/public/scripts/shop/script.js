console.log('shop');
const ticketRows = document.querySelectorAll('.ticketRow');

ticketRows.forEach(function (row) {
  row.addEventListener('click', function () {
    ticketRows.forEach(function (row) {
      row.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});
