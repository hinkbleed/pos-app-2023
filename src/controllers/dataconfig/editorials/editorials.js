import { structureEditorials, structureEditorialsToProducts } from '../../../schemas/dataconfig/editorials/htmlEditorials.js';
import { validateEditorial } from '../../../schemas/dataconfig/editorials/validateEditorial.js';

export class ConfigeditorialController {
  constructor ({ editorialModel }) {
    this.editorialModel = editorialModel;
  }

  getAll = async (req, res) => {
    const editorials = await this.editorialModel.getAll();
    const htmlEditorials = structureEditorials(editorials);
    if (htmlEditorials === '') {
      res.send('<div class="no-edit">Sin Editoriales aún</div>');
    } else {
      res.send(htmlEditorials);
    }
  };

  create = async (req, res) => {
    const result = validateEditorial(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newEditorial = await this.editorialModel.create({ input: result.data });
    res.status(201).json({ message: 'Proveedor creado exitosamente', providor: newEditorial });
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;

      const deletion = await this.editorialModel.delete({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Editorial eliminada correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar Editorial de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar Editorial de la base de datos.' });
    }
  };

  getAllToProducts = async (req, res) => {
    const editorials = await this.editorialModel.getAll();
    const htmlEditorials = structureEditorialsToProducts(editorials);
    if (htmlEditorials === '') {
      res.send('<option class="no-edit">Sin Editoriales aún</option>');
    } else {
      res.send(htmlEditorials);
    }
  };
}
