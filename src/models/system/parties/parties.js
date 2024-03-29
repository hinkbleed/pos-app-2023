import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSYSTEM'
};
const connection = await mysql.createConnection(config);

export class PartyModel {
  static async getAll () {
    const [parties] = await connection.query(
      'SELECT event_id, event_name, event_start_date, event_end_date, event_location, event_creation_date FROM EDQparties;'
    );
    return parties;
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
