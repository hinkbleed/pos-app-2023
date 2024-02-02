const express = require('express');
const products = require('./db/productos.json');

const app = express();

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

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`serving in http://localhost:${PORT}`);
});
