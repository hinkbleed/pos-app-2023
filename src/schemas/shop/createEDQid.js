export function createTicketEDQid (newTicketIDcounter) {
  const paddedNumber = String(newTicketIDcounter).padStart(9, '0');
  const newTicketEDQid = `EDQTKT${paddedNumber}`;
  return newTicketEDQid;
}

export function createPaymentEDQid (newPaymentIDcounter) {
  const paddedNumber = String(newPaymentIDcounter).padStart(9, '0');
  const newPaymentEDQid = `EDQPAY${paddedNumber}`;
  return newPaymentEDQid;
}
