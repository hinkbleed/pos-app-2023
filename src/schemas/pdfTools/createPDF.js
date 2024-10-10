import PDFDocument from 'pdfkit';

export function createPDF (dataCallback, endCallback, partyFullData) {
  const doc = new PDFDocument();

  // Escuchar eventos del documento
  doc.on('data', dataCallback);
  doc.on('end', endCallback);
  console.log(doc);

  // Verifica que los datos estén correctos antes de agregar al PDF
  if (!Array.isArray(partyFullData) || partyFullData.length === 0) {
    console.error('Datos de partyFullData no válidos:', partyFullData);
    doc.text('Error: No se encontraron datos para el evento');
    doc.end();
    return;
  }

  const party = partyFullData[0];

  try {
    // Añadiendo contenido dinámico basado en los datos del evento
    doc.fontSize(25).text(`Reporte del Evento: ${party.party_name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Fecha de Inicio: ${party.party_startDate}`);
    doc.text(`Fecha de Fin: ${party.party_endDate}`);
    doc.text(`Lugar: ${party.party_place}`);
    doc.text(`Calle: ${party.party_street}, Número: ${party.party_adressNumber}`);
    doc.text(`Ciudad: ${party.party_city}, Código Postal: ${party.party_postalCode}`);
    doc.moveDown();
    doc.text(`Estado del Evento: ${party.party_state}`);
    doc.text(`Fecha de Creación: ${party.party_creationDate}`);

    // Finaliza el documento PDF
    doc.end();
  } catch (error) {
    console.error('Error escribiendo en el PDF:', error);
    doc.text('Error al generar el reporte del evento');
    doc.end();
  }
}
