import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSTORAGE'
};
const connection = await mysql.createConnection(config);

export class ShopModel {
  static async getAllBooks (partyId) {
    const [books] = await connection.query(
      'SELECT fs_id, party_id, current_amount, init_amount FROM bookPartyAssignments WHERE party_id = ?;', [partyId]
    );
    return books;
  }

  static async getAllSeparators (partyId) {
    const [separators] = await connection.query(
      'SELECT fs_id, party_id, current_amount, init_amount FROM separatorPartyAssignments WHERE party_id = ?;', [partyId]
    );
    return separators;
  }

  static async getAllMagazines (partyId) {
    const [Magazines] = await connection.query(
      'SELECT fs_id, party_id, current_amount, init_amount FROM magazinePartyAssignments WHERE party_id = ?;', [partyId]
    );
    return Magazines;
  }

  static async createBook ({ input }) {
    try {
      await connection.query(
        `INSERT INTO bookPartyAssignments (fs_id, party_id, current_amount, init_amount, party_price)
        VALUES (?, ?, ?, ?, ?);`,
        [input.fs_id, input.party_id, input.amount, input.amount, input.party_price || 0]
      );
      return true;
    } catch (error) {
      // Si hay un error, lanzar una excepción
      throw new Error('Error creating product: ' + error.message);
    }
  }

  static async getBooksById (data) {
    const [partybooksbyid] = await connection.query(
      `SELECT bpc.fs_id,
              bpc.party_id,
              bpc.init_amount,
              bpc.current_amount,
              bpc.party_price
      FROM bookPartyAssignments AS bpc
      WHERE bpc.fs_id = ? AND bpc.party_id = ?;`,
      [data.fs_id, data.party_id]
    );
    return { books: partybooksbyid };
  }

  static async updateBookById ({ input, resultAmount, newPrice }) {
    console.log(input[0].fs_id, resultAmount);
    if (newPrice === 0) {
      try {
        const [result] = await connection.query(
          `UPDATE bookPartyAssignments 
          SET current_amount = ? 
          WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No book found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating book: ' + error.message);
      }
    } else {
      try {
        const [result] = await connection.query(
          `UPDATE bookPartyAssignments 
              SET current_amount = ?,
                  party_price = ?
            WHERE fs_id = ? AND party_id = ?;`,
          [resultAmount, newPrice, input[0].fs_id, input[0].party_id]
        );
        // Comprobar si alguna fila fue actualizada
        if (result.affectedRows === 0) {
          throw new Error('No book found with the provided ID');
        }
        return true;
      } catch (error) {
        // Si hay un error, lanzar una excepción
        throw new Error('Error updating book: ' + error.message);
      }
    }
  }
}
