import mysql from 'mysql2/promise';
//  import { createEDQid } from '../schemas/createEDQid.js';

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
    const [books] = await connection.query(
      'SELECT book_id, book_name, book_author_1, book_author_2, book_year, book_editorial_name, book_editorial_id, book_genre_name, book_genre_id, book_subgenre_name, book_subgenre_id, book_price FROM books;'
    );

    const [separators] = await connection.query(
      `SELECT separ_id,
              separ_name,
              separ_description,
              separ_price
      FROM separators;`
    );

    const [magazines] = await connection.query(
      `SELECT mag_id,
              mag_name,
              mag_editor_1,
              mag_editor_2,
              mag_year,
              mag_editorial_name,
              mag_editorial_id,
              mag_genre_name,
              mag_genre_id,
              mag_subgenre_name,
              mag_subgenre_id,
              mag_price
      FROM magazines;`
    );

    const products = [books, separators, magazines];
    return products;
  }

  /*  static async getById ({ id }) {
    const [products] = await connection.query(
      `SELECT book_id, name, providor, editorial, year, author_1, kind, price
      FROM books WHERE book_id = ?;`,
      [id]
    );

    if (products.length === 0) return null;

    return products[0];
  } */

  /*  static async create ({ input }) {
    const {
      name,
      providor,
      editorial,
      year,
      author1,
      kind,
      price
    } = input;

    //  Aqui falta crear la conexión con los géneros

    const [createIdResult] = createEDQid();

    try {
      await connection.query(
        `INSERT INTO books (book_id, name, providor, editorial, year, author_1, kind, price)
        VALUES (${createIdResult},?, ?, ?, ?, ?, ?, ?);`,
        [name, providor, editorial, year, author1, kind, price]
      );
    } catch (e) {
      throw new Error('Error creating product');
    }

    const [products] = await connection.query(
      `SELECT book_id, name, providor, editorial, year, author_1, kind, price
      FROM books WHERE book_id = ?;`,
      [createIdResult]
    );
    return products[0];
  } */

  /*  static async delete ({ id }) {

  } */

  /*  static async update ({ id, input }) {

  } */
}
