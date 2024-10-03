import { validateBookToPartyInfo, validateBookToPartyPartialInfo } from '../../schemas/partyconfig/bookValidations.js';
import { validateDiscountInfo } from '../../schemas/partyconfig/discountValidations.js';
import { validateMagazineToPartyInfo, validateMagazineToPartyPartialInfo } from '../../schemas/partyconfig/magValidations.js';
import { validateSeparToPartyInfo, validateSeparToPartyPartialInfo } from '../../schemas/partyconfig/separValidations.js';
import { structurePartyData } from '../../schemas/shop/dataParties.js';
import { structureDiscountsData, structurePosDiscounts } from '../../schemas/shop/htmlDiscounts.js';
import { structurePosQuery } from '../../schemas/shop/htmlPos.js';
import { structureAddPartyQueryFullproducts, structureAllPartyBooks, structureAllPartyMagazines, structureAllPartySeparators, structureStoragePartyQueryProducts } from '../../schemas/shop/htmlData.js';
import { validateNewTicketInfo } from '../../schemas/shop/ticketValidation.js';
import { structureReportBalance, structureReportPayments, structureReportTickets } from '../../schemas/shop/htmlTickets.js';
import { validateNewPaymentInfo } from '../../schemas/shop/paymentValidation.js';

export class ShopController {
  constructor ({ partyModel, shopModel, fullproductsModel, discountModel, ticketsModel }) {
    this.partyModel = partyModel;
    this.shopModel = shopModel;
    this.fullproductsModel = fullproductsModel;
    this.discountModel = discountModel;
    this.ticketsModel = ticketsModel;
  }

  getPartyById = async (req, res) => {
    const party = await this.partyModel.getPartyById(req.params.id);
    const structuredParty = structurePartyData(party);
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

  saveSeparatorToParty = async (req, res) => {
    const result = validateSeparToPartyInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idSepars = await this.shopModel.getSeparatorsById(result.data);
    console.log(idSepars.separs.length);
    console.log(idSepars.separs);

    if (idSepars.separs.length === 0) {
      try {
        const newPartySepar = await this.shopModel.createSeparator({ input: result.data });
        res.status(201).json({ message: 'Separador creado exitosamente', separator: newPartySepar });
      } catch (error) {
        console.error('Error al crear el separador:', error);
        res.status(500).json({ error: 'Error al crear el separador' });
      }
    } else {
      const newPrice = result.data.party_price;
      console.log(result.data.amount + 'cantidad de nuevas piezas');
      console.log(idSepars.separs[0].current_amount + 'anterior cantidad');
      const resultAmount = result.data.amount + idSepars.separs[0].current_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const upFullstorageSeparator = await this.shopModel.updateSeparatorById({ input: idSepars.separs, resultAmount, newPrice });
        res.status(201).json({ message: 'Separador actualizado exitosamente', separator: upFullstorageSeparator });
      } catch (error) {
        console.error('Error al crear el separador:', error);
        res.status(500).json({ error: 'Error al crear el separador' });
      }
    }
  };

