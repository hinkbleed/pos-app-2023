import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQPASSWORDS'
};

export class PasswordModel {
  static async verifyPassword (password, req, res) {
    try {
      const connection = await mysql.createConnection(config);

      const [result] = await connection.execute(
        `
        SELECT password
        FROM (
            SELECT employee_password AS password FROM employeePasswords
            UNION ALL
            SELECT company_password AS password FROM companyPasswords
        ) AS allPasswords
        WHERE BINARY password IN (?, ?)
        `,
        [password, password]
      );
      await connection.end();

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al buscar contraseña:', error);
      throw error;
    }
  }
}
