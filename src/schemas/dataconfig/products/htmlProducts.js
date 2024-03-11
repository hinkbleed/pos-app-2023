export function structureProducts (products) {
  const productsArray = products.map((product) => {
    return String(products);
  });
  const productsHTML = productsArray.join('');
  return productsHTML;
}

/*
`
  <div class="head all-items">
  <div class="head-item list-position">#</div>
  <div class="head-item product-name">Nombre del artículo</div>
  <div class="head-item product-price">Precio</div>

  <div class="head-item product-barcode">Barcode</div>
  <div class="head-item product-kind">Tipo</div>
  <div class="head-item product-providor">Prov.</div>
  <div class="head-item product-edqId">EDQ ID</div>
  <div class="head-item last-product-inserc">lst inserc</div>
  <div class="head-item init-cant">init</div>
  <div class="head-item current-cant">curr</div>
</div>
      `

      */
