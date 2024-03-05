const loginForm = document.getElementById('passwordForm');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  login();
  loginForm.reset();
});

function login () {
  const password = document.getElementById('password').value;

  // Realizar la solicitud POST al backend
  fetch('/login/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/home';
      } else {
        const errorElement = loginForm.querySelector('.error-element');
        if (errorElement) {
          errorElement.remove();
        }
        loginForm.insertAdjacentHTML('beforeend', `
          <div class="error-element">¡Contraseña Inválida!</div>
        `);
        throw new Error('contraseña incorrecta');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}
