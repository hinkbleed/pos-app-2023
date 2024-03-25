import { structureSubgenres, structureSubgenresToProducts } from '../../../schemas/dataconfig/subgenres/htmlSubgenres.js';
import { validateSubgenre } from '../../../schemas/dataconfig/subgenres/validateSubgenre.js';

export class ConfigsubgenreController {
  constructor ({ subgenreModel }) {
    this.subgenreModel = subgenreModel;
  }

  getAll = async (req, res) => {
    const subgenres = await this.subgenreModel.getAll();
    const htmlSubgenres = structureSubgenres(subgenres);
    if (htmlSubgenres === '') {
      res.send('<div class="no-genre">Sin Subgéneros aún</div>');
    } else {
      res.send(htmlSubgenres);
    }
  };

  create = async (req, res) => {
    const result = validateSubgenre(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newSubgenre = await this.subgenreModel.create({ input: result.data });
    res.status(201).json({ message: 'Proveedor creado exitosamente', providor: newSubgenre });
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;

      const deletion = await this.subgenreModel.delete({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Subgénero eliminado correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar Subgénero de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar Subgénero de la base de datos.' });
    }
  };

  getAllToProducts = async (req, res) => {
    const subgenres = await this.subgenreModel.getAll();
    const htmlSubgenres = structureSubgenresToProducts(subgenres);
    if (htmlSubgenres === '') {
      res.send('<div class="no-genre">Sin Subgéneros aún</div>');
    } else {
      res.send(htmlSubgenres);
    }
  };
}
