import { structureAllProducts } from '../../../schemas/dataconfig/products/htmlProducts.js';
import { validateBook, validatePartialBook } from '../../../schemas/dataconfig/products/validateBook.js';
import { validateMag, validatePartialMag } from '../../../schemas/dataconfig/products/validateMag.js';
import { validatePartialSepar, validateSepar } from '../../../schemas/dataconfig/products/validateSepar.js';

export class ConfigproductController {
  constructor ({ productModel }) {
    this.productModel = productModel;
  }

  getAll = async (req, res) => {
    const products = await this.productModel.getAll();
    console.log(products);
    const htmlProducts = structureAllProducts(products);
    if (htmlProducts === '') {
      res.send('<div class="no-prod">Sin Productos aún</div>');
    } else {
      res.send(htmlProducts);
    }
  };

  createBook = async (req, res) => {
    const result = validateBook(req.body);
    if (!result.success) {
      console.error(result.error.errors);
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newBook = await this.productModel.createBook({ input: result.data });
    res.status(201).json({ message: 'Libro creado exitosamente', book: newBook });
    return newBook;
  };

  updateBook = async (req, res) => {
    const result = validatePartialBook(req.body);
    const id = req.params.id;
    if (!result.success) {
      console.error(result.error.errors);
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newBookInfo = await this.productModel.updateBook({ id, input: result.data });
    res.status(201).json({ message: 'Libro editado exitosamente', book: newBookInfo });
  };

  deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      const deletion = await this.productModel.deleteBook({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Libro eliminado correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar Libro de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar Libro de la base de datos.' });
    }
  };

  createSepar = async (req, res) => {
    const result = validateSepar(req.body);
    if (!result.success) {
      console.error(result.error.errors);
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newSepar = await this.productModel.createSepar({ input: result.data });
    res.status(201).json({ message: 'Separador creado exitosamente', separ: newSepar });
  };

  updateSepar = async (req, res) => {
    const result = validatePartialSepar(req.body);
    const id = req.params.id;
    if (!result.success) {
      console.error(result.error.errors);
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newSeparInfo = await this.productModel.updateSepar({ id, input: result.data });
    res.status(201).json({ message: 'Separador editado exitosamente', separ: newSeparInfo });
  };

  deleteSepar = async (req, res) => {
    try {
      const id = req.params.id;
      const deletion = await this.productModel.deleteSepar({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Separador eliminado correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar Separador de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar Separador de la base de datos.' });
    }
  };

  createMag = async (req, res) => {
    const result = validateMag(req.body);
    if (!result.success) {
      console.error(result.error.errors); // Imprimir errores en la consola
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMag = await this.productModel.createMag({ input: result.data });
    res.status(201).json({ message: 'Revista creada exitosamente', mag: newMag });
  };

  updateMag = async (req, res) => {
    console.log(req.body, req.params.id);
    const result = validatePartialMag(req.body);
    const id = req.params.id;
    if (!result.success) {
      console.error(result.error.errors);
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newSeparInfo = await this.productModel.updateMag({ id, input: result.data });
    res.status(201).json({ message: 'Revista editada exitosamente', separ: newSeparInfo });
  };

  deleteMag = async (req, res) => {
    try {
      const id = req.params.id;
      const deletion = await this.productModel.deleteMag({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Revista eliminada correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar revista de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar revista de la base de datos.' });
    }
  };
}
