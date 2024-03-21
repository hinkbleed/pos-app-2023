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
