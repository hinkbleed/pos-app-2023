import mysql from 'mysql2/promise';
import { escapeRegExp } from '../../../schemas/universal-formats/escapeRegExp.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSTORAGE'
};
const connection = await mysql.createConnection(config);

export class ShopModel {
  static async getAllBooks (partyId) {
    const [Books] = await connection.query(
      `SELECT bpa.fs_id, 
              bpa.party_id,
              bpa.current_amount,
              bpa.init_amount,
              bpa.party_price,
              bfs.bookfs_id,
              bfs.book_id,
              bfs.bookfs_kind,
              bfs.bookfs_amount,
              bfs.bookfs_price,
              b.book_name,
              b.book_author,
              b.book_year,
              b.book_editorial_name,
              b.book_editorial_id,
              b.book_genre_name,
              b.book_genre_id,
              b.book_subgenre_name,
              b.book_subgenre_id,
              b.book_price,
              bbc.barcode_number
       FROM bookPartyAssignments AS bpa
       LEFT JOIN booksFullstorage AS bfs ON bpa.fs_id = bfs.bookfs_id
       LEFT JOIN books AS b ON bfs.book_id = b.book_id
       LEFT JOIN bookBarcodes AS bbc ON bfs.book_id = bbc.book_id
       WHERE bpa.party_id = ?;`, [partyId]
    );
    return { books: Books };
  }

  static async getAllSeparators (partyId) {
    const [Separators] = await connection.query(
      `SELECT spa.fs_id, 
              spa.party_id,
              spa.current_amount,
              spa.init_amount,
              spa.party_price,
              sfs.separfs_id,
              sfs.separ_id,
              sfs.separfs_amount,
              sfs.separfs_price,
              s.separ_name,
              s.separ_material,
              s.separ_print,
              s.separ_description,
              s.separ_price,
              sbc.barcode_number
       FROM separatorPartyAssignments AS spa
       LEFT JOIN separatorsFullstorage AS sfs ON spa.fs_id = sfs.separfs_id
       LEFT JOIN separators AS s ON sfs.separ_id = s.separ_id
       LEFT JOIN separBarcodes AS sbc ON sfs.separ_id = sbc.separ_id
       WHERE spa.party_id = ?;`, [partyId]
    );
    console.log({ separators: Separators });
    return { separators: Separators };
  }

  static async getAllMagazines (partyId) {
    const [Magazines] = await connection.query(
      `SELECT mpa.fs_id, 
              mpa.party_id,
              mpa.current_amount,
              mpa.init_amount,
              mpa.party_price,
              mfs.magfs_id,
              mfs.mag_id,
              mfs.magfs_amount,
              mfs.magfs_price,
              m.mag_name,
              m.mag_author,
              m.mag_year,
              m.mag_editorial_name,
              m.mag_editorial_id,
              m.mag_subgenre_name,
              m.mag_subgenre_id,
              m.mag_price,
              mbc.barcode_number
       FROM magazinePartyAssignments AS mpa
       LEFT JOIN magazinesFullstorage AS mfs ON mpa.fs_id = mfs.magfs_id
       LEFT JOIN magazines AS m ON mfs.mag_id = m.mag_id
       LEFT JOIN magBarcodes AS mbc ON mfs.mag_id = mbc.mag_id
       WHERE mpa.party_id = ?;`, [partyId]
    );
    return { magazines: Magazines };
  }

