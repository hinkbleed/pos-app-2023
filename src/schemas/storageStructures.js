export function structureProducts (products) {
  // Utilizamos map() para crear un nuevo array con los elementos div para cada producto
  const productsArray = products.map((product, index) => `
      <div class="storage-item">
          <div class="stg-item-prop item-list-option">${index + 1}</div>
          <div class="stg-item-prop item-name">${product.name}</div>
          <div class="stg-item-prop item-price">$${product.price.toFixed(2)}</div>
          <div class="stg-item-prop item-barcode">${'falta configurar los barcodes en db'}</div>
          <div class="stg-item-prop item-kind">${product.kind}</div>
          <div class="stg-item-prop item-providor">${product.providor}</div>
          <div class="stg-item-prop item-edqId">${product.book_id}</div>
          <div class="stg-item-prop last-item-inserc">${new Date().toLocaleString()}</div>
          <div class="stg-item-prop item-init-cant">0</div>
          <div class="stg-item-prop item-current-cant">-</div>
      </div>
  `);

  // Unimos los elementos del array en una cadena HTML utilizando join()
  const productsHtml = productsArray.join('');

  // Retornamos la cadena HTML
  return productsHtml;
}
