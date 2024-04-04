import { structureEmployees } from '../../../schemas/dataconfig/employees/htmlEmployees.js';
import { validateEmployee } from '../../../schemas/dataconfig/employees/validateEmployee.js';

export class ConfigemployeesController {
  constructor ({ employeeModel }) {
    this.employeeModel = employeeModel;
  }

  getAll = async (req, res) => {
    const employees = await this.employeeModel.getAll();
    const htmlEmployees = structureEmployees(employees);
    console.log(employees, htmlEmployees);
    if (htmlEmployees === '') {
      res.send('<div class="no-employees">Sin Empleados aún</div>');
    } else {
      res.send(htmlEmployees);
    }
  };

  create = async (req, res) => {
    const result = validateEmployee(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newEmployee = await this.employeeModel.create({ input: result.data });
    res.status(201).json({ message: 'Empleado creado exitosamente', providor: newEmployee });
  };

  getById = async (req, res) => {
    const employeeId = req.params.id;
    try {
      const employee = await this.employeeModel.getById(employeeId);
      console.log(employee);
      if (!employee) {
        res.send('<div class="no-employee">Este empleado no existe o no existe información asociada a este id</div>');
      } else {
        res.send(employee[0]);
      }
    } catch (error) {
      console.error('Error al obtener el empleado:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const newData = req.body;

      const change = await this.employeeModel.update({ id, newData });
      console.log(change);

      res.status(200).json({ message: 'Valor actualizado correctamente en la base de datos.' });
    } catch (error) {
      console.error('Error al actualizar el valor en la base de datos:', error);
      res.status(500).json({ error: 'Error al actualizar el valor en la base de datos.' });
    }
  };

  /*

  delete = async (req, res) => {
    try {
      const id = req.params.id;

      const deletion = await this.providorModel.delete({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Proveedor eliminado correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar Proveedor de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar Proveedor de la base de datos.' });
    }
  };
  */
}
