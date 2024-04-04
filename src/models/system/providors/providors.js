import mysql from 'mysql2/promise';
import { createProvEDQid } from '../../../schemas/dataconfig/providors/createProvEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSYSTEM'
};
const connection = await mysql.createConnection(config);

export class ProvidorModel {
  static async getAll () {
    const [providors] = await connection.query(
      'SELECT prov_id, prov_name, prov_resp, prov_number FROM providors;'
    );
    return providors;
  }

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
    const provId = createProvEDQid(provIDcounter);

    try {
      await connection.query(
        `INSERT INTO providors (prov_id, prov_name, prov_resp, prov_number)
        VALUES (?, ?, ?, ?);`,
        [provId, provName, provResp, provNumber]
      );
    } catch (e) {
      throw new Error('Error creating providor');
    }
    const newIDcounter = provIDcounter + 1;
    await connection.query(
      'UPDATE provIDcounter SET provIDcounter = ?', [newIDcounter]
    );
    return counterDB;
  }

  static async update ({ id, newData }) {
    try {
      const currentInfo = await connection.query(
        'SELECT prov_resp, prov_number FROM providors WHERE prov_id = ?',
        [id]
      );
      if (currentInfo.length === 0) {
        throw new Error('Proveedor no encontrado');
      }
      await connection.query(
        'UPDATE providors SET prov_resp = ?, prov_number = ? WHERE prov_id = ?',
        [newData.provResp, newData.provNumber, id]
      );
      return { message: 'Información del proveedor actualizada correctamente' };
    } catch (error) {
      console.error('Error al actualizar la información del proveedor:', error);
      throw error;
    }
  }

  static async delete ({ id }) {
    try {
      const deleteQuery = 'DELETE FROM providors WHERE prov_id = ?';
      const deleteResult = await connection.query(deleteQuery, [id]);

      // Verificamos si se eliminó correctamente el proveedor
      if (deleteResult.affectedRows === 0) {
        throw new Error('El proveedor no existe o no se pudo eliminar');
      }
      // La eliminación fue exitosa
      console.log('Proveedor eliminado exitosamente');
      return { message: 'Proveedor eliminado exitosamente' };
    } catch (error) {
    // Capturamos y manejamos cualquier error que ocurra durante la eliminación del proveedor
      console.error('Error al eliminar el proveedor:', error);
      throw error; // Relanzamos el error para que el controlador pueda manejarlo adecuadamente
    }
  }
}
