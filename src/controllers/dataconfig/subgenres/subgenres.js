import { structureSubgenres } from '../../../schemas/dataconfig/subgenres/htmlSubgenres.js';
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

  /*
  create = async (req, res) => {
    const result = validateProvidor(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newProvidor = await this.providorModel.create({ input: result.data });
    res.status(201).json({ message: 'Proveedor creado exitosamente', providor: newProvidor });
  };

  updateID = async (req, res) => {
    try {
      const newValue = req.body.provIDcounter;
      console.log(newValue);
      const change = await this.providorModel.update({ newValue });
      console.log(change);
      res.status(200).json({ message: 'Valor actualizado correctamente en la base de datos.' });
    } catch (error) {
      console.error('Error al actualizar el valor en la base de datos:', error);
      res.status(500).json({ error: 'Error al actualizar el valor en la base de datos.' });
    }
  };
  */
}
