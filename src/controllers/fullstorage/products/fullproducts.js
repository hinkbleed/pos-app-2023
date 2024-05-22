import { structureAllBooks, structureAllMags, structureAllSepars } from '../../../schemas/fullstorage/products/htmlFullProducts.js';

export class FullproductsController {
  constructor ({ fullproductsModel }) {
    this.fullproductsModel = fullproductsModel;
  }

  getAllBooks = async (req, res) => {
    const allBooks = await this.fullproductsModel.getAllBooks();
    const htmlAllBooks = structureAllBooks(allBooks);
    console.log(htmlAllBooks);
    if (htmlAllBooks === '') {
      res.send('<div class="no-fullstorage">Error al solicitar datos</div>');
    } else {
      res.send(htmlAllBooks);
    }
  };

  getAllSepars = async (req, res) => {
    const allSepars = await this.fullproductsModel.getAllSepars();
    const htmlAllSepars = structureAllSepars(allSepars);
    console.log(htmlAllSepars);
    if (htmlAllSepars === '') {
      res.send('<div class="no-fullstorage">Error al solicitar datos</div>');
    } else {
      res.send(htmlAllSepars);
    }
  };

  getAllMags = async (req, res) => {
    const allMags = await this.fullproductsModel.getAllMags();
    const htmlAllMags = structureAllMags(allMags);
    console.log(htmlAllMags);
    if (htmlAllMags === '') {
      res.send('<div class="no-fullstorage">Error al solicitar datos</div>');
    } else {
      res.send(htmlAllMags);
    }
  };

  /*
  create = async (req, res) => {
    const result = validateEmployee(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newEmployee = await this.employeeModel.create({ input: result.data });
    res.status(201).json({ message: 'Empleado creado exitosamente', providor: newEmployee });
  };
  */

  /*
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

  */
  /*
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
  */

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
