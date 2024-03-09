import mysql from 'mysql2/promise';
import { createEditEDQid } from '../../../schemas/editorials/createEditEDQid.js';

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
    const newIDcounter = editIDcounter + 1;
    const editId = createEditEDQid(newIDcounter);

    try {
      await connection.query(
        `INSERT INTO editorials (edit_id, edit_name)
        VALUES (?, ?);`,
        [editId, editName]
      );
    } catch (e) {
      throw new Error('Error creating editorial');
    }
    await connection.query(
      'UPDATE editIDcounter SET editIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }
}
