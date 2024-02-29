export class PasswordController {
  constructor ({ passwordModel }) {
    this.passwordModel = passwordModel;
  }

  verify = async (req, res) => {
    const { password } = req.body;
    console.log(password);
    try {
      const storedPasswords = await this.passwordModel.getAll();
      console.log(storedPasswords);
      const isPasswordCorrect = storedPasswords.password.value.includes(password);
      console.log(isPasswordCorrect);

      if (isPasswordCorrect) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
