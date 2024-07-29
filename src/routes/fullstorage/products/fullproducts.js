
import { Router } from 'express';
import { FullproductsController } from '../../../controllers/fullstorage/products/fullproducts.js';

export const createFullproductsRouter = ({ fullproductsModel }) => {
  const fullproductsRouter = Router();

  const fullproductsController = new FullproductsController({ fullproductsModel });

  fullproductsRouter.get('/books/all', fullproductsController.getAllBooks);
  fullproductsRouter.get('/separs/all', fullproductsController.getAllSepars);
  fullproductsRouter.get('/mags/all', fullproductsController.getAllMags);

  fullproductsRouter.post('/addbook', fullproductsController.addBook);
  fullproductsRouter.post('/addsepar', fullproductsController.addSepar);
  fullproductsRouter.post('/addmag', fullproductsController.addMag);

  fullproductsRouter.get('/search/:input', fullproductsController.getProductsByQuerySearch);

  /*
  productsRouter.patch('/editbook/:id', productController.updateBook);
  productsRouter.delete('/deletebook/:id', productController.deleteBook);

  productsRouter.patch('/editsepar/:id', productController.updateSepar);
  productsRouter.delete('/deletesepar/:id', productController.deleteSepar);

  productsRouter.patch('/editmag/:id', productController.updateMag);
  productsRouter.delete('/deletemag/:id', productController.deleteMag);

  */

  return fullproductsRouter;
};
