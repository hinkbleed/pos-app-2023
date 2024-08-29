import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSYSTEM'
};
const connection = await mysql.createConnection(config);

export class DiscountModel {
  static async createDiscount ({ input }) {
    try {
      await connection.query(
        `INSERT INTO discounts (discount_amount, discount_kind)
        VALUES (?, ?);`,
        [input.discount_amount, input.discount_kind]
      );
    } catch (e) {
      // Mostrar el error específico
      console.error('Error creating discount:', e.message);
      console.error('SQL Error Code:', e.code); // Código de error SQL (si está disponible)
      console.error('SQL Error SQLState:', e.sqlState); // Estado SQL (si está disponible)
      console.error('SQL Error SQL:', e.sql); // Consulta SQL que causó el error
      throw new Error('Error creating discount: ' + e.message); // Lanzar el error específico
    }
  }

  static async getAllDiscounts () {
    const [discounts] = await connection.query(
      'SELECT discount_id, discount_amount, discount_kind FROM discounts;'
    );
    return discounts;
  }

  static async deleteDiscount (id) {
    try {
      await connection.query(
        `DELETE FROM discounts
         WHERE discount_id = ?;`,
        [id]
      );
    } catch (e) {
      // Mostrar el error específico
      console.error('Error creating party:', e.message);
      console.error('SQL Error Code:', e.code); // Código de error SQL (si está disponible)
      console.error('SQL Error SQLState:', e.sqlState); // Estado SQL (si está disponible)
      console.error('SQL Error SQL:', e.sql); // Consulta SQL que causó el error
      throw new Error('Error creating party: ' + e.message); // Lanzar el error específico
    }
  }
}
