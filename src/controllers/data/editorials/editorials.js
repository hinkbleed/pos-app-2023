import { structureEditorials } from '../../../schemas/editorials/htmlEditorials.js';
import { validateEditorial } from '../../../schemas/editorials/validateEditorial.js';

export class EditorialController {
  constructor ({ editorialModel }) {
    this.editorialModel = editorialModel;
  }

  getAll = async (req, res) => {
    const editorials = await this.editorialModel.getAll();
    const htmlEditorials = structureEditorials(editorials);
    if (htmlEditorials === '') {
      res.send('<div class="no-prov">Sin Editoriales aún</div>');
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
