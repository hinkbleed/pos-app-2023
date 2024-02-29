const passwordForm = document.getElementById('passwordForm');

passwordForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const passwordInput = document.getElementById('password'); // Obtener el elemento de entrada de contraseña
  const password = passwordInput.value;
  verifyPassword(password);
});

function verifyPassword (password) {
  return fetch('/login/verifypassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        // Si la autenticación fue exitosa, redirige al usuario a alguna página
        window.location.href = '/shop'; // Cambia '/dashboard' por la ruta deseada
      } else {
        // Si la autenticación falló, muestra un mensaje de error al usuario
        console.error('La autenticación falló');
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    })
    .catch(error => {
      console.error('Error al comprobar contraseña:', error);
      // Aquí podrías mostrar un mensaje de error genérico al usuario
    });
}
