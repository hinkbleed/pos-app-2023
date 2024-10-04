import mysql from 'mysql2/promise';
import { createFullstorageBookEDQid, createFullstorageMagEDQid, createFullstorageSeparEDQid } from '../../../schemas/fullstorage/products/createEDQid.js';
import { escapeRegExp } from '../../../schemas/universal-formats/escapeRegExp.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSTORAGE'
};

const connection = await mysql.createConnection(config);

export class FullproductsModel {
  static async getAllBooks () {
    const [fsbooks] = await connection.query(
      `SELECT bfs.bookfs_id,
              bfs.book_id,
              bfs.bookfs_kind,
              bfs.bookfs_amount,
              bfs.bookfs_price,
              bbc.barcode_number,
              b.book_name,
              b.book_author,
              b.book_year,
              b.book_editorial_name,
              b.book_editorial_id,
              b.book_genre_name,
              b.book_genre_id,
              b.book_subgenre_name,
              b.book_subgenre_id
          FROM booksFullstorage
          AS bfs
          LEFT JOIN bookBarcodes
          AS bbc
          ON bfs.book_id = bbc.book_id
          LEFT JOIN books
          AS b
          ON bfs.book_id = b.book_id;`
    );
    return { books: fsbooks };
  }

  static async getAllSepars () {
    const [fsseparators] = await connection.query(
      `SELECT sfs.separfs_id,
              sfs.separ_id,
              sfs.separfs_amount,
              sfs.separfs_price,
              sbc.barcode_number,
              s.separ_name,
              s.separ_material,
              s.separ_print,
              s.separ_description
      FROM separatorsFullstorage
      AS sfs
      LEFT JOIN separBarcodes
      AS sbc
      ON sfs.separ_id = sbc.separ_id
      LEFT JOIN separators
      AS s
      ON sfs.separ_id = s.separ_id;`
    );
    return { separators: fsseparators };
  }

  static async getAllMags () {
    const [fsmagazines] = await connection.query(
      `SELECT mfs.magfs_id,
              mfs.mag_id,
              mfs.magfs_price,
              mfs.magfs_amount,
              mbc.barcode_number,
              m.mag_name,
              m.mag_author,
              m.mag_year,
              m.mag_editorial_name,
              m.mag_editorial_id,
              m.mag_subgenre_name,
              m.mag_subgenre_id
      FROM magazinesFullstorage
      AS mfs
      LEFT JOIN magBarcodes
      AS mbc
      ON mfs.mag_id = mbc.mag_id
      LEFT JOIN magazines
      AS m
      ON mfs.mag_id = m.mag_id;`
    );
    return { magazines: fsmagazines };
  }

