//  #region Interface
export const goBackBtn = document.getElementById('goBack');

goBackBtn.addEventListener('click', function () {
  window.history.back();
});
