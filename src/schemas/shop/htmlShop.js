export function structureAllPartyBooks (books) {
  let htmlBooks = '';
  if (books.length > 0) {
    //  books.sort((a, b) => a.book_name.localeCompare(b.book_name));

    htmlBooks += `
      <div class="content-box">

    ${books.map((book) => {
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
              <div class="amount-box">${book.fs_id}</div>
            </div>

            <div class="product-cardColumn cardBookName book-toggle-btn">${book.current_amount}</div>

            <div class="product-cardColumn cardBookInfo"></div >

            <div class="product-cardColumn cardBookEDQid">${book.fs_id}</div>

            <div class="product-cardColumn cardBookBarcode"></div>

            <div class="product-cardColumn cardBookKind"></div>

            ${book.party_price ? `<div class="product-cardColumn cardBookPrice">$${typeof book.party_price === 'string' ? book.party_price.includes('.') ? book.party_price.padEnd(book.party_price.indexOf('.') + 3, '0') : book.party_price + '.00' : book.party_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlBooks += '<div class="no-content">Sin libros disponibles para este evento</div>';
  }
  htmlBooks += `
      </div >`;

  return htmlBooks;
}

export function structureAllPartySeparators (separs) {
  let htmlSepars = '';
  if (separs.length > 0) {
    separs.sort((a, b) => a.separ_name.localeCompare(b.book_name));
    htmlSepars += `
      <div class="content-box">

    ${separs.separs.map((separ) => {
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
              <div class="amount-box">${separ.fs_id}</div>
            </div>

            <div class="product-cardColumn cardBookName book-toggle-btn">${separ.current_amount}</div>

            <div class="product-cardColumn cardBookInfo">${separ.book_author}, ${separ.book_editorial_name}, ${separ.book_genre_name}, ${separ.book_subgenre_name}, ${separ.book_year}</div >

            <div class="product-cardColumn cardBookEDQid">${separ.bookfs_id}</div>

            <div class="product-cardColumn cardBookBarcode">${separ.barcode_number}</div>

            <div class="product-cardColumn cardBookKind">${separ.bookfs_kind}</div>

            ${separ.bookfs_price ? `<div class="product-cardColumn cardBookPrice">$${typeof separ.bookfs_price === 'string' ? separ.bookfs_price.includes('.') ? separ.bookfs_price.padEnd(separ.bookfs_price.indexOf('.') + 3, '0') : separ.bookfs_price + '.00' : separ.bookfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlSepars += '<div class="no-content">Sin separadores disponibles para este evento</div>';
  }
  htmlSepars += `
      </div >`;

  return htmlSepars;
}
export function structureAllPartyMagazines (mags) {
  let htmlMags = '';
  if (mags.length > 0) {
    mags.sort((a, b) => a.separ_name.localeCompare(b.book_name));
    htmlMags += `
      <div class="content-box">

    ${mags.separs.map((mag) => {
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
              <div class="amount-box">${mag.fs_id}</div>
            </div>

            <div class="product-cardColumn cardBookName book-toggle-btn">${mag.current_amount}</div>

            <div class="product-cardColumn cardBookInfo">${mag.book_author}, ${mag.book_editorial_name}, ${mag.book_genre_name}, ${mag.book_subgenre_name}, ${mag.book_year}</div >

            <div class="product-cardColumn cardBookEDQid">${mag.bookfs_id}</div>

            <div class="product-cardColumn cardBookBarcode">${mag.barcode_number}</div>

            <div class="product-cardColumn cardBookKind">${mag.bookfs_kind}</div>

            ${mag.bookfs_price ? `<div class="product-cardColumn cardBookPrice">$${typeof mag.bookfs_price === 'string' ? mag.bookfs_price.includes('.') ? mag.bookfs_price.padEnd(mag.bookfs_price.indexOf('.') + 3, '0') : mag.bookfs_price + '.00' : mag.bookfs_price.toFixed(2)}</div>` : '<div class="product-cardColumn cardBookPrice">$0.00</div>'}

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlMags += '<div class="no-content">Sin revistas disponibles para este evento</div>';
  }
  htmlMags += `
      </div >`;

  return htmlMags;
}
