import { structureGenres, structureGenresToProducts } from '../../../schemas/dataconfig/genres/htmlGenres.js';
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

  delete = async (req, res) => {
    try {
      const id = req.params.id;

      const deletion = await this.genreModel.delete({ id });
      console.log(deletion);
      res.status(200).json({ message: 'Género eliminado correctamente de la base de datos.' });
    } catch (error) {
      console.error('Error al eliminar Género de la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar Género de la base de datos.' });
    }
  };

  getAllToProducts = async (req, res) => {
    const genres = await this.genreModel.getAll();
    const htmlGenres = structureGenresToProducts(genres);
    if (htmlGenres === '') {
      res.send('<option>Sin Géneros aún</option>');
    } else {
      res.send(htmlGenres);
    }
  };
}
