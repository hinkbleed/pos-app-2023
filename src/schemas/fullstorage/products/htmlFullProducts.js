export function structureAllBooks (products) {
  let htmlBooks = '';

  htmlBooks = `
      <div class="title-box book-titleCard">
          <div class="type-text">
          Libros: 
          ${products.books.reduce((sum, book) => sum + book.bookfs_amount, 0)} Unidades /

            ${products.books.length} ${products.books.length === 1 ? 'Título' : 'Títulos'}
          </div>
          <div class="book-thead">
            
            <div class="book-head-item amount">
              Cant.
            </div>

            <div class="book-head-item title">
              Título
            </div>

            <div class="book-head-item details">
              Detalles
            </div>
            
            <div class="book-head-item id">
              ID
            </div>
            
            <div class="book-head-item barcode">
              Código de Barras
            </div>

            <div class="book-head-item kind">
              Tipo
            </div>

            <div class="book-head-item price">
              Precio
            </div>
            
          </div>
      </div>
  `;
  if (products.books.length > 0) {
    products.books.sort((a, b) => a.book_name.localeCompare(b.book_name));
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

            <div class="product-cardColumn cardBookAmount">
              <div class="amount-box">${book.bookfs_amount}</div>
            </div>

            <div class="product-cardColumn cardBookName book-toggle-btn">${book.book_name}</div>

            <div class="product-cardColumn cardBookInfo">${book.book_author}, ${book.book_editorial_name}, ${book.book_genre_name}, ${book.book_subgenre_name}, ${book.book_year}</div >
            
            <div class="product-cardColumn cardBookEDQid">${book.bookfs_id}</div>
            
            <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>

            
            <div class="product-cardColumn cardBookKind">${book.bookfs_kind}</div>

            ${book.bookfs_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.bookfs_price === 'string' ? book.bookfs_price.includes('.') ? book.bookfs_price.padEnd(book.bookfs_price.indexOf('.') + 3, '0') : book.bookfs_price + '.00' : book.bookfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

        </div >



      `;
    }).join('')
      }
  `;
  } else {
    htmlBooks += '<div class="no-content">Sin libros disponibles</div>';
  }
  htmlBooks += `
      </div >`;

  return htmlBooks;
}

/*
export function structureQueryBooks (products) {
  let htmlBooks = '';
  let htmlMags = '';
  let html

  if (products.books.length > 0) {
    products.books.sort((a, b) => a.book_name.localeCompare(b.book_name));
    htmlBooks += `
      ${products.books.map((book) => {
        return `
          <div class="hei">
          ${book.book_name},
          ${book.book_id},
          ${book.book_author},
          ${book.book_editorial_name},
          ${book.book_genre_name},
          ${book.book_subgenre_name},
          ${book.book_price}
          </div>`;
        /*
        return `
          <div class="product-card book-product">
            <div class="productOptions-ask">
              <div class="prodBtns editBookBtn editBtn">
                Editar
                <img class="btn-icon" src="/svg/edit-icon.svg" />

              </div>
              <div class="prodBtns addBookToPartyBtn addBtn">
                Añadir a inventario
                <img class="btn-icon" src="/svg/add-icon.svg" />
              </div>
            </div>

            <div class="product-cardColumn cardBookAmount">
              <div class="amount-box">${book.bookfs_amount}</div>
            </div>

            <div class="product-cardColumn cardBookName book-toggle-btn">${book.book_name}</div>

            <div class="product-cardColumn cardBookInfo">${book.book_author}, ${book.book_editorial_name},
              ${book.book_genre_name}, ${book.book_subgenre_name}, ${book.book_year}</div>

            <div class="product-cardColumn cardBookEDQid">${book.bookfs_id}</div>

            <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>
            <div class="product-cardColumn cardBookKind">${book.bookfs_kind}</div>

            <div class="product-cardColumn cardBookPrice">$${typeof book.bookfs_price === 'string' ? book.bookfs_price.includes('.') ? book.bookfs_price.padEnd(book.bookfs_price.indexOf('.') + 3, '0') : book.bookfs_price + '.00' : book.bookfs_price.toFixed(2)}</div> : '<div class="product-cardColumn cardBookPrice">$0.00</div>
          </div>
        `;

    }).join('')
      }
  `;
  } else {
    htmlBooks += '';
  }

  return htmlBooks;
}
  */

export function structureAllSepars (products) {
  let htmlSeparators = '';

  // Generar HTML para separadores
  htmlSeparators = `
  
      <div class="title-box separator-titleCard">
        <div class="type-text">
        Separadores: 
          ${products.separators.reduce((sum, separ) => sum + separ.separfs_amount, 0)} Unidades /
          ${products.separators.length} ${products.separators.length === 1 ? 'Separador' : 'Separadores'}
        </div>

        <div class="separ-thead">
            
            <div class="separ-head-item amount">
              Cant.
            </div>

            <div class="separ-head-item name">
              Nombre
            </div>

            <div class="separ-head-item details">
              Detalles y descripción
            </div>
            
            <div class="separ-head-item id">
              ID
            </div>
            
            <div class="separ-head-item barcode">
              Código de Barras
            </div>

            <div class="separ-head-item price">
              Precio
            </div>
            
          </div>
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

        

          <div class="product-cardColumn cardSeparAmount">
            <div class="amount-box">${separ.separfs_amount}</div>
          </div>

          <div class="product-cardColumn cardSeparName  separ-toggle-btn">
            ${separ.separ_name}
          </div>
          
          <div class="product-cardColumn cardSeparDetails">
            ${separ.separ_description}, ${separ.separ_material}, ${separ.separ_print}
          </div>
          
          <div class="product-cardColumn cardSeparEDQid">
            ${separ.separfs_id}
          </div>

          <div class="product-cardColumn cardSeparBarcode">
            ${separ.barcode_number}
          </div>

          ${separ.separfs_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.separfs_price === 'string' ? separ.separfs_price.includes('.') ? separ.separfs_price.padEnd(separ.separfs_price.indexOf('.') + 3, '0') : separ.separfs_price + '.00' : separ.separfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardSeparPrice">$0.00</div>'}
      </div>
        `;
    }).join('')
      }
  `;
  } else {
    htmlSeparators += '<div class="no-content">Sin separadores disponibles</div>';
  }
  htmlSeparators += `
  </div > `;
  return htmlSeparators;
}

export function structureAllMags (products) {
  let htmlMagazines = '';

  htmlMagazines = `
      <div class="title-box magazine-titleCard">
        <div class="type-text">
          Revistas: 
          ${products.magazines.reduce((sum, mag) => sum + mag.magfs_amount, 0)} Unidades /
          ${products.magazines.length} ${products.magazines.length === 1 ? 'Revista' : 'Revistas'}
        </div>
        <div class="mag-thead">
            
            <div class="mag-head-item amount">
              Cant.
            </div>

            <div class="mag-head-item title">
              Título
            </div>

            <div class="mag-head-item details">
              Detalles
            </div>
            
            <div class="mag-head-item id">
              ID
            </div>
            
            <div class="mag-head-item barcode">
              Código de Barras
            </div>

            <div class="mag-head-item price">
              Precio
            </div>
            
          </div>
      </div>
  `;
  if (products.magazines.length > 0) {
    products.magazines.sort((a, b) => a.mag_name.localeCompare(b.magfs_name));
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

        
        <div class="product-cardColumn cardMagazineAmount">
          <div class="amount-box">${mag.magfs_amount}</div>
        </div>

        <div class="product-cardColumn cardMagazineName mag-toggle-btn">
          ${mag.mag_name}
        </div>

        
        <div class="product-cardColumn cardMagazineInfo">
          ${mag.mag_author}, ${mag.mag_editorial_name}, ${mag.mag_subgenre_name}, ${mag.mag_year}
        </div >
        
        <div class="product-cardColumn cardMagazineEDQid">
          ${mag.magfs_id}
        </div>
        
        <div class="product-cardColumn cardMagazineBarcode">
          ${mag.barcode_number}
        </div>
        
        ${mag.magfs_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.magfs_price === 'string' ? mag.magfs_price.includes('.') ? mag.magfs_price.padEnd(mag.magfs_price.indexOf('.') + 3, '0') : mag.magfs_price + '.00' : mag.magfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardMagazinePrice">$0.00</div>'}

      </div>
        `;
    }).join('')
      }
  `;
  } else {
    htmlMagazines += '<div class="no-content">Sin revistas disponibles</div>';
  }
  htmlMagazines += `
  </div >`;

  return htmlMagazines;
}

export function structureQueryBooks (products) {
  let htmlBooks = '';
  let htmlSeparators = '';
  let htmlMagazines = '';

  // Generar HTML para libros
  htmlBooks = `
  `;
  if (products.books.length > 0) {
    products.books.sort((a, b) => a.book_name.localeCompare(b.book_name));
    htmlBooks += `
    <div class="productType-box book-type">
      <div class="typesign"> Libros
      </div>
    ${products.books.map((book, index) => {
      return `
        <div class="product-card book-product">
          <div class="productOptions-menu">
            <div class="prodBtns addBookToFullstorageBtn addBtn">
              Añadir a inventario
              <img class="btn-icon" src="/svg/add-icon.svg"/>
            </div>
          </div>

          <div class="product-cardColumn cardBookName book-toggle-btn">${book.book_name}</div>

          ${book.book_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.book_price === 'string' ? book.book_price.includes('.') ? book.book_price.padEnd(book.book_price.indexOf('.') + 3, '0') : book.book_price + '.00' : book.book_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

          <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>

          <div class="product-cardColumn cardBookInfo">${book.book_author}, ${book.book_editorial_name}, ${book.book_year}, ${book.book_genre_name}, ${book.book_subgenre_name}</div >

          <div class="product-cardColumn cardBookEDQid">${book.book_id}</div>
        </div >



      `;
    }).join('')
      }
  `;
    htmlBooks += `
    </div > `;
  } else {
    htmlBooks = '';
  }

  // Generar HTML para separadores
  htmlSeparators = `
  `;
  if (products.separators.length > 0) {
    products.separators.sort((a, b) => a.separ_name.localeCompare(b.separ_name));
    htmlSeparators += `
    <div class="productType-box">
      <div class="typesign"> Separadores
      </div>
      ${products.separators.map(separ => {
      return `
      <div class="product-card separator-product">
        <div class="productOptions-menu">
          <div class="prodBtns addSeparToFullstorageBtn addBtn">
            Añadir a inventario
            <img class="btn-icon" src="/svg/add-icon.svg"/>
          </div>
        </div>

        <div class="product-cardColumn cardSeparName separ-toggle-btn">${separ.separ_name}</div>

        ${separ.separ_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.separ_price === 'string' ? separ.separ_price.includes('.') ? separ.separ_price.padEnd(separ.separ_price.indexOf('.') + 3, '0') : separ.separ_price + '.00' : separ.separ_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardSeparPrice">$0.00</div>'}

        <div class="product-cardColumn cardSeparBarcode">${separ.barcode_number}</div>
        <div class="product-cardColumn cardSeparInfo">${separ.separ_material}, ${separ.separ_print}, ${separ.separ_description}</div>
        <div class="product-cardColumn cardSeparEDQid">${separ.separ_id}</div>
      </div>
        `;
    }).join('')
      }
  `;
    htmlSeparators += `
      </div > `;
  } else {
    htmlSeparators = '';
  }

  // Generar HTML para revistas
  htmlMagazines = `
  `;
  if (products.magazines.length > 0) {
    products.magazines.sort((a, b) => a.mag_name.localeCompare(b.mag_name));
    htmlMagazines += `
    <div class="productType-box">
      <div class="typesign"> Revistas
      </div>
      ${products.magazines.map(mag => {
      return `
      <div class="product-card magazine-product">
        <div class="productOptions-menu">
          <div class="prodBtns addMagToFullstorageBtn addBtn">
            Añadir a inventario
            <img class="btn-icon" src="/svg/add-icon.svg"/>
          </div>
        </div>

        <div class="product-cardColumn cardMagazineName mag-toggle-btn">${mag.mag_name}</div>
        
        ${mag.mag_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.mag_price === 'string' ? mag.mag_price.includes('.') ? mag.mag_price.padEnd(mag.mag_price.indexOf('.') + 3, '0') : mag.mag_price + '.00' : mag.mag_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardMagazinePrice">$0.00</div>'}

        <div class="product-cardColumn cardMagazineBarcode">${mag.barcode_number}</div>
        
        <div class="product-cardColumn cardMagazineInfo">${mag.mag_author}, ${mag.mag_editorial_name}, ${mag.mag_year}, ${mag.mag_subgenre_name}</div >

        <div class="product-cardColumn cardMagazineEDQid">${mag.mag_id}</div>
      </div>
        `;
    }).join('')
      }
  `;
    htmlMagazines += `
      </div > `;
  } else {
    htmlMagazines = '';
  }

  if (htmlBooks === '' && htmlSeparators === '' && htmlMagazines === '') {
    return '';
  } else {
    return htmlBooks + htmlSeparators + htmlMagazines;
  }
}
