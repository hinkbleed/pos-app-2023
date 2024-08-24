import { validateBookToPartyInfo } from '../../schemas/partyconfig/bookValidations.js';
import { structurePartyData } from '../../schemas/shop/dataParties.js';
import { structureAllPartyBooks, structureAllPartyMagazines, structureAllPartySeparators } from '../../schemas/shop/htmlShop.js';

export class ShopController {
  constructor ({ partyModel, shopModel }) {
    this.partyModel = partyModel;
    this.shopModel = shopModel;
  }

  getPartyById = async (req, res) => {
    const party = await this.partyModel.getPartyById(req.params.id);
    const structuredParty = structurePartyData(party);
    console.log(structuredParty);
    res.send(structuredParty);
  };

  getPartyBooks = async (req, res) => {
    const partyId = req.params.partyid;
    const partyBooks = await this.shopModel.getAllBooks(partyId);
    const htmlPartyBooks = structureAllPartyBooks(partyBooks);
    if (htmlPartyBooks === '') {
      res.send('<div class="no-partybooks">Error al solicitar datos de los libros relacionados a este evento</div>');
    } else {
      res.send(htmlPartyBooks);
    }
  };

  getPartySeparators = async (req, res) => {
    const partyId = req.params.partyid;
    const partySepars = await this.shopModel.getAllSeparators(partyId);
    const htmlPartySepars = structureAllPartySeparators(partySepars);
    if (htmlPartySepars === '') {
      res.send('<div class="no-partysepars">Error al solicitar datos de los separadores relacionados a este evento</div>');
    } else {
      res.send(htmlPartySepars);
    }
  };

  getPartyMagazines = async (req, res) => {
    const partyId = req.params.partyid;
    const partyMags = await this.shopModel.getAllMagazines(partyId);
    const htmlPartyMags = structureAllPartyMagazines(partyMags);
    if (htmlPartyMags === '') {
      res.send('<div class="no-partysepars">Error al solicitar datos de las revistas relacionadas a este evento</div>');
    } else {
      res.send(htmlPartyMags);
    }
  };

  saveBookToParty = async (req, res) => {
    const result = validateBookToPartyInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idBooks = await this.shopModel.getBooksById(result.data);
    console.log(idBooks.books.length);
    console.log(idBooks.books);

    if (idBooks.books.length === 0) {
      try {
        const newPartyBook = await this.shopModel.createBook({ input: result.data });
        res.status(201).json({ message: 'Libro creado exitosamente', book: newPartyBook });
      } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
      }
    } else {
      const newPrice = result.data.party_price;
      console.log(result.data.amount + 'cantidad de nuevas piezas');
      console.log(idBooks.books[0].current_amount + 'anterior cantidad');
      const resultAmount = result.data.amount + idBooks.books[0].current_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const upFullstorageBook = await this.shopModel.updateBookById({ input: idBooks.books, resultAmount, newPrice });
        res.status(201).json({ message: 'Libro actualizado exitosamente', book: upFullstorageBook });
      } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
      }
    }
  };
}
