import { structureParties } from '../../../schemas/data/parties/htmlParties.js';

export class PartyController {
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
}
