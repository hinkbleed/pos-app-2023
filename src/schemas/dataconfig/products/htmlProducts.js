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
          <div class="product-cardColumn cardBookName">${book.book_name}</div>
          <div class="product-cardColumn cardBookPrice">$${book.book_price}.00</div>
          <div class="product-cardColumn cardBookBarcode">Pend.</div>
          <div class="product-cardColumn cardBookAuthor">
            <div class="author1">${book.book_author_1}</div>
            ${book.book_author_2 ? `<div class="author2">${book.book_author_2}</div>` : ''}
          </div >
          <div class="product-cardColumn cardBookEditorial">${book.book_editorial_name}</div>
          <div class="product-cardColumn cardBookYear">${book.book_year}</div>
          <div class="product-cardColumn cardBookGenres">
            <div class="genre">${book.book_genre_name}</div>
            <div>${book.book_sybgenre_name}</div>
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
        <div class="product-cardColumn cardSeparName">${separ.separ_name}</div>
        <div class="product-cardColumn cardSeparPrice">$${separ.separ_price}.00</div>  
        <div class="product-cardColumn cardSeparBarcode">pend. barcode</div>
        <div class="product-cardColumn cardSeparMaterial">${separ.separ_material}</div>
        <div class="product-cardColumn cardSeparFace">${separ.separ_face}</div>
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
        <div class="product-cardColumn cardMagazineName">${mag.mag_name}</div>
        <div class="product-cardColumn cardMagazinePrice">$${mag.mag_price}.00</div>
        <div class="product-cardColumn cardMagazineBarcode">barcode pend.</div>
        <div class="product-cardColumn cardMagazineAuthor">
          <div class="author1">${mag.mag_author_1}</div>
          ${mag.mag_author_2 ? `<div class="author2">${mag.mag_author_2}</div>` : ''}
        </div >
        
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
