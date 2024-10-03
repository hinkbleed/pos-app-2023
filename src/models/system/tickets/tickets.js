import mysql from 'mysql2/promise';
import { createPaymentEDQid, createTicketEDQid } from '../../../schemas/shop/createEDQid.js';

const config = {
  host: 'localhost',
  user: 'edqUone',
  port: 3306,
  password: 'silicio',
  database: 'EDQSYSTEM'
};
const connection = await mysql.createConnection(config);

export class TicketsModel {
  static async createTicket (data) {
    const [counterDB] = await connection.query('SELECT ticketIDcounter FROM ticketIDcounter;');
    const ticketIDcounter = counterDB[0].ticketIDcounter;
    const newTicketIDcounter = ticketIDcounter + 1;
    const ticketId = createTicketEDQid(newTicketIDcounter);
    try {
      await connection.query(
        `INSERT INTO tickets (ticket_id, party_id, ticket_hourDate, ticket_payment, ticket_info)
         VALUES (?, ?, NOW(), ?, ?);`,
        [ticketId, data.partyId, JSON.stringify(data.input.payment), JSON.stringify(data.input.products)]
      );
      await connection.query('UPDATE ticketIDcounter SET ticketIDcounter = ?;', [newTicketIDcounter]);
      return true;
    } catch (error) {
      console.error('Failed to create ticket with data:', data);
      console.error('Error occurred at:', new Date());
      console.error('SQL query failed:', `INSERT INTO tickets (party_id, ticket_hourDate, ticket_payment, ticket_info) VALUES (${ticketId}, ${data.partyId}, NOW(), ${JSON.stringify(data.input.payment)}, ${JSON.stringify(data.input.products)});`);
      throw new Error('Error creating ticket: ' + error.message);
    }
  }

  static async createPayment (data) {
    const [counterDB] = await connection.query('SELECT paymentIDcounter FROM paymentIDcounter;');
    const paymentIDcounter = counterDB[0].paymentIDcounter;
    const newPaymentIDcounter = paymentIDcounter + 1;
    const paymentId = createPaymentEDQid(newPaymentIDcounter);
    try {
      await connection.query(
        `INSERT INTO payments (pay_id, party_id, pay_hourDate, pay_type, pay_amount, pay_concept)
         VALUES (?, ?, NOW(), ?, ?, ?);`,
        [paymentId, data.partyId, data.input.pay_type, data.input.pay_amount, data.input.pay_concept]
      );
      await connection.query('UPDATE paymentIDcounter SET paymentIDcounter = ?;', [newPaymentIDcounter]);
      return true;
    } catch (error) {
      console.error('Failed to create payment with data:', data);
      console.error('Error occurred at:', new Date());
      console.error('SQL query failed:', `INSERT INTO payments (party_id, pay_hourDate, pay_type, pay_amount, pay_concept) VALUES (${paymentId}, ${data.partyId}, NOW(), ${JSON.stringify(data.input.pay_type)}, ${JSON.stringify(data.input.pay_amount)}, ${JSON.stringify(data.input.pay_concept)});`);
      throw new Error('Error creating payment: ' + error.message);
    }
  }

  static async getAllTicketsToParty (partyId) {
    const [tickets] = await connection.query(
      `SELECT t.ticket_id,
              t.party_id,
              t.ticket_hourDate,
              t.ticket_payment,
              t.ticket_info
       FROM tickets AS t
       WHERE t.party_id = ?;`,
      [partyId]
    );
    return tickets;
  }

  static async getAllPaymentsToParty (partyId) {
    const [payments] = await connection.query(
      `SELECT p.pay_id,
              p.party_id,
              p.pay_hourDate,
              p.pay_type,
              p.pay_amount,
              p.pay_concept
       FROM payments AS p
       WHERE p.party_id = ?;`,
      [partyId]
    );
    return payments;
  }

  static async getBalanceToParty (partyId) {
    // Consulta para obtener los tickets
    const [tickets] = await connection.query(
      `SELECT t.ticket_hourDate,
              t.ticket_payment
       FROM tickets AS t
       WHERE t.party_id = ?;`,
      [partyId]
    );
    const [payments] = await connection.query(
      `SELECT p.pay_hourDate,
              p.pay_amount
       FROM payments AS p
       WHERE p.party_id = ?;`,
      [partyId]
    );
    const groupedData = {};
    tickets.forEach(ticket => {
      const ticketDate = new Date(ticket.ticket_hourDate).toISOString().split('T')[0];
      if (!groupedData[ticketDate]) {
        groupedData[ticketDate] = { tickets: [], payments: [] };
      }
      groupedData[ticketDate].tickets.push(ticket);
    });
    payments.forEach(payment => {
      const paymentDate = new Date(payment.pay_hourDate).toISOString().split('T')[0];
      if (!groupedData[paymentDate]) {
        groupedData[paymentDate] = { tickets: [], payments: [] };
      }
      groupedData[paymentDate].payments.push(payment);
    });
    const result = Object.keys(groupedData).map(date => ({
      date,
      tickets: groupedData[date].tickets,
      payments: groupedData[date].payments
    }));
    return result;
  }
}