  saveMagazineToParty = async (req, res) => {
    const result = validateMagazineToPartyInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idMagazines = await this.shopModel.getMagazinesById(result.data);
    console.log(idMagazines.magazines.length);
    console.log(idMagazines.magazines);

    if (idMagazines.magazines.length === 0) {
      try {
        const newPartyMagazine = await this.shopModel.createMagazine({ input: result.data });
        res.status(201).json({ message: 'Revista creada exitosamente', magazine: newPartyMagazine });
      } catch (error) {
        console.error('Error al crear la revista:', error);
        res.status(500).json({ error: 'Error al crear la revista' });
      }
    } else {
      const newPrice = result.data.party_price;
      console.log(result.data.amount + 'cantidad de nuevas piezas');
      console.log(idMagazines.magazines[0].current_amount + 'anterior cantidad');
      const resultAmount = result.data.amount + idMagazines.magazines[0].current_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const upFullstorageMagazine = await this.shopModel.updateMagazineById({ input: idMagazines.magazines, resultAmount, newPrice });
        res.status(201).json({ message: 'Revista actualizada exitosamente', book: upFullstorageMagazine });
      } catch (error) {
        console.error('Error al crear la revista:', error);
        res.status(500).json({ error: 'Error al crear la revista' });
      }
    }
  };

  updateBookToParty = async (req, res) => {
    const result = validateBookToPartyPartialInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idBooks = await this.shopModel.getBooksById(result.data);
    console.log(idBooks.books.length);
    console.log(idBooks.books);

    try {
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
    } catch (error) {
      console.error('Error al procesar la cantidad de piezas o al calcular el nuev:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  };

  updateSeparatorToParty = async (req, res) => {
    const result = validateSeparToPartyPartialInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idSepars = await this.shopModel.getSeparatorsById(result.data);
    console.log(idSepars.separs.length);
    console.log(idSepars.separs);

    try {
      const newPrice = result.data.party_price;
      console.log(result.data.amount + 'cantidad de nuevas piezas');
      console.log(idSepars.separs[0].current_amount + 'anterior cantidad');
      const resultAmount = result.data.amount + idSepars.separs[0].current_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const updateSeparator = await this.shopModel.updateSeparatorById({ input: idSepars.separs, resultAmount, newPrice });
        res.status(201).json({ message: 'Separador actualizado exitosamente', separator: updateSeparator });
      } catch (error) {
        console.error('Error al crear el separador:', error);
        res.status(500).json({ error: 'Error al crear el separador' });
      }
    } catch (error) {
      console.error('Error al procesar la cantidad de piezas o al calcular el nuevo precio:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  };

  updateMagazineToParty = async (req, res) => {
    const result = validateMagazineToPartyPartialInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    const idMags = await this.shopModel.getMagazinesById(result.data);
    console.log(idMags.magazines.length);
    console.log(idMags.magazines);

    try {
      const newPrice = result.data.party_price;
      console.log(result.data.amount + 'cantidad de nuevas piezas');
      console.log(idMags.magazines[0].current_amount + 'anterior cantidad');
      const resultAmount = result.data.amount + idMags.magazines[0].current_amount;
      console.log(resultAmount + 'Cantidad resultante');
      try {
        const updateMagazine = await this.shopModel.updateMagazineById({ input: idMags.magazines, resultAmount, newPrice });
        res.status(201).json({ message: 'Revista actualizada exitosamente', magazine: updateMagazine });
      } catch (error) {
        console.error('Error al crear la revista:', error);
        res.status(500).json({ error: 'Error al crear la revista' });
      }
    } catch (error) {
      console.error('Error al procesar la cantidad de piezas o al calcular el nuevo precio:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  };

  getFullproductsByQuerySearch = async (req, res) => {
    console.log(req.params.input);
    const queryFullproducts = await this.fullproductsModel.getFullproductsByQuerySearch(req.params.input);
    const htmlQueryFullproducts = structureAddPartyQueryFullproducts(queryFullproducts);
    if (htmlQueryFullproducts === '') {
      res.send('<div class="noresult">No hay resultados para tu búsqueda</div>');
    } else {
      res.send(htmlQueryFullproducts);
    }
    console.log(queryFullproducts);
  };

  getPartyproductsByQuerySearch = async (req, res) => {
    console.log(req.params.input);
    console.log(req.params.id);
    const queryPartyproducts = await this.shopModel.getPartyproductsByQuerySearch(req.params.input, req.params.id);
    const htmlQueryPartyroducts = structureStoragePartyQueryProducts(queryPartyproducts);
    if (htmlQueryPartyroducts === '') {
      res.send('<div class="noresult">No hay resultados para tu búsqueda</div>');
    } else {
      res.send(htmlQueryPartyroducts);
    }
    console.log(queryPartyproducts);
  };

  getAllDiscounts = async (req, res) => {
    const discounts = await this.discountModel.getAllDiscounts();
    const htmlDiscounts = structureDiscountsData(discounts);
    res.send(htmlDiscounts);
  };

  saveDiscount = async (req, res) => {
    const result = validateDiscountInfo(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }
    try {
      const newDiscount = await this.discountModel.createDiscount({ input: result.data });
      res.status(201).json({ message: 'Descuento creado exitosamente', discount: newDiscount });
    } catch (error) {
      console.error('Error al crear el descuento:', error);
      res.status(500).json({ error: 'Error al crear el descuento' });
    }
  };

  deleteDiscount = async (req, res) => {
    try {
      const id = req.params.id;
      await this.discountModel.deleteDiscount(id);
      res.status(201).json({ message: 'Descuento eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el descuento:', error);
      res.status(500).json({ error: 'Error al eliminar el descuento' });
    }
  };

  getPosProducts = async (req, res) => {
    const query = req.params.input;
    const id = req.params.id;
    const posProducts = await this.shopModel.getPosProducts(query, id);
    const htmlPosProducts = structurePosQuery(posProducts);
    res.send(htmlPosProducts);
  };

  getPosDiscounts = async (req, res) => {
    const discounts = await this.discountModel.getAllDiscounts();
    const htmlDiscounts = structurePosDiscounts(discounts);
    res.send(htmlDiscounts);
  };

  saveNewTicket = async (req, res) => {
    const result = validateNewTicketInfo(req.body);
    const partyId = req.params.id;

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    try {
      const newTicket = await this.ticketsModel.createTicket({ input: result.data, partyId });
      res.status(201).json({ message: 'Ticket creado exitosamente', ticket: newTicket });
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      res.status(500).json({ error: 'Error al crear el ticket' });
    }
  };

  getAllTicketsToParty = async (req, res) => {
    const partyId = req.params.id;
    const tickets = await this.ticketsModel.getAllTicketsToParty(partyId);
    const htmlTickets = structureReportTickets(tickets);
    res.send(htmlTickets);
  };

  saveNewPayment = async (req, res) => {
    const result = validateNewPaymentInfo(req.body);
    const partyId = req.params.id;

    if (!result.success) {
      const errorMessages = result.error.errors.map(err => err.message);
      console.error('Errores de validación:', errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }
    try {
      const newPayment = await this.ticketsModel.createPayment({ input: result.data, partyId });
      res.status(201).json({ message: 'Pago creado exitosamente', payment: newPayment });
    } catch (error) {
      console.error('Error al crear el pago:', error);
      res.status(500).json({ error: 'Error al crear el pago' });
    }
  };

  getAllPaymentsToParty = async (req, res) => {
    const partyId = req.params.id;
    const payments = await this.ticketsModel.getAllPaymentsToParty(partyId);
    const htmlPayments = structureReportPayments(payments);
    res.send(htmlPayments);
  };

  getBalanceToParty = async (req, res) => {
    const partyId = req.params.id;
    const balance = await this.ticketsModel.getBalanceToParty(partyId);
    const htmlBalance = structureReportBalance(balance);
    res.send(htmlBalance);
  };
}
