import { Router } from 'express';

export const checkAuthentication = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

export const appStarter = () => {
  const appRouter = Router();

  appRouter.get('/login', (req, res) => res.render('login', { title: 'EDQ | Login' }));

  appRouter.get('/', checkAuthentication, (req, res) => res.redirect('/home'));
  appRouter.get('/home', checkAuthentication, (req, res) => res.render('home', { title: 'EDQ | Home' }));

  appRouter.get('/fullstorage', (req, res) => res.render('fullstorage', { title: 'EDQ | Full Storage' }));

  appRouter.get('/partyconfig', (req, res) => res.render('partyconfig', { title: 'EDQ | Parties Configuration' }));

  appRouter.get('/dataconfig', (req, res) => res.render('dataconfig', { title: 'EDQ | Data Configuration' }));

  appRouter.get('/shop', (req, res) => res.render('shop', { title: 'EDQ | Shop' }));
  return appRouter;
};
