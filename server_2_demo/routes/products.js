import { Router } from 'express';
import { validateProduct, validatePartialProduct } from './schemas/validateProduct.js';
import { readJSON } from './utils/utils.js';
import { createEDQid } from './schemas/createEDQid.js';

const products = readJSON('../db/productos.json');

const router = Router();

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/products/:category', (req, res) => {
  const { category } = req.params;

  if (!(category in products)) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }

  const productsCategory = products[category];
  const { genre } = req.query;
  if (genre) {
    const filteredProducts = productsCategory.filter(
      product => product.genres.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredProducts);
  }
  res.json(products);
});

router.get('/products/:category/:id', (req, res) => {
  const { category, id } = req.params;

  if (!(category in products)) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }
  const productsCategory = products[category];
  const product = productsCategory.find(product => product.id === id);
  if (product) {
    return res.json(product);
  }

  res.status(404).json({ message: 'product not found' });
});

router.post('/products/:category', (req, res) => {
  const { category } = req.params;

  if (!(category in products)) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }
  const productsCategory = products[category];

  const result = validateProduct(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newProduct = {
    id: createEDQid(),
    ...result.data
  };

  productsCategory.push(newProduct);

  res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
});

router.patch('/products/:category/:id', (req, res) => {
  const { category, id } = req.params;

  if (!(category in products)) {
    return res.status(404).json({ message: 'Categoría no encontrada' });
  }
  const productsCategory = products[category];

  const result = validatePartialProduct(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const productIndex = productsCategory.findIndex(product => product.id === id);

  if (productIndex === -1) {
    res.status(404).json({ message: 'product not found' });
  }
  const updateProduct = {
    ...productsCategory[productIndex],
    ...result.data
  };

  productsCategory[productIndex] = updateProduct;

  return res.json(updateProduct);
});

router.delete('/products/:category/:id', (req, res) => {
  const { category, id } = req.params;

  if (!(category in products)) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const productsCategory = products[category];
  const productIndex = productsCategory.findIndex(product => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  productsCategory.splice(productIndex, 1);

  return res.status(204).send();
});
