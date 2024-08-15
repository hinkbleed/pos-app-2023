const storageBtn = document.getElementById('viewStorage');
const stgTable = document.getElementById('stgTable');

storageBtn.addEventListener('click', viewStorage);

function viewStorage () {
  fetch('/fullstorage/products/books/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      stgTable.innerHTML += html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch('/fullstorage/products/separs/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      stgTable.innerHTML += html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });

  fetch('/fullstorage/products/mags/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      return response.text();
    })
    .then(html => {
      stgTable.innerHTML += html;
    })
    .catch(error => {
      console.error('Error al cargar el contenido:', error);
    });
}
