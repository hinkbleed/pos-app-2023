import mysql from 'mysql2/promise';
import { createBookBarcodeEDQid, createBookEDQid, createMagBarcodeEDQid, createMagEDQid, createSeparBarcodeEDQid, createSeparEDQid } from '../../../schemas/dataconfig/products/createEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSTORAGE'
};

const connection = await mysql.createConnection(config);

export class ProductModel {
  static async getAll () {
    const [dbbooks] = await connection.query(
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
      FROM books
      AS b
      LEFT JOIN bookBarcodes
      AS bbc
      ON b.book_id = bbc.book_id;`
    );

    const [dbseparators] = await connection.query(
      `SELECT s.separ_id,
              s.separ_name,
              s.separ_material,
              s.separ_print,
              s.separ_description,
              s.separ_price,
              sbc.barcode_number
      FROM separators
      AS s
      LEFT JOIN separBarcodes
      AS sbc
      ON s.separ_id = sbc.separ_id;`
    );

    const [dbmagazines] = await connection.query(
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
      FROM magazines
      AS m
      LEFT JOIN magBarcodes
      AS mbc
      ON m.mag_id = mbc.mag_id;`
    );

    return { books: dbbooks, separators: dbseparators, magazines: dbmagazines };
  }

  static async createBook ({ input }) {
    const {
      bookName,
      bookAuthor,
      bookYear,
      bookEditorialName,
      bookEditorialId,
      bookBarcode,
      bookPrice,
      bookGenreName,
      bookGenreId,
      bookGenreAbv,
      bookSubgenreName,
      bookSubgenreId,
      bookSubgenreAbv
    } = input;

    try {
      // Obtener el contador del libro
      const [counterDB] = await connection.query('SELECT bookIDcounter FROM bookIDcounter;');
      const bookIDcounter = counterDB[0].bookIDcounter;

      // Crear el ID del libro usando la función createBookEDQid
      const bookId = createBookEDQid(bookIDcounter, bookGenreAbv, bookSubgenreAbv, bookEditorialId);
      const barcodeId = createBookBarcodeEDQid(bookBarcode);

      // Insertar el libro en la base de datos
      await connection.query(
        `INSERT INTO books (book_id, book_name, book_author, book_year, book_editorial_name, book_editorial_id, book_genre_name, book_genre_id, book_subgenre_name, book_subgenre_id, book_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [bookId, bookName, bookAuthor, bookYear, bookEditorialName, bookEditorialId, bookGenreName, bookGenreId, bookSubgenreName, bookSubgenreId, bookPrice || 0]
      );

      await connection.query(`
      INSERT INTO bookBarcodes (barcode_id, barcode_number, book_id) VALUES (?, ?, ?);`,
      [barcodeId, bookBarcode, bookId]
      );
      // Incrementar el contador del libro para el próximo libro
      await connection.query('UPDATE bookIDcounter SET bookIDcounter = ?;', [bookIDcounter + 1]);

      // Si todo ha ido bien, retornar sin lanzar un error
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async createSepar ({ input }) {
    const {
      separName,
      separMaterial,
      separPrint,
      separDescription,
      separPrice,
      separBarcode
    } = input;

    try {
      // Obtener el contador del libro
      const [counterDB] = await connection.query('SELECT separIDcounter FROM separIDcounter;');
      const separIDcounter = counterDB[0].separIDcounter;

      // Crear el ID del libro usando la función createBookEDQid
      const separId = createSeparEDQid(separIDcounter);
      const barcodeId = createSeparBarcodeEDQid(separBarcode);

      // Insertar el libro en la base de datos
      await connection.query(
        `INSERT INTO separators (separ_id, separ_name, separ_material, separ_print, separ_description, separ_price)
        VALUES (?, ?, ?, ?, ?, ?);`,
        [separId, separName, separMaterial, separPrint, separDescription, separPrice || 0]
      );

      await connection.query(`
      INSERT INTO separBarcodes (barcode_id, barcode_number, separ_id) VALUES (?, ?, ?);`,
      [barcodeId, separBarcode, separId]
      );
      // Incrementar el contador del libro para el próximo libro
      await connection.query('UPDATE separIDcounter SET separIDcounter = ?;', [separIDcounter + 1]);

      // Si todo ha ido bien, retornar sin lanzar un error
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async createMag ({ input }) {
    const {
      magName,
      magAuthor,
      magYear,
      magEditorialName,
      magEditorialId,
      magBarcode,
      magPrice,
      magSubgenreName,
      magSubgenreId,
      magSubgenreAbv
    } = input;

    try {
      // Obtener el contador del libro
      const [counterDB] = await connection.query('SELECT magIDcounter FROM magIDcounter;');
      const magIDcounter = counterDB[0].magIDcounter;

      // Crear el ID del libro usando la función createBookEDQid
      const magId = createMagEDQid(magIDcounter, magSubgenreAbv, magEditorialId);
      const barcodeId = createMagBarcodeEDQid(magBarcode);

      // Insertar el libro en la base de datos
      await connection.query(
        `INSERT INTO magazines (mag_id, mag_name, mag_author, mag_year, mag_editorial_name, mag_editorial_id, mag_subgenre_name, mag_subgenre_id, mag_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [magId, magName, magAuthor, magYear, magEditorialName, magEditorialId, magSubgenreName, magSubgenreId, magPrice || 0]
      );

      await connection.query(`
      INSERT INTO magBarcodes (barcode_id, barcode_number, mag_id) VALUES (?, ?, ?);`,
      [barcodeId, magBarcode, magId]
      );
      // Incrementar el contador del libro para el próximo libro
      await connection.query('UPDATE magIDcounter SET magIDcounter = ?;', [magIDcounter + 1]);

      // Si todo ha ido bien, retornar sin lanzar un error
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }
}
