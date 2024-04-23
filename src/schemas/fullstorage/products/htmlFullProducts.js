export function structureAllBooks (products) {
  let htmlBooks = '';

  // Generar HTML para libros
  htmlBooks = `
    <div class="productType-box">
      <div class="title-box">
        <div class="type-text book-titleCard">Libros</div>
        <div class="type-text pcs">${products.books.length} Libros</div>
      </div>
  `;
  if (products.books.length > 0) {
    products.books.sort((a, b) => a.bookfs_name.localeCompare(b.bookfs_name));
    htmlBooks += `
      <div class="content-box">

    ${products.books.map((book) => {
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
          <div class="product-cardColumn cardBookName book-toggle-btn">${book.bookfs_name}</div>


          ${book.bookfs_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.bookfs_price === 'string' ? book.bookfs_price.includes('.') ? book.bookfs_price.padEnd(book.bookfs_price.indexOf('.') + 3, '0') : book.bookfs_price + '.00' : book.bookfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

  

          <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>
          <div class="product-cardColumn cardBookInfo">${book.bookfs_author}, ${book.bookfs_editorial_name}, ${book.bookfs_genre_name}, ${book.bookfs_subgenre_name}, ${book.bookfs_year}</div >
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

  return htmlBooks;
}

export function structureAllSepars (products) {
  let htmlSeparators = '';

  // Generar HTML para separadores
  htmlSeparators = `
    <div class="productType-box">
      <div class="title-box">
        <div class="type-text separator-titleCard">Separadores</div>
        <div class="type-text pcs">${products.separators.length} Separadores</div>
      </div>
  `;
  if (products.separators.length > 0) {
    products.separators.sort((a, b) => a.separfs_name.localeCompare(b.separfs_name));
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
        <div class="product-cardColumn cardSeparName separ-toggle-btn">${separ.separfs_name}</div>

        ${separ.separfs_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.separfs_price === 'string' ? separ.separfs_price.includes('.') ? separ.separfs_price.padEnd(separ.separfs_price.indexOf('.') + 3, '0') : separ.separfs_price + '.00' : separ.separfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardSeparPrice">$0.00</div>'}

        <div class="product-cardColumn cardSeparBarcode">${separ.barcode_number}</div>
        <div class="product-cardColumn cardSeparMaterial">${separ.separfs_material}</div>
        <div class="product-cardColumn cardSeparPrint">${separ.separfs_print}</div>
        <div class="product-cardColumn cardSeparDescription">${separ.separfs_description}</div>
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
  return htmlSeparators;
}

export function structureAllMags (products) {
  let htmlMagazines = '';

  htmlMagazines = `
    <div class="productType-box">
      <div class="title-box">
        <div class="type-text magazine-titleCard">Revistas / Cómics </div>
        <div class="type-text pcs">${products.magazines.length} Revistas</div>
      </div>
  `;
  if (products.magazines.length > 0) {
    products.magazines.sort((a, b) => a.magfs_name.localeCompare(b.magfs_name));
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
        <div class="product-cardColumn cardMagazineName mag-toggle-btn">${mag.magfs_name}</div>
        
        ${mag.magfs_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.magfs_price === 'string' ? mag.magfs_price.includes('.') ? mag.magfs_price.padEnd(mag.magfs_price.indexOf('.') + 3, '0') : mag.magfs_price + '.00' : mag.magfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardMagazinePrice">$0.00</div>'}

        <div class="product-cardColumn cardMagazineBarcode">${mag.barcode_number}</div>
        <div class="product-cardColumn cardMagazineAuthor">${mag.magfs_author}</div >
        
        <div class="product-cardColumn cardMagazineEditorial">${mag.magfs_editorial_name}</div>
        <div class="product-cardColumn cardMagazineYear">${mag.magfs_year}</div>
        <div class="product-cardColumn cardMagazineSubgenre">${mag.magfs_subgenre_name}</div>
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

  return htmlMagazines;
}
