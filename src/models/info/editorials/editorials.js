import mysql from 'mysql2/promise';
import { createEditEDQid } from '../../../schemas/dataconfig/editorials/createEditEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQINFO'
};
const connection = await mysql.createConnection(config);

export class EditorialModel {
  static async getAll () {
    const [editorials] = await connection.query(
      'SELECT edit_id, edit_name FROM editorials;'
    );
    return editorials;
  }

  static async create ({ input }) {
    const {
      editName
    } = input;

    const [counterDB] = await connection.query(
      'SELECT editIDcounter FROM editIDcounter;'
    );
    const editIDcounter = counterDB[0].editIDcounter;
    const editId = createEditEDQid(editIDcounter);

    try {
      await connection.query(
        `INSERT INTO editorials (edit_id, edit_name)
        VALUES (?, ?);`,
        [editId, editName]
      );
    } catch (e) {
      throw new Error('Error creating editorial');
    }
    const newIDcounter = editIDcounter + 1;
    await connection.query(
      'UPDATE editIDcounter SET editIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }

  static async delete ({ id }) {
    try {
      const deleteQuery = 'DELETE FROM editorials WHERE edit_id = ?';
      const deleteResult = await connection.query(deleteQuery, [id]);
      if (deleteResult.affectedRows === 0) {
        throw new Error('La editorial no existe o no se pudo eliminar');
      }
      console.log('Editorial eliminada exitosamente');
      return { message: 'Editorial eliminada exitosamente' };
    } catch (error) {
      console.error('Error al eliminar la Editorial:', error);
      throw error;
    }
  }
}
