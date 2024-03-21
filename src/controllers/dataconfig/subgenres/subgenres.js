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
