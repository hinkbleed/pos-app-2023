import { Router } from 'express';

export const appStarter = () => {
  const appRouter = Router();

  appRouter.get('/login', (req, res) => res.render('login', { title: 'EDQ | Home' }));

  appRouter.get('/shop', (req, res) => res.render('app', { title: 'EDQ | Shop' }));
  appRouter.get('/partials/:name', (req, res) => {
    const name = req.params.name;
    res.render(`partials/${name}/${name}`);
  });
  /*  appRouter.get('/report', (req, res) => res.render('report', { title: 'EDQ | Reporte de Negocio' }));
  appRouter.get('/data', (req, res) => res.render('data', { title: 'EDQ | Datos' })); */
  return appRouter;
};
