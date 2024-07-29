
import { Router } from 'express';
import { ConfigproductController } from '../../../controllers/dataconfig/products/products.js';

export const createConfigproductRouter = ({ productModel }) => {
  const productsRouter = Router();

  const productController = new ConfigproductController({ productModel });

  productsRouter.get('/all', productController.getAll);

  productsRouter.post('/addbook', productController.createBook);
  productsRouter.patch('/editbook/:id', productController.updateBook);
  productsRouter.delete('/deletebook/:id', productController.deleteBook);
  //  productsRouter.get('/bookbyid/:id', productController.getBook);

  productsRouter.post('/addsepar', productController.createSepar);
  productsRouter.patch('/editsepar/:id', productController.updateSepar);
  productsRouter.delete('/deletesepar/:id', productController.deleteSepar);

  productsRouter.post('/addmag', productController.createMag);
  productsRouter.patch('/editmag/:id', productController.updateMag);
  productsRouter.delete('/deletemag/:id', productController.deleteMag);

  return productsRouter;
};
