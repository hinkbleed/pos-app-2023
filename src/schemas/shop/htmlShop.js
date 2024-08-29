export function structureAllPartyBooks (books) {
  let htmlBooks = '';
  if (books.books.length > 0) {
    books.books.sort((a, b) => a.book_name.localeCompare(b.book_name));

    htmlBooks += `
      <div class="content-box">
        <div class="typesign"> Libros en este evento
        </div>

    ${books.books.map((book) => {
      return `
        <div class="product-card book-product partyStorageProductCard">
          <div class="productOptions-ask">
            <div class="prodBtns editPartyBookAmountBtn editBtn">
              Añadir más piezas y/o cambiar precio
              <img class="btn-icon" src="/svg/edit-icon.svg"/>

            </div>
          </div>

            <div class="product-cardColumn cardBookAmount">
              <div class="amount-box">${book.current_amount}</div>
            </div>

            <div class="product-cardColumn cardBookName book-toggle-btn">${book.book_name}</div>

            <div class="product-cardColumn cardBookInfo">
              ${book.book_author}, ${book.book_editorial_name}, ${book.book_year}, ${book.book_genre_name}, ${book.book_subgenre_name}
            </div >

            <div class="product-cardColumn cardBookEDQid">${book.fs_id}</div>

            <div class="product-cardColumn cardBookBarcode">
              ${book.barcode_number}
            </div>

            <div class="product-cardColumn cardBookKind">${book.bookfs_kind}</div>

            ${book.party_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.party_price === 'string' ? book.party_price.includes('.') ? book.party_price.padEnd(book.party_price.indexOf('.') + 3, '0') : book.party_price + '.00' : book.party_price.toFixed(2)}</div>` : `<div class="product-cardColumn cardBookPrice">${book.bookfs_price.toFixed(2)}}</div>`}

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlBooks += '<div class="no-content">Sin libros disponibles para este evento</div>';
  }
  htmlBooks += `
      </div>`;

  return htmlBooks;
}
export function structureAllPartySeparators (separs) {
  let htmlSepars = '';
  if (separs.separators.length > 0) {
    //  separs.sort((a, b) => a.separ_name.localeCompare(b.book_name));
    htmlSepars += `
      <div class="content-box">
        <div class="typesign"> Separadores en este evento
        </div>

    ${separs.separators.map((separ) => {
      return `
        <div class="product-card separator-product partyStorageProductCard">
          <div class="productOptions-ask">
            <div class="prodBtns editPartySeparAmountBtn editBtn">
              Añadir más piezas y/o cambiar precio
              <img class="btn-icon" src="/svg/edit-icon.svg"/>

            </div>
          </div>

            <div class="product-cardColumn cardSeparAmount">
              <div class="amount-box">${separ.current_amount}</div>
            </div>

            <div class="product-cardColumn cardSeparName separ-toggle-btn">${separ.separ_name}</div>

            <div class="product-cardColumn cardSeparInfo">${separ.separ_material}, ${separ.separ_print}, ${separ.separ_description}</div >

            <div class="product-cardColumn cardSeparEDQid">${separ.fs_id}</div>

            <div class="product-cardColumn cardSeparBarcode">${separ.barcode_number}</div>

            ${separ.party_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.party_price === 'string' ? separ.party_price.includes('.') ? separ.party_price.padEnd(separ.party_price.indexOf('.') + 3, '0') : separ.party_price + '.00' : separ.party_price.toFixed(2)}</div>` : `<div class="product-cardColumn cardSeparPrice">${separ.separfs_price.toFixed(2)}</div>`}

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlSepars += '<div class="no-content">Sin separadores disponibles para este evento</div>';
  }
  htmlSepars += `
      </div>`;

  return htmlSepars;
}
export function structureAllPartyMagazines (mags) {
  let htmlMags = '';
  if (mags.magazines.length > 0) {
  //  mags.sort((a, b) => a.separ_name.localeCompare(b.book_name));
    htmlMags += `
      <div class="content-box">
        <div class="typesign"> Revistas en este evento
        </div>

    ${mags.magazines.map((mag) => {
      return `
        <div class="product-card magazine-product partyStorageProductCard">
          <div class="productOptions-ask">
            <div class="prodBtns editPartyMagAmountBtn editBtn">
              Añadir más piezas y/o cambiar precio
              <img class="btn-icon" src="/svg/edit-icon.svg"/>

            </div>
          </div>

            <div class="product-cardColumn cardMagazineAmount">
              <div class="amount-box">${mag.current_amount}</div>
            </div>

            <div class="product-cardColumn cardMagazineName mag-toggle-btn">${mag.mag_name}</div>

            <div class="product-cardColumn cardMagazineInfo">
              ${mag.mag_author}, ${mag.mag_editorial_name}, ${mag.mag_year}, ${mag.mag_subgenre_name}
            </div >

            <div class="product-cardColumn cardMagazineEDQid">${mag.fs_id}</div>

            <div class="product-cardColumn cardMagazineBarcode">
              ${mag.barcode_number}
            </div>

            ${mag.party_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.party_price === 'string' ? mag.party_price.includes('.') ? mag.party_price.padEnd(mag.party_price.indexOf('.') + 3, '0') : mag.party_price + '.00' : mag.party_price.toFixed(2)}</div>` : `<div class="product-cardColumn cardMagazinePrice">${mag.magfs_price.toFixed(2)}}</div>`}

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlMags += '<div class="no-content">Sin revistas disponibles para este evento</div>';
  }
  htmlMags += `
      </div>`;

  return htmlMags;
}

export function structureAddPartyQueryFullproducts (products) {
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

          <div class="product-cardColumn cardBookAmount book-toggle-btn">${book.bookfs_amount}</div>

          <div class="product-cardColumn cardBookName product-toggle-btn">${book.book_name}</div>
          
          <div class="product-cardColumn cardBookInfo cardProductInfo" query-info="book">${book.book_author}, ${book.book_editorial_name}, ${book.book_year}, ${book.book_genre_name}, ${book.book_subgenre_name}</div>

          <div class="product-cardColumn cardBookEDQid">${book.bookfs_id}</div>
      
          <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>

          <div class="product-cardColumn cardBookKind">${book.bookfs_kind}</div>

          ${book.bookfs_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.bookfs_price === 'string' ? book.bookfs_price.includes('.') ? book.bookfs_price.padEnd(book.bookfs_price.indexOf('.') + 3, '0') : book.bookfs_price + '.00' : book.bookfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}
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
        
        <div class="product-cardColumn cardSeparAmount">${separ.separfs_amount}</div>

        <div class="product-cardColumn cardSeparName product-toggle-btn">${separ.separ_name}</div>

        <div class="product-cardColumn cardSeparInfo cardProductInfo" query-info="separ">${separ.separ_material}, ${separ.separ_print}, ${separ.separ_description}</div>
        
        <div class="product-cardColumn cardSeparEDQid">${separ.separfs_id}</div>
        
        <div class="product-cardColumn cardSeparBarcode">${separ.barcode_number}</div>

        ${separ.separfs_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.separfs_price === 'string' ? separ.separfs_price.includes('.') ? separ.separfs_price.padEnd(separ.separfs_price.indexOf('.') + 3, '0') : separ.separfs_price + '.00' : separ.separfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardSeparPrice">$0.00</div>'}

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

        <div class="product-cardColumn cardMagazineAmount">${mag.magfs_amount}</div>

        <div class="product-cardColumn cardMagazineName product-toggle-btn">${mag.mag_name}</div>

        <div class="product-cardColumn cardMagazineInfo cardProductInfo" query-info="mag">${mag.mag_author}, ${mag.mag_editorial_name}, ${mag.mag_year}, ${mag.mag_subgenre_name}</div>
        
        <div class="product-cardColumn cardMagazineEDQid">${mag.magfs_id}</div>

        <div class="product-cardColumn cardMagazineBarcode">${mag.barcode_number}</div>
        
        ${mag.magfs_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.magfs_price === 'string' ? mag.magfs_price.includes('.') ? mag.magfs_price.padEnd(mag.magfs_price.indexOf('.') + 3, '0') : mag.magfs_price + '.00' : mag.magfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardMagazinePrice">$0.00</div>'}
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

export function structureStoragePartyQueryProducts (products) {
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
            <div class="prodBtns editPartyBookAmountBtn editBtn">
              Añadir más piezas y/o cambiar precio
              <img class="btn-icon" src="/svg/edit-icon.svg"/>
            </div>
          </div>

          <div class="product-cardColumn cardBookAmount book-toggle-btn">${book.current_amount}</div>

          <div class="product-cardColumn cardBookName stg-product-toggle-btn">${book.book_name}</div>
          
          <div class="product-cardColumn cardBookInfo cardProductInfo" query-info="book">${book.book_author}, ${book.book_editorial_name}, ${book.book_year}, ${book.book_genre_name}, ${book.book_subgenre_name}</div>

          <div class="product-cardColumn cardBookEDQid">${book.bookfs_id}</div>
      
          <div class="product-cardColumn cardBookBarcode">${book.barcode_number}</div>

          <div class="product-cardColumn cardBookKind">${book.bookfs_kind}</div>

          ${book.party_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.party_price === 'string' ? book.party_price.includes('.') ? book.party_price.padEnd(book.party_price.indexOf('.') + 3, '0') : book.party_price + '.00' : book.party_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}
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
          <div class="prodBtns editPartySeparAmountBtn editBtn">
            Añadir más piezas y/o cambiar precio
            <img class="btn-icon" src="/svg/edit-icon.svg"/>
          </div>
        </div>
        
        <div class="product-cardColumn cardSeparAmount book-toggle-btn">${separ.current_amount}</div>

        <div class="product-cardColumn cardSeparName stg-product-toggle-btn">${separ.separ_name}</div>

        <div class="product-cardColumn cardSeparInfo cardProductInfo" query-info="separ">${separ.separ_material}, ${separ.separ_print}, ${separ.separ_description}</div>
        
        <div class="product-cardColumn cardSeparEDQid">${separ.separfs_id}</div>
        
        <div class="product-cardColumn cardSeparBarcode">${separ.barcode_number}</div>

        ${separ.party_price ? `<div class="product-cardColumn cardSeparPrice">$${typeof separ.party_price === 'string' ? separ.party_price.includes('.') ? separ.party_price.padEnd(separ.party_price.indexOf('.') + 3, '0') : separ.party_price + '.00' : separ.party_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardSeparPrice">$0.00</div>'}

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
          <div class="prodBtns editPartyMagAmountBtn editBtn">
            Añadir más piezas y/o cambiar precio
            <img class="btn-icon" src="/svg/edit-icon.svg"/>
          </div>
        </div>
        
        <div class="product-cardColumn cardMagazineAmount">${mag.current_amount}</div>

        <div class="product-cardColumn cardMagazineName stg-product-toggle-btn">${mag.mag_name}</div>
        
        <div class="product-cardColumn cardMagazineInfo cardProductInfo" query-info="mag">${mag.mag_author}, ${mag.mag_editorial_name}, ${mag.mag_year}, ${mag.mag_subgenre_name}</div >
        
        <div class="product-cardColumn cardMagazineEDQid">${mag.magfs_id}</div>
        
        <div class="product-cardColumn cardMagazineBarcode">${mag.barcode_number}</div>

        ${mag.party_price ? `<div class="product-cardColumn cardMagazinePrice">$${typeof mag.party_price === 'string' ? mag.party_price.includes('.') ? mag.party_price.padEnd(mag.party_price.indexOf('.') + 3, '0') : mag.party_price + '.00' : mag.party_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardMagazinePrice">$0.00</div>'}
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
