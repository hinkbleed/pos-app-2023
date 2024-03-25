export function structureAllProducts (products) {
  let htmlBooks = '';
  let htmlSeparators = '';
  let htmlMagazines = '';

  // Generar HTML para libros
  htmlBooks = `
    <div class="productType-box">
      <div class="title-box">
        <div class="type-text book-titleCard">Libros</div>
        <div class="type-text pcs">${products.books.length} Registros</div>
      </div>
  `;
  if (products.books.length > 0) {
    products.books.sort((a, b) => a.book_name.localeCompare(b.book_name));
    htmlBooks += `
      <div class="content-box">

    ${products.books.map((book, index) => {
      return `
        <div class="product-card book-product">
          <div class="productOptions-ask">
            <div class="prodBtns editBookBtn editBtn">
              Editar
              <img class="btn-icon" src="/svg/edit-icon.svg"/>
          
            </div>
            <div class="prodBtns addBookToPartyBtn addBtn">
              Añadir a inventario
              <img class="btn-icon" src="/svg/add-icon.svg"/>
            </div>
          </div>
          <div class="product-cardColumn cardBookName book-toggle-btn">${book.book_name}</div>


          ${book.book_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.book_price === 'string' ? book.book_price.includes('.') ? book.book_price.padEnd(book.book_price.indexOf('.') + 3, '0') : book.book_price + '.00' : book.book_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

  

          <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>
          <div class="product-cardColumn cardBookAuthor">${book.book_author}</div >
          <div class="product-cardColumn cardBookEditorial">${book.book_editorial_name}</div>
          <div class="product-cardColumn cardBookYear">${book.book_year}</div>
          <div class="product-cardColumn cardBookGenres">
            <div class="genre">${book.book_genre_name}</div>
            <div>${book.book_subgenre_name}</div>
          </div>
          <div class="product-cardColumn cardBookEDQid">${book.book_id}</div>
        </div >



      `;
    }).join('')
      }
  `;
  } else {
    htmlBooks += '<div class="no-content">Sin libros disponibles</div>';
  }
  htmlBooks += `
      </div >
    </div > `;

  // Generar HTML para separadores
  htmlSeparators = `
    <div class="productType-box">
      <div class="title-box">
        <div class="type-text separator-titleCard">Separadores</div>
        <div class="type-text pcs">${products.separators.length} Registros</div>
      </div>
  `;
  if (products.separators.length > 0) {
    products.separators.sort((a, b) => a.separ_name.localeCompare(b.separ_name));
    htmlSeparators += `
    <div class="content-box">

      ${products.separators.map(separ => {
      return `
      <div class="product-card separator-product">
        <div class="productOptions-ask">
          <div class="prodBtns editSeparBtn editBtn">
            Editar
            <img class="btn-icon" src="/svg/edit-icon.svg"/>
    
          </div>
          <div class="prodBtns addSeparToPartyBtn addBtn">
            Añadir a inventario
            <img class="btn-icon" src="/svg/add-icon.svg"/>
          </div>
        </div>
        <div class="product-cardColumn cardSeparName separ-toggle-btn">${separ.separ_name}</div>

        ${separ.separ_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.separ_price === 'string' ? separ.separ_price.includes('.') ? separ.separ_price.padEnd(separ.separ_price.indexOf('.') + 3, '0') : separ.separ_price + '.00' : separ.separ_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardSeparPrice">$0.00</div>'}

        <div class="product-cardColumn cardSeparBarcode">${separ.barcode_number}</div>
        <div class="product-cardColumn cardSeparMaterial">${separ.separ_material}</div>
        <div class="product-cardColumn cardSeparPrint">${separ.separ_print}</div>
        <div class="product-cardColumn cardSeparDescription">${separ.separ_description}</div>
        <div class="product-cardColumn cardSeparEDQid">${separ.separ_id}</div>
      </div>
        `;
    }).join('')
      }
  `;
  } else {
    htmlSeparators += '<div class="no-content">Sin separadores disponibles</div>';
  }
  htmlSeparators += `
  </div >
  </div > `;

  // Generar HTML para revistas
  htmlMagazines = `
    <div class="productType-box">
      <div class="title-box">
        <div class="type-text magazine-titleCard">Revistas / Cómics </div>
        <div class="type-text pcs">${products.magazines.length} Registros</div>
      </div>
  `;
  if (products.magazines.length > 0) {
    products.magazines.sort((a, b) => a.mag_name.localeCompare(b.mag_name));
    htmlMagazines += `
    <div class="content-box">
      ${products.magazines.map(mag => {
      return `
      <div class="product-card magazine-product">
        <div class="productOptions-ask">
          <div class="prodBtns editMagBtn editBtn">
            Editar
            <img class="btn-icon" src="/svg/edit-icon.svg"/>
          </div>
          <div class="prodBtns addMagToPartyBtn addBtn">
            Añadir a inventario
            <img class="btn-icon" src="/svg/add-icon.svg"/>
          </div>
        </div>
        <div class="product-cardColumn cardMagazineName mag-toggle-btn">${mag.mag_name}</div>
        
        ${mag.mag_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.mag_price === 'string' ? mag.mag_price.includes('.') ? mag.mag_price.padEnd(mag.mag_price.indexOf('.') + 3, '0') : mag.mag_price + '.00' : mag.mag_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardMagazinePrice">$0.00</div>'}

        <div class="product-cardColumn cardMagazineBarcode">${mag.barcode_number}</div>
        <div class="product-cardColumn cardMagazineAuthor">${mag.mag_author}</div >
        
        <div class="product-cardColumn cardMagazineEditorial">${mag.mag_editorial_name}</div>
        <div class="product-cardColumn cardMagazineYear">${mag.mag_year}</div>
        <div class="product-cardColumn cardMagazineSubgenre">${mag.mag_subgenre_name}</div>
        <div class="product-cardColumn cardMagazineEDQid">${mag.mag_id}</div>
      </div>
        `;
    }).join('')
      }
  `;
  } else {
    htmlMagazines += '<div class="no-content">Sin revistas disponibles</div>';
  }
  htmlMagazines += `
  </div >
  </div > `;

  return htmlBooks + htmlSeparators + htmlMagazines;
}
