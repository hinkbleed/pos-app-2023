import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'teotDev',
  database: 'EDQpasswords'
};
const connection = await mysql.createConnection(config);

export class PasswordModel {
  static async getAll () {
    const [passwords] = await connection.query(`
    SELECT employee_password AS password FROM employeePasswords
    UNION 
    SELECT company_password AS password FROM companyPasswords`
    );
    return passwords;
  }
}
