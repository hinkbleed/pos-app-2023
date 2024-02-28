const storageBtn = document.getElementById('viewStorage');

storageBtn.addEventListener('click', viewStorage);

function viewStorage () {
  fetch('/data/storage')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('stgTable').innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}
