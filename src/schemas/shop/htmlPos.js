export function structurePosQuery (products) {
  let htmlBooks = '';
  let htmlSeparators = '';
  let htmlMagazines = '';

  // Generar HTML para libros
  htmlBooks = `
  `;
  if (products.books.length > 0) {
    products.books.sort((a, b) => a.book_name.localeCompare(b.book_name));
    htmlBooks += `
    ${products.books.map((book, index) => {
      return `

        <div class="posProduct-card book-product" type-info="book">
            
          <div class="posProduct-cardRow cardBookName productName">${book.book_name}</div>

          <div class="posProduct-cardRow cardBookInfo cardProductInfo productInfo" query-info="book">${book.book_author}, ${book.book_genre_name}, ${book.book_subgenre_name}, ${book.book_year}</div>
          
          <div class="posProduct-cardRow cardBookKind productKind">${book.bookfs_kind}, ${book.book_editorial_name}</div>

          <div class="posProduct-cardRow cardBookEDQid productId">${book.bookfs_id}</div>

          <div class="posProduct-cardRow cardBookBarcode productBarcode">${book.barcode_number}</div>

          <div class="posProduct-cardDot cardBookAmount productAmount">${book.current_amount} unidades</div>

          ${book.party_price ? `<div class="posProduct-cardDot cardBookPrice productPrice">$${typeof book.party_price === 'string' ? book.party_price.includes('.') ? book.party_price.padEnd(book.party_price.indexOf('.') + 3, '0') : book.party_price + '.00' : book.party_price.toFixed(2)}</div>` : '<div class="posProduct-cardDot cardBookPrice productPrice">$0.00</div>'}

        </div>



      `;
    }).join('')
      }
  `;
  } else {
    htmlBooks = '';
  }

  // Generar HTML para separadores

  htmlSeparators = `
  `;
  if (products.separators.length > 0) {
    products.separators.sort((a, b) => a.separ_name.localeCompare(b.separ_name));
    htmlSeparators += `
    ${products.separators.map((separ, index) => {
      return `

        <div class="posProduct-card separ-product" type-info="separator">
            
          <div class="posProduct-cardRow cardSeparName productName">${separ.separ_name}</div>

          <div class="posProduct-cardRow cardSeparInfo cardProductInfo productInfo" query-info="book">${separ.separ_material}, ${separ.separ_print}, ${separ.separ_description}</div>

          <div class="posProduct-cardRow cardSeparEDQid productId">${separ.separfs_id}</div>

          <div class="posProduct-cardRow cardSeparBarcode productBarcode">${separ.barcode_number}</div>

          <div class="posProduct-cardDot cardSeparAmount productAmount">${separ.current_amount} unidades</div>

          ${separ.party_price ? `<div class="posProduct-cardDot cardSeparPrice productPrice">$${typeof separ.party_price === 'string' ? separ.party_price.includes('.') ? separ.party_price.padEnd(separ.party_price.indexOf('.') + 3, '0') : separ.party_price + '.00' : separ.party_price.toFixed(2)}</div>` : '<div class="posProduct-cardDot cardSeparPrice productPrice">$0.00</div>'}

        </div>



      `;
    }).join('')
      }
  `;
  } else {
    htmlSeparators = '';
  }

  // Generar HTML para revistas

  htmlMagazines = `
  `;
  if (products.magazines.length > 0) {
    products.magazines.sort((a, b) => a.mag_name.localeCompare(b.mag_name));
    htmlMagazines += `
    ${products.magazines.map((mag, index) => {
      return `

        <div class="posProduct-card mag-product" type-info="magazine">
            
          <div class="posProduct-cardRow cardMagName productName">${mag.mag_name}</div>

          <div class="posProduct-cardRow cardMagInfo cardProductInfo productInfo" query-info="book">${mag.mag_author}, ${mag.mag_subgenre_name}, ${mag.mag_editorial_name}, ${mag.mag_year}</div>

          <div class="posProduct-cardRow cardMagEDQid productId">${mag.magfs_id}</div>

          <div class="posProduct-cardRow cardMagBarcode productBarcode">${mag.barcode_number}</div>

          <div class="posProduct-cardDot cardMagAmount productAmount">${mag.current_amount} unidades</div>

          ${mag.party_price ? `<div class="posProduct-cardDot cardMagPrice productPrice">$${typeof mag.party_price === 'string' ? mag.party_price.includes('.') ? mag.party_price.padEnd(mag.party_price.indexOf('.') + 3, '0') : mag.party_price + '.00' : mag.party_price.toFixed(2)}</div>` : '<div class="posProduct-cardDot cardMagPrice productPrice">$0.00</div>'}

        </div>



      `;
    }).join('')
      }
  `;
  } else {
    htmlMagazines = '';
  }

  if (htmlBooks === '' && htmlSeparators === '' && htmlMagazines === '') {
    return '';
  } else {
    return htmlBooks + htmlSeparators + htmlMagazines;
  }
}
