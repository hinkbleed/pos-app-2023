import mysql from 'mysql2/promise';
import { createEditEDQid } from '../schemas/editorials/createEditEDQid.js';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'teotDev',
  database: 'EDQSTORAGE'
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

  /*
  static async create ({ input }) {
    const {
      provName,
      provResp,
      provNumber
    } = input;

    const [counterDB] = await connection.query(
      'SELECT provIDcounter FROM provIDcounter;'
    );
    const provIDcounter = counterDB[0].provIDcounter;
    const newIDcounter = provIDcounter + 1;
    const provId = createProvEDQid(newIDcounter);

    try {
      await connection.query(
        `INSERT INTO providors (prov_id, prov_name, prov_resp, prov_number)
        VALUES (?, ?, ?, ?);`,
        [provId, provName, provResp, provNumber]
      );
    } catch (e) {
      throw new Error('Error creating providor');
    }
    await connection.query(
      'UPDATE provIDcounter SET provIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }

  static async update ({ newValue }) {
    await connection.query(
      'UPDATE provIDcounter SET provIDcounter = ?;',
      [newValue]
    );

    const [currentProvID] = await connection.query(
      'SELECT provIDcounter FROM provIDcounter'
    );
    return currentProvID;
  }
  */
}
