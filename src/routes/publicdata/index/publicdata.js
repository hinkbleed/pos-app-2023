import { Router } from 'express';

export const createPublicdataRouter = () => {
  const publicdataRouter = Router();

  //  PRODUCTS
  publicdataRouter.get('/parties', (req, res) => res.render('publicdataparties', { title: 'EDQ | Eventos' }));

  return publicdataRouter;
};
