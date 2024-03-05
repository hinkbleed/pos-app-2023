import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'edqdev',
  database: 'EDQpasswords'
};

export class PasswordModel {
  static async verifyPassword (password, req, res) {
    try {
      const connection = await mysql.createConnection(config);

      const [result] = await connection.execute(
        `
        SELECT employee_password AS password FROM employeePasswords WHERE employee_password = ?
        UNION 
        SELECT company_password AS password FROM companyPasswords WHERE company_password = ?`,
        [password, password]);

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
