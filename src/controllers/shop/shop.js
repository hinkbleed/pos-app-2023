import { structurePartyData } from '../../schemas/shop/dataParties.js';

export class ShopController {
  constructor ({ partyModel, productModel, fullproductsModel, providorModel, editorialModel, genreModel, subgenreModel, employeeModel }) {
    this.partyModel = partyModel;
  }

  getPartyById = async (req, res) => {
    const party = await this.partyModel.getPartyById(req.params.id);
    const structuredParty = structurePartyData(party);
    console.log(structuredParty);
    res.send(structuredParty);
  };
}