  static async createBook ({ input }) {
    try {
      const fullstorageBookId = createFullstorageBookEDQid(input);

      await connection.query(
        `INSERT INTO booksFullstorage (bookfs_id, book_id, bookfs_kind, bookfs_amount, bookfs_price)
        VALUES (?, ?, ?, ?, ?);`,
        [fullstorageBookId, input.book_id, input.bookfs_kind, input.bookfs_amount, input.bookfs_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getBooksByIdAndKind (data) {
    const [fsbooksbyid] = await connection.query(
      `SELECT bfs.bookfs_id,
          bfs.book_id,
          bfs.bookfs_kind,
          bfs.bookfs_amount,
          bfs.bookfs_price
      FROM booksFullstorage AS bfs
      WHERE bfs.book_id = ? AND bfs.bookfs_kind = ?;`,
      [data.book_id, data.bookfs_kind]
    );
    return { books: fsbooksbyid };
  }

  static async updateBookById ({ input, resultAmount, newPrice }) {
    console.log(input[0].bookfs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE booksFullstorage 
           SET bookfs_amount = ? 
           WHERE bookfs_id = ?`,
          [resultAmount, input[0].bookfs_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No book found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating bookfs_kind: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE booksFullstorage 
              SET bookfs_amount = ?,
                  bookfs_price = ?
            WHERE bookfs_id = ?`,
          [resultAmount, newPrice, input[0].bookfs_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No book found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating bookfs_kind: ' + error.message);
      }
    }
  }

  static async createSepar ({ input }) {
    try {
      const fullstorageSeparId = createFullstorageSeparEDQid(input);

      // Insertar el libro en la base de datos
      await connection.query(
        `INSERT INTO separatorsFullstorage (separfs_id, separ_id, separfs_amount, separfs_price)
        VALUES (?, ?, ?, ?);`,
        [fullstorageSeparId, input.separ_id, input.separfs_amount, input.separfs_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getSeparById (data) {
    const [fsseparsbyid] = await connection.query(
      `SELECT sfs.separfs_id,
          sfs.separ_id,
          sfs.separfs_amount,
          sfs.separfs_price
      FROM separatorsFullstorage AS sfs
      WHERE sfs.separ_id = ?;`,
      [data.separ_id]
    );
    return { separators: fsseparsbyid };
  }

  static async updateSeparById ({ input, resultAmount, newPrice }) {
    console.log(input[0].separfs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE separatorsFullstorage 
           SET separfs_amount = ? 
           WHERE separfs_id = ?`,
          [resultAmount, input[0].separfs_id]
        );
        if (result.affectedRows === 0) {
          throw new Error('No separ found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating separfs_amount: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE separatorsFullstorage 
              SET separfs_amount = ?,
                  separfs_price = ?
            WHERE separfs_id = ?`,
          [resultAmount, newPrice, input[0].separfs_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No separ found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating separfs_price: ' + error.message);
      }
    }
  }

  static async createMag ({ input }) {
    try {
      const fullstorageMagId = createFullstorageMagEDQid(input);

      // Insertar el libro en la base de datos
      await connection.query(
        `INSERT INTO magazinesFullstorage (magfs_id, mag_id, magfs_amount, magfs_price)
        VALUES (?, ?, ?, ?);`,
        [fullstorageMagId, input.mag_id, input.magfs_amount, input.magfs_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getMagazinesById (data) {
    const [fsmagsbyid] = await connection.query(
      `SELECT mfs.magfs_id,
          mfs.mag_id,
          mfs.magfs_amount,
          mfs.magfs_price
      FROM magazinesFullstorage AS mfs
      WHERE mfs.mag_id = ?;`,
      [data.mag_id]
    );
    return { magazines: fsmagsbyid };
  }

  static async updateMagazineById ({ input, resultAmount, newPrice }) {
    console.log(input[0].magfs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE magazinesFullstorage 
           SET magfs_amount = ? 
           WHERE magfs_id = ?`,
          [resultAmount, input[0].magfs_id]
        );
        if (result.affectedRows === 0) {
          throw new Error('No magazines found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating magfs_amount: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE magazinesFullstorage 
              SET magfs_amount = ?,
                  magfs_price = ?
            WHERE magfs_id = ?`,
          [resultAmount, newPrice, input[0].magfs_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No magazines found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating magfs_price: ' + error.message);
      }
    }
  }

  static async getProductsByQuerySearch (input) {
    const escapedInput = escapeRegExp(input);

    const [booksbyquerysearch] = await connection.query(
      `SELECT b.book_id,
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
       FROM books AS b
       LEFT JOIN bookBarcodes AS bbc ON b.book_id = bbc.book_id
       WHERE b.book_name REGEXP ? OR bbc.barcode_number REGEXP ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`]
    );

    const [magazinesbyquerysearch] = await connection.query(
      `SELECT m.mag_id,
              m.mag_name,
              m.mag_author,
              m.mag_year,
              m.mag_editorial_name,
              m.mag_editorial_id,
              m.mag_subgenre_name,
              m.mag_subgenre_id,
              m.mag_price,
              mbc.barcode_number
       FROM magazines AS m
       LEFT JOIN magBarcodes AS mbc ON m.mag_id = mbc.mag_id
       WHERE m.mag_name REGEXP ? OR mbc.barcode_number REGEXP ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`]
    );

    const [separatorsbyquerysearch] = await connection.query(
      `SELECT s.separ_id,
              s.separ_name,
              s.separ_material,
              s.separ_print,
              s.separ_description,
              s.separ_price,
              sbc.barcode_number
       FROM separators AS s
       LEFT JOIN separBarcodes AS sbc ON s.separ_id = sbc.separ_id
       WHERE s.separ_name REGEXP ? OR sbc.barcode_number REGEXP ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`]
    );

    console.log(booksbyquerysearch, separatorsbyquerysearch, magazinesbyquerysearch);
    return { books: booksbyquerysearch, separators: separatorsbyquerysearch, magazines: magazinesbyquerysearch };
  }

  static async getFullproductsByQuerySearch (input) {
    const escapedInput = escapeRegExp(input);

    const [booksbyquerysearch] = await connection.query(
      `SELECT bfs.bookfs_id,
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
       FROM booksFullstorage AS bfs
       LEFT JOIN books AS b ON bfs.book_id = b.book_id
       LEFT JOIN bookBarcodes AS bbc ON bfs.book_id = bbc.book_id
       WHERE b.book_name REGEXP ? OR bbc.barcode_number REGEXP ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`]
    );

    const [separatorsbyquerysearch] = await connection.query(
      `SELECT sfs.separfs_id,
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
       FROM separatorsFullstorage AS sfs
       LEFT JOIN separators AS s ON sfs.separ_id = s.separ_id
       LEFT JOIN separBarcodes AS sbc ON sfs.separ_id = sbc.separ_id
       WHERE s.separ_name REGEXP ? OR sbc.barcode_number REGEXP ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`]
    );

    const [magazinesbyquerysearch] = await connection.query(
      `SELECT mfs.magfs_id,
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
       FROM magazinesFullstorage AS mfs
       LEFT JOIN magazines AS m ON mfs.mag_id = m.mag_id
       LEFT JOIN magBarcodes AS mbc ON mfs.mag_id = mbc.mag_id
       WHERE m.mag_name REGEXP ? OR mbc.barcode_number REGEXP ?;`,
      [`(^|\\s)${escapedInput}`, `^${escapedInput}`]
    );
    return { books: booksbyquerysearch, separators: separatorsbyquerysearch, magazines: magazinesbyquerysearch };
  }
}
