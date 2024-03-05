import { PasswordModel } from '../../models/login/login.js';

export class PasswordController {
  constructor ({ passwordModel }) {
    this.passwordModel = passwordModel;
  }

  verify = async (req, res) => {
    const { password } = req.body;
    try {
      const result = await PasswordModel.verifyPassword(password, req, res);
      console.log(result);
      if (result) {
        req.session.authenticated = true;
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      res.status(500).send('Error interno del servidor');
    }
  };
}
