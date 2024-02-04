const express = require('express');
const products = require('./db/productos.json');
const { validateProduct, validatePartialProduct } = require('./schemas/validateProduct');
const { createEDQid } = require('./schemas/createEDQid');

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.get('/products/:category', (req, res) => {
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

app.get('/products', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(products);
});

app.get('/products/:category/:id', (req, res) => {
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

app.post('/products/:category', (req, res) => {
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

app.patch('/products/:category/:id', (req, res) => {
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

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`serving in http://localhost:${PORT}`);
});
