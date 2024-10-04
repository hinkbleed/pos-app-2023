import mysql from 'mysql2/promise';
import { createPartyEDQid } from '../../../schemas/partyconfig/createEDQid.js';

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
      'SELECT party_id, party_name, party_startDate, party_endDate, party_place, party_city, party_creationDate FROM parties;'
    );
    return parties;
  }

  static async createParty ({ input }) {
    const [counterDB] = await connection.query(
      'SELECT partyIDcounter FROM partyIDcounter;'
    );
    const partyIDcounter = counterDB[0].partyIDcounter;
    console.log(partyIDcounter);
    const newIDcounter = partyIDcounter + 1;
    const partyId = createPartyEDQid(newIDcounter);
    console.log(partyId);
    console.log(input);

    try {
      await connection.query(
        `INSERT INTO parties (party_id, party_name, party_startDate, party_endDate, party_place, party_street, party_adressNumber, party_city, party_postalCode, party_state)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [partyId, input.party_name, input.party_startDate, input.party_endDate, input.party_place, input.party_street, input.party_adressNumber, input.party_city, input.party_postalCode, 'Creado']
      );
    } catch (e) {
      // Mostrar el error específico
      console.error('Error creating party:', e.message);
      console.error('SQL Error Code:', e.code); // Código de error SQL (si está disponible)
      console.error('SQL Error SQLState:', e.sqlState); // Estado SQL (si está disponible)
      console.error('SQL Error SQL:', e.sql); // Consulta SQL que causó el error
      throw new Error('Error creating party: ' + e.message); // Lanzar el error específico
    }
    await connection.query(
      'UPDATE partyIDcounter SET partyIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }

  static async getPartyById (partyId) {
    const [party] = await connection.query(
      'SELECT party_id, party_name, party_startDate, party_endDate, party_place, party_street, party_adressNumber, party_city, party_postalCode, party_creationDate, party_state FROM parties WHERE party_id = ?;', [partyId]
    );
    return party;
  }

  static async updateParty ({ input, partyId }) {
    try {
      // Actualizar los datos de la fiesta en la tabla 'parties'
      await connection.query(
        `UPDATE parties
         SET party_name = ?,
             party_startDate = ?,
             party_endDate = ?,
             party_place = ?,
             party_street = ?,
             party_adressNumber = ?,
             party_city = ?,
             party_postalCode = ?,
             party_state = ?
         WHERE party_id = ?;`,
        [
          input.party_name,
          input.party_startDate,
          input.party_endDate,
          input.party_place,
          input.party_street,
          input.party_adressNumber,
          input.party_city,
          input.party_postalCode,
          'Actualizado',
          partyId
        ]
      );
    } catch (e) {
      // Manejo de errores
      console.error('Error updating party:', e.message);
      console.error('SQL Error Code:', e.code);
      console.error('SQL Error SQLState:', e.sqlState);
      console.error('SQL Error SQL:', e.sql);
      throw new Error('Error updating party: ' + e.message);
    }
  }
}
