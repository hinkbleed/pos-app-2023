import { validatePartialProduct, validateProduct } from '../schemas/validateProduct.js';

export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel;
  }

  getAll = async (req, res) => {
    const { genre } = req.query;
    const products = await this.productModel.getAll({ genre });
    res.json(products);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const products = await this.productModel.getById({ id });

      res.json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    const result = validateProduct(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await this.productModel.create({ input: result.data });
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.productModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ message: 'Product deleted' });
  };

  update = async (req, res) => {
    const result = validatePartialProduct(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;

    const updatedProduct = await this.productModel.update({ id, input: result.data });

    return res.json(updatedProduct);
  };
}
