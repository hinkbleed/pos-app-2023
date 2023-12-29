// Obtener todas las filas de la tabla
const rows = document.querySelectorAll('#tbody tr');

// Agregar un event listener a cada fila
rows.forEach((row) => {
  row.addEventListener('click', () => {
    // Remover la clase 'seleccionada' de todas las filas
    rows.forEach((r) => {
      r.classList.remove('selected');
    });

    // Agregar la clase 'seleccionada' a la fila clickeada
    row.classList.add('selected');
    
  });
});