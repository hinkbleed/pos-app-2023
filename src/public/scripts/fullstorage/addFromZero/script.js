//  #region Interface
export const goBackBtn = document.getElementById('goBack');

export const askProductTypeScreen = document.getElementById('askProductTypeScreen');

goBackBtn.addEventListener('click', function () {
  window.location.href = '/fullstorage/addfullstorage';
});
