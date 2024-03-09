const dataconfigLogout = document.getElementById('dataconfigLogout');

const optionBtns = document.querySelectorAll('.option-btn');

const exitBtn = document.getElementById('goBack');

dataconfigLogout.addEventListener('click', function () {
  window.location.href = '/login';
});

optionBtns.forEach(btn => {
  btn.addEventListener('click', enterConfig);
});

exitBtn.addEventListener('click', function () {
  window.location.href = '/home';
});

function enterConfig (event) {
  const btn = event.target;

  const fetchType = btn.getAttribute('data-fetch');

  window.location.href = `/dataconfig/${fetchType}`;
}
