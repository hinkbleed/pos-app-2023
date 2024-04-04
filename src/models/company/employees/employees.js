import mysql from 'mysql2/promise';
import { createEmployEDQid } from '../../../schemas/dataconfig/employees/createEmployEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQCOMPANY'
};
const connection = await mysql.createConnection(config);

export class EmployeeModel {
  static async getAll () {
    const [employees] = await connection.query(
      'SELECT employ_id, employ_name, employ_lastname, employ_number, employ_status, employ_alias FROM employees;'
    );
    return employees;
  }

  static async create ({ input }) {
    const {
      employName,
      employLastname,
      employNumber,
      employAlias
    } = input;

    console.log(input);

    const [counterDB] = await connection.query(
      'SELECT employIDcounter FROM employIDcounter;'
    );
    const employIDcounter = counterDB[0].employIDcounter;
    const employId = createEmployEDQid(employIDcounter);
    console.log(employId);

    try {
      await connection.query(
        `INSERT INTO employees (employ_id, employ_name, employ_lastname, employ_number, employ_status, employ_alias)
        VALUES (?, ?, ?, ?, ?, ?);`,
        [employId, employName, employLastname, employNumber, 'inactivo', employAlias]
      );
    } catch (e) {
      throw new Error('Error creating employee');
    }
    const newIDcounter = employIDcounter + 1;
    await connection.query(
      'UPDATE employIDcounter SET employIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }

  static async getById (employId) {
    const employee = await connection.query(
      'SELECT employ_id, employ_name, employ_lastname, employ_number, employ_status, employ_alias FROM employees WHERE employ_id = ?;',
      [employId]
    );
    return employee[0];
  }

  static async update ({ id, newData }) {
    try {
      const currentInfo = await connection.query(
        'SELECT employ_name FROM employees WHERE employ_id = ?',
        [id]
      );
      if (currentInfo.length === 0) {
        throw new Error('Empleado no encontrado');
      }
      await connection.query(
        'UPDATE employees SET employ_name = ?, employ_lastname = ?, employ_number = ?, employ_alias = ? WHERE employ_id = ?',
        [newData.employName, newData.employLastname, newData.employNumber, newData.employAlias, id]
      );
      return { message: 'Información del empleado actualizada correctamente' };
    } catch (error) {
      console.error('Error al actualizar la información del empleado:', error);
      throw error;
    }
  }
}