  static async createBook ({ input }) {
    try {
      await connection.query(
        `INSERT INTO bookPartyAssignments (fs_id, party_id, current_amount, init_amount, party_price)
        VALUES (?, ?, ?, ?, ?);`,
        [input.fs_id, input.party_id, input.amount, input.amount, input.party_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getBooksById (data) {
    const [partybooksbyid] = await connection.query(
      `SELECT bpa.fs_id,
              bpa.party_id,
              bpa.init_amount,
              bpa.current_amount,
              bpa.party_price
      FROM bookPartyAssignments AS bpa
      WHERE bpa.fs_id = ? AND bpa.party_id = ?;`,
      [data.fs_id, data.party_id]
    );
    return { books: partybooksbyid };
  }

  static async updateBookById ({ input, resultAmount, newPrice }) {
    console.log(input[0].fs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE bookPartyAssignments 
          SET current_amount = ? 
          WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No book found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating book: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE bookPartyAssignments 
              SET current_amount = ?,
                  party_price = ?
            WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, newPrice, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No book found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating book: ' + error.message);
      }
    }
  }

  static async createSeparator ({ input }) {
    try {
      await connection.query(
        `INSERT INTO separatorPartyAssignments (fs_id, party_id, current_amount, init_amount, party_price)
        VALUES (?, ?, ?, ?, ?);`,
        [input.fs_id, input.party_id, input.amount, input.amount, input.party_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getSeparatorsById (data) {
    const [partyseparsbyid] = await connection.query(
      `SELECT spa.fs_id,
              spa.party_id,
              spa.init_amount,
              spa.current_amount,
              spa.party_price
      FROM separatorPartyAssignments AS spa
      WHERE spa.fs_id = ? AND spa.party_id = ?;`,
      [data.fs_id, data.party_id]
    );
    return { separs: partyseparsbyid };
  }

  static async updateSeparatorById ({ input, resultAmount, newPrice }) {
    console.log(input[0].fs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE separatorPartyAssignments 
          SET current_amount = ? 
          WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No separator found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating book: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE separatorPartyAssignments 
              SET current_amount = ?,
                  party_price = ?
            WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, newPrice, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No separator found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating separator: ' + error.message);
      }
    }
  }

  static async createMagazine ({ input }) {
    try {
      await connection.query(
        `INSERT INTO magazinePartyAssignments (fs_id, party_id, current_amount, init_amount, party_price)
        VALUES (?, ?, ?, ?, ?);`,
        [input.fs_id, input.party_id, input.amount, input.amount, input.party_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getMagazinesById (data) {
    const [partymagazinesbyid] = await connection.query(
      `SELECT mpa.fs_id,
              mpa.party_id,
              mpa.init_amount,
              mpa.current_amount,
              mpa.party_price
      FROM magazinePartyAssignments AS mpa
      WHERE mpa.fs_id = ? AND mpa.party_id = ?;`,
      [data.fs_id, data.party_id]
    );
    return { magazines: partymagazinesbyid };
  }

  static async updateMagazineById ({ input, resultAmount, newPrice }) {
    console.log(input[0].fs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE magazinePartyAssignments 
          SET current_amount = ? 
          WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No magazine found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating magazine: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE magazinePartyAssignments 
              SET current_amount = ?,
                  party_price = ?
            WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, newPrice, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No magazine found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating magazine: ' + error.message);
      }
    }
  }

  static async getPartyproductsByQuerySearch (input, id) {
    const escapedInput = escapeRegExp(input);

    const [booksbyquerysearch] = await connection.query(
      `SELECT bpa.fs_id, 
              bpa.party_id,
              bpa.current_amount,
              bpa.init_amount,
              bpa.party_price,
              bfs.bookfs_id,
              bfs.book_id,
              bfs.bookfs_kind,
              bfs.bookfs_amount,
              bfs.bookfs_price,
              b.book_id,
              b.book_name,
              b.book_author,
              b.book_year,
              b.book_editorial_name,
              b.book_editorial_id,
              b.book_genre_name,
              b.book_genre_id,
              b.book_subgenre_name,
              b.book_subgenre_id,
              b.book_price,
              bbc.barcode_number
       FROM bookPartyAssignments as bpa
       LEFT JOIN booksFullstorage AS bfs ON bpa.fs_id = bfs.bookfs_id
       LEFT JOIN books AS b ON bfs.book_id = b.book_id
       LEFT JOIN bookBarcodes AS bbc ON bfs.book_id = bbc.book_id
       WHERE (b.book_name REGEXP ? OR bbc.barcode_number REGEXP ?) 
       AND bpa.party_id = ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`, id]
    );

    const [separatorsbyquerysearch] = await connection.query(
      `SELECT spa.fs_id, 
              spa.party_id,
              spa.current_amount,
              spa.init_amount,
              spa.party_price,
              sfs.separfs_id,
              sfs.separ_id,
              sfs.separfs_amount,
              sfs.separfs_price,
              s.separ_id,
              s.separ_name,
              s.separ_material,
              s.separ_print,
              s.separ_description,
              s.separ_price,
              sbc.barcode_number
       FROM separatorPartyAssignments AS spa
       LEFT JOIN separatorsFullstorage AS sfs ON spa.fs_id = sfs.separfs_id
       LEFT JOIN separators AS s ON sfs.separ_id = s.separ_id
       LEFT JOIN separBarcodes AS sbc ON sfs.separ_id = sbc.separ_id
       WHERE (s.separ_name REGEXP ? OR sbc.barcode_number REGEXP ?) 
       AND spa.party_id = ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`, id]
    );

    const [magazinesbyquerysearch] = await connection.query(
      `SELECT mpa.fs_id, 
              mpa.party_id,
              mpa.current_amount,
              mpa.init_amount,
              mpa.party_price,
              mfs.magfs_id,
              mfs.mag_id,
              mfs.magfs_amount,
              mfs.magfs_price,
              m.mag_id,
              m.mag_name,
              m.mag_author,
              m.mag_year,
              m.mag_editorial_name,
              m.mag_editorial_id,
              m.mag_subgenre_name,
              m.mag_subgenre_id,
              m.mag_price,
              mbc.barcode_number
       FROM magazinePartyAssignments AS mpa
       LEFT JOIN magazinesFullstorage AS mfs ON mpa.fs_id = mfs.magfs_id
       LEFT JOIN magazines AS m ON mfs.mag_id = m.mag_id
       LEFT JOIN magBarcodes AS mbc ON mfs.mag_id = mbc.mag_id
       WHERE (m.mag_name REGEXP ? OR mbc.barcode_number REGEXP ?) 
       AND mpa.party_id = ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`, id]
    );
    console.log({ books: booksbyquerysearch, separators: separatorsbyquerysearch, magazines: magazinesbyquerysearch });
    return { books: booksbyquerysearch, separators: separatorsbyquerysearch, magazines: magazinesbyquerysearch };
  }

  static async getPosProducts (input, id) {
    const escapedInput = escapeRegExp(input);

    const [firstBookSearch] = await connection.query(
      `SELECT bpa.fs_id, 
              bpa.party_id,
              bpa.current_amount,
              bpa.party_price,
              bfs.bookfs_id,
              bfs.book_id,
              bfs.bookfs_kind,
              bfs.bookfs_price,
              b.book_id,
              b.book_name,
              b.book_author,
              b.book_year,
              b.book_editorial_name,
              b.book_genre_name,
              b.book_subgenre_name,
              b.book_price,
              bbc.barcode_number
       FROM bookPartyAssignments as bpa
       LEFT JOIN booksFullstorage AS bfs ON bpa.fs_id = bfs.bookfs_id
       LEFT JOIN books AS b ON bfs.book_id = b.book_id
       LEFT JOIN bookBarcodes AS bbc ON bfs.book_id = bbc.book_id
       WHERE (b.book_name REGEXP ? OR bbc.barcode_number REGEXP ?)
       AND bpa.party_id = ?;`, [`(^|\\s)${escapedInput}`, `(^|\\s)${escapedInput}`, id]
    );

    const [firstSeparatorSearch] = await connection.query(
      `SELECT spa.fs_id, 
              spa.party_id,
              spa.current_amount,
              spa.party_price,
              sfs.separfs_id,
              sfs.separ_id,
              sfs.separfs_price,
              s.separ_id,
              s.separ_name,
              s.separ_material,
              s.separ_print,
              s.separ_description,
              s.separ_price,
              sbc.barcode_number
       FROM separatorPartyAssignments AS spa
       LEFT JOIN separatorsFullstorage AS sfs ON spa.fs_id = sfs.separfs_id
       LEFT JOIN separators AS s ON sfs.separ_id = s.separ_id
       LEFT JOIN separBarcodes AS sbc ON sfs.separ_id = sbc.separ_id
       WHERE (s.separ_name REGEXP ? OR sbc.barcode_number REGEXP ?)
       AND spa.party_id = ?;`, [`(^|\\s)${escapedInput}`, `(^|\\s)${escapedInput}`, id]
    );

    const [firstMagazineSearch] = await connection.query(
      `SELECT mpa.fs_id, 
              mpa.party_id,
              mpa.current_amount,
              mpa.party_price,
              mfs.magfs_id,
              mfs.mag_id,
              mfs.magfs_price,
              m.mag_id,
              m.mag_name,
              m.mag_author,
              m.mag_year,
              m.mag_editorial_name,
              m.mag_subgenre_name,
              m.mag_price,
              mbc.barcode_number
       FROM magazinePartyAssignments AS mpa
       LEFT JOIN magazinesFullstorage AS mfs ON mpa.fs_id = mfs.magfs_id
       LEFT JOIN magazines AS m ON mfs.mag_id = m.mag_id
       LEFT JOIN magBarcodes AS mbc ON mfs.mag_id = mbc.mag_id
       WHERE (m.mag_name REGEXP ? OR mbc.barcode_number REGEXP ?)
       AND mpa.party_id = ?;`, [`(^|\\s)${escapedInput}`, `(^|\\s)${escapedInput}`, id]
    );
    return { books: firstBookSearch, separators: firstSeparatorSearch, magazines: firstMagazineSearch };
  }
}
