import mysql from 'mysql2/promise';
import { createSubgenreEDQid } from '../../../schemas/dataconfig/subgenres/createSubgenreEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQINFO'
};
const connection = await mysql.createConnection(config);

export class SubgenreModel {
  static async getAll () {
    const [subgenres] = await connection.query(
      'SELECT subgenre_id, subgenre_name, subgenre_abv FROM subgenres;'
    );
    return subgenres;
  }

  static async create ({ input }) {
    const {
      subgenreName,
      subgenreAbv
    } = input;

    const [counterDB] = await connection.query(
      'SELECT subgenreIDcounter FROM subgenreIDcounter;'
    );
    const subgenreIDcounter = counterDB[0].subgenreIDcounter;
    const subgenreId = createSubgenreEDQid(subgenreIDcounter);

    try {
      await connection.query(
        `INSERT INTO subgenres (subgenre_id, subgenre_name, subgenre_abv)
        VALUES (?, ?, ?);`,
        [subgenreId, subgenreName, subgenreAbv]
      );
    } catch (e) {
      throw new Error('Error creating Subgenre');
    }
    const newIDcounter = subgenreIDcounter + 1;
    await connection.query(
      'UPDATE subgenreIDcounter SET subgenreIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }

  static async delete ({ id }) {
    try {
      const deleteQuery = 'DELETE FROM subgenres WHERE subgenre_id = ?';
      const deleteResult = await connection.query(deleteQuery, [id]);
      if (deleteResult.affectedRows === 0) {
        throw new Error('El subgénero no existe o no se pudo eliminar');
      }
      console.log('Subgénero eliminado exitosamente');
      return { message: 'Subgénero eliminado exitosamente' };
    } catch (error) {
      console.error('Error al eliminar el Subgénero:', error);
      throw error;
    }
  }
}
