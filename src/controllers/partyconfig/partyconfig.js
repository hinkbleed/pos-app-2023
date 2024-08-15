
import { structureParties } from '../../schemas/partyconfig/htmlParties.js';
import { validateParty } from '../../schemas/partyconfig/validateParty.js';

export class PartyconfigController {
  constructor ({ partyModel }) {
    this.partyModel = partyModel;
  }

  getAll = async (req, res) => {
    const parties = await this.partyModel.getAll();
    const htmlParties = structureParties(parties);
    if (htmlParties === '') {
      res.send('<div class="no-event">Sin Eventos aún</div>');
    } else {
      res.send(htmlParties);
    }
  };

  createParty = async (req, res) => {
    const result = validateParty(req.body);
    console.log(result);
    if (!result.success) {
      console.error(result.error.errors);
    }

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    console.log(result);

    const newParty = await this.partyModel.createParty({ input: result.data });
    res.status(201).json({ message: 'Evento creado exitosamente', party: newParty });
    return newParty;
  };
}
