import { Router } from 'express';

export const checkAuthentication = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

export const checkHardAuthentication = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.redirect('/home');
  }
};

export const appStarter = () => {
  const appRouter = Router();

  appRouter.get('/login', (req, res) => res.render('login', { title: 'EDQ | Login' }));

  appRouter.get('/', checkAuthentication, (req, res) => res.redirect('/home'));
  appRouter.get('/home', checkAuthentication, (req, res) => res.render('home', { title: 'EDQ | Home' }));

  appRouter.get('/dataconfig', (req, res) => res.render('dataconfig', { title: 'EDQ | Data Configuration' }));

  appRouter.get('/shop', checkAuthentication, (req, res) => res.render('app', { title: 'EDQ | Shop' }));
  appRouter.get('/partials/:name', (req, res) => {
    const name = req.params.name;
    res.render(`partials/${name}/${name}`);
  });
  return appRouter;
};
