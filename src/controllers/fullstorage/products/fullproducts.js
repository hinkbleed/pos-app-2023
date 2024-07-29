import { validateNewBookInfo } from '../../../schemas/fullstorage/products/bookValidations.js';
import { structureAllBooks, structureAllMags, structureAllSepars, structureQueryBooks } from '../../../schemas/fullstorage/products/htmlFullProducts.js';
import { validateNewMagInfo } from '../../../schemas/fullstorage/products/magValidation.js';
import { validateNewSeparInfo } from '../../../schemas/fullstorage/products/separValidations.js';

export class FullproductsController {
  constructor ({ fullproductsModel }) {
    this.fullproductsModel = fullproductsModel;
  }

  getAllBooks = async (req, res) => {
    const allBooks = await this.fullproductsModel.getAllBooks();
    const htmlAllBooks = structureAllBooks(allBooks);
    if (htmlAllBooks === '') {
      res.send('<div class="no-fullstorage">Error al solicitar datos</div>');
    } else {
      res.send(htmlAllBooks);
    }
  };

  getAllSepars = async (req, res) => {
    const allSepars = await this.fullproductsModel.getAllSepars();
    const htmlAllSepars = structureAllSepars(allSepars);
    if (htmlAllSepars === '') {
      res.send('<div class="no-fullstorage">Error al solicitar datos</div>');
    } else {
      res.send(htmlAllSepars);
    }
  };

  getAllMags = async (req, res) => {
    const allMags = await this.fullproductsModel.getAllMags();
    const htmlAllMags = structureAllMags(allMags);
    if (htmlAllMags === '') {
      res.send('<div class="no-fullstorage">Error al solicitar datos</div>');
    } else {
      res.send(htmlAllMags);
    }
  };

  addBook = async (req, res) => {
    const result = validateNewBookInfo(req.body);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idBooks = await this.fullproductsModel.getBooksByIdAndKind(result.data);
    console.log(idBooks.books.length);
    console.log(idBooks.books);

    if (idBooks.books.length === 0) {
      try {
        const newFullstorageBook = await this.fullproductsModel.createBook({ input: result.data });
        res.status(201).json({ message: 'Libro creado exitosamente', book: newFullstorageBook });
      } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
      }
    } else {
      const newPrice = result.data.bookfs_price;
      console.log(result.data.bookfs_amount + 'nueva cantidad');
      console.log(idBooks.books[0].bookfs_amount + 'anterior cantridad');
      const resultAmount = result.data.bookfs_amount + idBooks.books[0].bookfs_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const upFullstorageBook = await this.fullproductsModel.updateBookById({ input: idBooks.books, resultAmount, newPrice });
        res.status(201).json({ message: 'Libro actualizado exitosamente', book: upFullstorageBook });
      } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
      }
    }
  };

  addSepar = async (req, res) => {
    const result = validateNewSeparInfo(req.body);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idSepar = await this.fullproductsModel.getSeparById(result.data);
    console.log(idSepar);
    if (idSepar.separators.length === 0) {
      try {
        const newStorageSepar = await this.fullproductsModel.createSepar({ input: result.data });
        res.status(201).json({ message: 'Separador creado exitosamente', separ: newStorageSepar });
      } catch (error) {
        console.error('Error al crear el separador:', error);
        res.status(500).json({ error: 'Error al crear el separador' });
      }
    } else {
      const newPrice = result.data.separfs_price;
      console.log(result.data.separfs_amount + 'nueva cantidad');
      console.log(idSepar.separators[0].separfs_amount + 'anterior cantidad');
      const resultAmount = result.data.separfs_amount + idSepar.separators[0].separfs_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const upFullstorageSepar = await this.fullproductsModel.updateSeparById({ input: idSepar.separators, resultAmount, newPrice });
        res.status(201).json({ message: 'Separador actualizado exitosamente', separ: upFullstorageSepar });
      } catch (error) {
        console.error('Error al crear el separador:', error);
        res.status(500).json({ error: 'Error al crear el separador' });
      }
    }
  };

  addMag = async (req, res) => {
    const result = validateNewMagInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idMags = await this.fullproductsModel.getMagazinesById(result.data);
    console.log(idMags.magazines.length);
    console.log(idMags.magazines);

    if (idMags.magazines.length === 0) {
      try {
        const newFullstorageMag = await this.fullproductsModel.createMag({ input: result.data });
        res.status(201).json({ message: 'Revista creada exitosamente', mag: newFullstorageMag });
      } catch (error) {
        console.error('Error al crear la revista:', error);
        res.status(500).json({ error: 'Error al crear la revista' });
      }
    } else {
      const newPrice = result.data.magfs_price;
      console.log(result.data.magfs_amount + 'nueva cantidad');
      console.log(idMags.magazines[0].magfs_amount + 'anterior cantidad');
      const resultAmount = result.data.magfs_amount + idMags.magazines[0].magfs_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const upFullstorageMag = await this.fullproductsModel.updateMagazineById({ input: idMags.magazines, resultAmount, newPrice });
        res.status(201).json({ message: 'Revista actualizada exitosamente', mag: upFullstorageMag });
      } catch (error) {
        console.error('Error al crear la revista:', error);
        res.status(500).json({ error: 'Error al crear la revista' });
      }
    }
  };

  getProductsByQuerySearch = async (req, res) => {
    console.log(req.params.input);
    const queryBooks = await this.fullproductsModel.getProductsByQuerySearch(req.params.input);
    const htmlQueryBooks = structureQueryBooks(queryBooks);
    if (htmlQueryBooks === '') {
      res.send('<div class="noresult">No hay resultados para tu búsqueda</div>');
    } else {
      res.send(htmlQueryBooks);
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
