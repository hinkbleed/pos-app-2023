import { structureAllProducts } from '../../../schemas/dataconfig/products/htmlProducts.js';
import { validateBook } from '../../../schemas/dataconfig/products/validateBook.js';
import { validateMag } from '../../../schemas/dataconfig/products/validateMag.js';
import { validateSepar } from '../../../schemas/dataconfig/products/validateSepar.js';

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
      console.error(result.error.errors); // Imprimir errores en la consola
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newBook = await this.productModel.createBook({ input: result.data });
    res.status(201).json({ message: 'Libro creado exitosamente', book: newBook });
  };

  createSepar = async (req, res) => {
    const result = validateSepar(req.body);
    if (!result.success) {
      console.error(result.error.errors); // Imprimir errores en la consola
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newSepar = await this.productModel.createSepar({ input: result.data });
    res.status(201).json({ message: 'Separador creado exitosamente', separ: newSepar });
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
}
