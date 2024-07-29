//  #region Interface
export const askProductTypeScreen = document.getElementById('askProductTypeScreen');

export const goBackBtnFZ = document.getElementById('goBack');

goBackBtnFZ.addEventListener('click', function () {
  window.location.href = '/fullstorage/addfullstorage';
});
