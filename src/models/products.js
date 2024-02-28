import mysql from 'mysql2/promise';
//  import { createEDQid } from '../schemas/createEDQid.js';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'edqdev',
  database: 'devDemOne'
};
const connection = await mysql.createConnection(config);

export class ProductModel {
  static async getAll () {
    const [products] = await connection.query(
      'SELECT book_id, name, providor, editorial, year, author_1, kind, price FROM books;'
    );
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
