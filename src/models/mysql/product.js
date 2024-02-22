import mysql from 'mysql2/promise';
import { createEDQid } from '../../schemas/createEDQid.js';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'edqdev',
  database: 'devDemOne'
};
const connection = await mysql.createConnection(config);

export class ProductModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // Obtener los IDs y los géneros de la tabla genres
      const [genres] = await connection.query(`
        SELECT genreId, genre_name FROM genres WHERE LOWER(genre_name) = ?;`, [lowerCaseGenre]
      );

      // Si no se encuentra ningún género, retornar un array vacío
      if (genres.length === 0) return [];

      // Obtener el ID del primer resultado de género
      const [{ genreId }] = genres;

      // Obtener el product_id de los elementos en la tabla products_genres donde el genre_id coincida con el id del género solicitado
      const [productGenres] = await connection.query(`
        SELECT product_id FROM books_genres WHERE genreId = ?;`, [genreId]
      );

      const relNamePromises = productGenres.map(async productGenre => {
        const [result] = await connection.query(
          'SELECT name FROM books WHERE book_id = (?)',
          [productGenre.product_id]
        );
        return result[0]?.name; // Si hay resultados, retorna el nombre del producto, de lo contrario retorna undefined
      });
      const relNames = await Promise.all(relNamePromises);

      const [products] = await connection.query(
        `SELECT book_id, name, providor, editorial, year, author_1, kind, price FROM books 
        WHERE name IN (?)`, [relNames.filter(name => name !== undefined)]
      );
      return products;
    }

    const [products] = await connection.query(
      'SELECT book_id, name, providor, editorial, year, author_1, kind, price FROM books;'
    );

    return products;
  }

  static async getById ({ id }) {
    const [products] = await connection.query(
      `SELECT book_id, name, providor, editorial, year, author_1, kind, price
      FROM books WHERE book_id = ?;`,
      [id]
    );

    if (products.length === 0) return null;

    return products[0];
  }

  static async create ({ input }) {
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
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
