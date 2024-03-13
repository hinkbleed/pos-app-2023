import mysql from 'mysql2/promise';
import { createGenreEDQid } from '../../../schemas/dataconfig/genres/createGenreEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQINFO'
};
const connection = await mysql.createConnection(config);

export class GenreModel {
  static async getAll () {
    const [genres] = await connection.query(
      'SELECT genre_id, genre_name, genre_abv FROM genres;'
    );
    return genres;
  }

  static async create ({ input }) {
    const {
      genreName,
      genreAbv
    } = input;

    const [counterDB] = await connection.query(
      'SELECT genreIDcounter FROM genreIDcounter;'
    );
    const genreIDcounter = counterDB[0].genreIDcounter;
    const genreId = createGenreEDQid(genreIDcounter);

    try {
      await connection.query(
        `INSERT INTO genres (genre_id, genre_name, genre_abv)
        VALUES (?, ?, ?);`,
        [genreId, genreName, genreAbv]
      );
    } catch (e) {
      throw new Error('Error creating genre');
    }
    const newIDcounter = genreIDcounter + 1;
    await connection.query(
      'UPDATE genreIDcounter SET genreIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }
}
