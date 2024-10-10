export function structureReportTickets (tickets) {
  let htmlTickets = '';

  if (tickets.length > 0) {
    const ticketsByDate = tickets.reduce((acc, ticket) => {
      const ticketDate = new Date(ticket.ticket_hourDate).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      if (!acc[ticketDate]) {
        acc[ticketDate] = [];
      }
      acc[ticketDate].push(ticket);
      return acc;
    }, {});
    const reversedTicketsByDate = Object.keys(ticketsByDate).reverse().reduce((acc, date) => {
      acc[date] = ticketsByDate[date];
      return acc;
    }, {});
    Object.keys(reversedTicketsByDate).forEach(date => {
      const dayTickets = reversedTicketsByDate[date];
      let totalCash = 0;
      let totalCard = 0;
      let totalTransfer = 0;
      let totalVenta = 0;
      dayTickets.forEach(ticket => {
        totalCash += ticket.ticket_payment.cash;
        totalCard += ticket.ticket_payment.card;
        totalTransfer += ticket.ticket_payment.transfer;
        totalVenta += ticket.ticket_payment.total;
      });
      htmlTickets += `
      <div class="event-day">
        <div class="event-day-header">
          <div class="day-date">${date}</div>
          <div class="options-box">
            <div class="details-summary">
              <div class="summary labels">
                <div class="summary-item label cash">EFECTIVO</div>
                <div class="summary-item label card">TARJETA</div>
                <div class="summary-item label trans">TRANSFERENCIA</div>
              </div>
              <div class="summary cants">
                <div class="summary-item cant cash">$${totalCash.toFixed(2)}</div>
                <div class="summary-item cant card">$${totalCard.toFixed(2)}</div>
                <div class="summary-item cant trans">$${totalTransfer.toFixed(2)}</div>
              </div>
            </div>
            <div class="daily-total-box">
              <div class="daily-venta">
                $<div class="daily-venta-numb">${totalVenta.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      dayTickets.sort((a, b) => new Date(b.ticket_hourDate) - new Date(a.ticket_hourDate)).forEach(ticket => {
        const ticketHour = new Date(ticket.ticket_hourDate).toLocaleTimeString('es-ES', {
          hour: '2-digit', minute: '2-digit'
        });
        htmlTickets += `
        <div class="detailed-venta">
          <div class="venta-head">
            <div class="head-item ticket-hour">${ticketHour}</div>
            <div class="head-item ticket-id">${ticket.ticket_id}</div>
            <div class="head-item ticket-price-box">
              <div class="price-carats">$<div class="price-numb">${ticket.ticket_payment.total.toFixed(2)}</div></div>
            </div>
          </div>
          <div class="div-line"></div>
          <div class="venta-body">
        `;
        ticket.ticket_info.forEach(product => {
          htmlTickets += `
          <div class="venta-item">
            <div class="bodypart">
              <div class="item-info amount">x ${product.amount}</div>
              <div class="item-info name">${product.name}</div>
              <div class="item-info codebar">${product.barcode}</div>
              <div class="item-info price">$${product.price.toFixed(2)}</div>
              <div class="item-info discount"> ${product.discount}%${(product.price * (product.discount / 100)) === 0 ? '' : (product.price * (product.discount / 100)).toFixed(2)}</div>
              <div class="item-info subtotal">$${product.subtotal.toFixed(2)}</div>
            </div>
          </div>
          `;
        });
        htmlTickets += '</div></div><div class="div-line"></div>';
      });
      htmlTickets += '</div>';
    });
  } else {
    htmlTickets += '<div class="no-content">Aún no hay tickets de venta para este evento</div>';
  }
  return htmlTickets;
}

export function structureReportPayments (payments) {
  let htmlPayments = '';
  console.log(payments);

  if (payments.length > 0) {
    const paymentsByDate = payments.reduce((acc, payment) => {
      const paymentDate = new Date(payment.pay_hourDate).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      if (!acc[paymentDate]) {
        acc[paymentDate] = [];
      }
      acc[paymentDate].push(payment);
      return acc;
    }, {});

    const reversedPaymentsByDate = Object.keys(paymentsByDate).reverse().reduce((acc, date) => {
      acc[date] = paymentsByDate[date];
      return acc;
    }, {});

    Object.keys(reversedPaymentsByDate).forEach(date => {
      const dayPayments = reversedPaymentsByDate[date];
      let totalCash = 0;
      console.log(dayPayments);

      // Sumar el total de pagos
      dayPayments.forEach(payment => {
        totalCash += payment.pay_amount;
      });

      // Crear el HTML para cada día de pagos
      htmlPayments += `
      <div class="event-day">
        <div class="event-day-header">
          <div class="day-date">${date}</div>
          <div class="options-box">
            <div class="details-summary">
              <div class="summary labels">
                <div class="summary-item label cash">EFECTIVO </div>
              </div>
              <div class="summary cants">
                <div class="summary-item cant cash">$${totalCash.toFixed(2)}</div>
              </div>
            </div>
            
            <div class="daily-total-box">
              <div class="daily-venta">
                $<div class="daily-venta-numb">${totalCash.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Ordenar los pagos de más reciente a más antiguo y crear el HTML
      dayPayments.sort((a, b) => new Date(b.pay_hourDate) - new Date(a.pay_hourDate)).forEach(payment => {
        const paymentHour = new Date(payment.pay_hourDate).toLocaleTimeString('es-ES', {
          hour: '2-digit', minute: '2-digit'
        });

        htmlPayments += `
        <div class="detailed-venta">
          <div class="venta-head">
            <div class="head-item ticket-hour">${paymentHour}</div>
            <div class="head-item ticket-id">${payment.pay_id}</div>
            <div class="head-item ticket-price-box">
              <div class="price-carats">$<div class="price-numb">${payment.pay_amount.toFixed(2)}</div></div>
            </div>
          </div>
          <div class="div-line"></div>
          <div class="venta-body">
            <div class="item-info concept">${payment.pay_concept}</div>
          </div>
        </div>
        <div class="div-line"></div>`;
      });

      // Cerrar el div del día
      htmlPayments += '</div>';
    });
  } else {
    htmlPayments += '<div class="no-content">Aún no hay pagos para este evento</div>';
  }

  return htmlPayments;
}

export function structureReportBalance (balance) {
  let htmlBalance = '';
  if (balance.length > 0) {
    // Ordena los días en orden inverso (más reciente primero)
    balance.sort((a, b) => new Date(b.date) - new Date(a.date));

    balance.forEach(day => {
      console.log(day.date);
      const dayDate = new Date(day.date).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
      });

      function capitalizeDayAndMonth (string) {
        return string.split(' ').map(word => {
          if (word !== 'de') {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        }).join(' ');
      }

      const formattedDate = capitalizeDayAndMonth(dayDate);

      let totalCash = 0;
      let totalCard = 0;
      let totalTransfer = 0;
      let totalVenta = 0;
      let totalPayments = 0;
      let totalBalance = 0;

      htmlBalance += `
        <div class="balance-day">
          <div class="balance-day-header">
            <div class="day-date">${formattedDate}</div>
          </div>`;

      if (day.tickets.length > 0) {
        day.tickets.forEach(ticket => {
          totalCash += ticket.ticket_payment.cash || 0;
          totalCard += ticket.ticket_payment.card || 0;
          totalTransfer += ticket.ticket_payment.transfer || 0;
          totalVenta += ticket.ticket_payment.total || 0;
        });

        htmlBalance += `
  
          <div class="balance-day-ventas">
            <div class="balance-ventas-title">
              Ventas
            </div>
            <div class="balance-ventas-body">
              <div class="balance-ventas-detail">
                <div class="ventas-detail-title transfer">Transferencias</div>
                <div class="ventas-detail-amount">$${totalTransfer.toFixed(2)}</div>
              </div>
              <div class="balance-ventas-detail">
                <div class="ventas-detail-title card">Tarjeta</div>
                <div class="ventas-detail-amount">$${totalCard.toFixed(2)}</div>
              </div>
              <div class="balance-ventas-detail">
                <div class="ventas-detail-title cash">Efectivo</div>
                <div class="ventas-detail-amount">$${totalCash.toFixed(2)}</div>
              </div>
              <div class="balance-ventas-detail subtotal">
                <div class="ventas-detail-title subtotal">Subtotal</div>
                <div class="ventas-detail-amount">$${totalVenta.toFixed(2)}</div>
              </div>
            </div>
          </div>
        `;
      }

      if (day.payments.length > 0) {
        day.payments.forEach(payment => {
          totalPayments += payment.pay_amount || 0;
        });

        htmlBalance += `
          <div class="balance-day-pagos">
            <div class="balance-pagos-title">
              Pagos
            </div>
            <div class="balance-pagos-body">
          
              <div class="balance-pagos-detail">
                <div class="pagos-detail-title transfer">Efectivo</div>
                <div class="ventas-detail-amount">$${totalPayments.toFixed(2)}</div>
              </div>
              
              <div class="balance-pagos-detail subtotal">
                <div class="pagos-detail-title subtotal">Subtotal</div>
                <div class="pagos-detail-amount">- $${totalPayments.toFixed(2)}</div>
              </div>
  
            </div>
          </div>
        `;
      }
      totalBalance = totalCash - totalPayments + totalCard + totalTransfer;
      htmlBalance += `
          <div class="balance-day-total">
            <div class="balance-day-title">
              Balance
            </div>
            
            <div class="balance-day-body">
              <div class="balance-day-detail">
                <div class="balance-detail-title transfer">Transferencias</div>
                <div class="balance-detail-amount">$${totalTransfer.toFixed(2)}</div>
              </div>
              <div class="balance-day-detail">
                <div class="balance-detail-title card">Tarjeta</div>
                <div class="balance-detail-amount">$${totalCard.toFixed(2)}</div>
              </div>
              <div class="balance-day-detail">
                <div class="balance-detail-title cash">Efectivo</div>
                <div class="balance-detail-amount">$${totalBalance.toFixed(2)}</div>
              </div>
              <div class="balance-day-detail total">
                <div class="balance-detail-title total">Total</div>
                <div class="balance-detail-amount">$${totalBalance.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>`;
    });
  } else {
    htmlBalance += '<div class="no-content">Aún no hay información para este evento</div>';
  }

  return htmlBalance;
}
