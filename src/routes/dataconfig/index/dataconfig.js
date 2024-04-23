import { Router } from 'express';
import { createConfigprovidorRouter } from '../providors/providors.js';
import { createConfigeditorialRouter } from '../editorials/editorials.js';
import { createConfigsubgenreRouter } from '../subgenres/subgenres.js';
import { createConfigemployeeRouter } from '../employees/employees.js';
import { createConfiggenreRouter } from '../genres/genres.js';
import { createConfigpartyRouter } from '../parties/parties.js';
import { createConfigproductRouter } from '../products/products.js';

export const createDataconfigRouter = ({ providorModel, editorialModel, genreModel, subgenreModel, employeeModel, partyModel, productModel }) => {
  const dataconfigRouter = Router();

  //  PRODUCTS
  dataconfigRouter.get('/products', (req, res) => res.render('dataconfigproducts', { title: 'EDQ | Products' }));

  //  PROVIDORS
  dataconfigRouter.get('/providors', (req, res) => res.render('dataconfigprovidors', { title: 'EDQ | Providors' }));

  //  EDITORIALS
  dataconfigRouter.get('/editorials', (req, res) => res.render('dataconfigeditorials', { title: 'EDQ | Editorials' }));

  //  PARTIES
  dataconfigRouter.get('/parties', (req, res) => res.render('dataconfigparties', { title: 'EDQ | Parties' }));

  //  DISCOUNTS
  dataconfigRouter.get('/discounts', (req, res) => res.render('dataconfigdiscounts', { title: 'EDQ | Discounts' }));

  //  GENRES
  dataconfigRouter.get('/genres', (req, res) => res.render('dataconfiggenres', { title: 'EDQ | Genres' }));

  //  EMPLOYEES
  dataconfigRouter.get('/employees', (req, res) => res.render('dataconfigemployees', { title: 'EDQ | Employees' }));

  //  CUSTOMERS
  dataconfigRouter.get('/customers', (req, res) => res.render('dataconfigcustomers', { title: 'EDQ | Data Configuration' }));

  //  TICKETS
  dataconfigRouter.get('/tickets', (req, res) => res.render('dataconfigtickets', { title: 'EDQ | Tickets' }));

  //  PASSWORDS
  dataconfigRouter.get('/passwords', (req, res) => res.render('dataconfigpasswords', { title: 'EDQ | Passwords' }));

  dataconfigRouter.use('/providors', createConfigprovidorRouter({ providorModel }));

  dataconfigRouter.use('/editorials', createConfigeditorialRouter({ editorialModel }));

  dataconfigRouter.use('/genres', createConfiggenreRouter({ genreModel }));

  dataconfigRouter.use('/subgenres', createConfigsubgenreRouter({ subgenreModel }));

  dataconfigRouter.use('/employees', createConfigemployeeRouter({ employeeModel }));

  dataconfigRouter.use('/parties', createConfigpartyRouter({ partyModel }));

  dataconfigRouter.use('/products', createConfigproductRouter({ productModel }));

  return dataconfigRouter;
};
