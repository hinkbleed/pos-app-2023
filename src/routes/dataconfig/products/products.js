
import { Router } from 'express';
import { ConfigproductController } from '../../../controllers/dataconfig/products/products.js';

export const createConfigproductRouter = ({ productModel }) => {
  const productsRouter = Router();

  const productController = new ConfigproductController({ productModel });

  productsRouter.get('/all', productController.getAll);
  productsRouter.post('/addbook', productController.createBook);

  productsRouter.post('/addsepar', productController.createSepar);
  productsRouter.post('/addmag', productController.createMag);

  return productsRouter;
};
