import { structureProvidors } from '../../../schemas/providors/htmlProvidors.js';
import { validateProvidor } from '../../../schemas/providors/validateProvidor.js';

export class ProvidorController {
  constructor ({ providorModel }) {
    this.providorModel = providorModel;
  }

  getAll = async (req, res) => {
    const providors = await this.providorModel.getAll();
    const htmlProvidors = structureProvidors(providors);
    if (htmlProvidors === '') {
      res.send('<div class="no-prov">Sin Proveedores aún</div>');
    } else {
      res.send(htmlProvidors);
    }
  };

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
}
