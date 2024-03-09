import { structureGenres } from '../../../schemas/dataconfig/genres/htmlGenres.js';
import { validateGenre } from '../../../schemas/dataconfig/genres/validateGenre.js';

export class ConfiggenreController {
  constructor ({ genreModel }) {
    this.genreModel = genreModel;
  }

  getAll = async (req, res) => {
    const genres = await this.genreModel.getAll();
    const htmlGenres = structureGenres(genres);
    if (htmlGenres === '') {
      res.send('<div class="no-genre">Sin Géneros aún</div>');
    } else {
      res.send(htmlGenres);
    }
  };

  create = async (req, res) => {
    const result = validateGenre(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newGenre = await this.genreModel.create({ input: result.data });
    res.status(201).json({ message: 'Género creado exitosamente', providor: newGenre });
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
