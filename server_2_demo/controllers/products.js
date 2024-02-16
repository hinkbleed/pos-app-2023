import { ProductModel } from '../models/local/product.js';
import { validatePartialProduct, validateProduct } from '../schemas/validateProduct.js';

export class ProductController {
  static async getAll (req, res) {
    const { genre } = req.query;
    const products = await ProductModel.getAll({ genre });
    res.json(products);
  }

  static async getById (req, res) {
    const { id } = req.params;
    try {
      const products = await ProductModel.getById({ id });

      res.json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async create (req, res) {
    const result = validateProduct(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create({ input: result.data });
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  }

  static async delete (req, res) {
    const { id } = req.params;

    const result = await ProductModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ message: 'Product deleted' });
  }

  static async update (req, res) {
    const result = validatePartialProduct(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;

    const updatedProduct = await ProductModel.update({ id, input: result.data });

    return res.json(updatedProduct);
  }
}
