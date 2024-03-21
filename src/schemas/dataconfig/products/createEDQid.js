export function createBookEDQid (newIDcounter, genreAbv, subgenreAbv, editorial) {
  const lastThreeDigits = ('000' + editorial).slice(-3);

  // Obtener las tres primeras siglas de genreAbv y subgenreAbv
  const genreSiglas = genreAbv.slice(0, 3);
  const subgenreSiglas = subgenreAbv.slice(0, 3);

  // Convertir newIDcounter a una cadena y rellenar con ceros a la izquierda si es necesario
  const paddedNumber = String(newIDcounter).padStart(8, '0');

  // Construir el ID completo
  const newBookEDQid = `EDQB${lastThreeDigits}${genreSiglas}${subgenreSiglas}${paddedNumber}`;
  return newBookEDQid;
}

export function createBookBarcodeEDQid (bookBarcode) {
  const randomThreeDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const newBookBarcodeEDQid = `EDQBAR${randomThreeDigits}${bookBarcode}`;
  console.log(newBookBarcodeEDQid);
  return newBookBarcodeEDQid;
}

export function createSeparEDQid (newIDcounter) {
  const paddedNumber = String(newIDcounter).padStart(8, '0');

  // Construir el ID completo
  const newSeparEDQid = `EDQS${paddedNumber}`;
  return newSeparEDQid;
}

export function createSeparBarcodeEDQid (separBarcode) {
  const randomThreeDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const newSeparBarcodeEDQid = `EDQBAR${randomThreeDigits}${separBarcode}`;
  console.log(newSeparBarcodeEDQid);
  return newSeparBarcodeEDQid;
}

export function createMagEDQid (newIDcounter, subgenreAbv, editorial) {
  const lastThreeDigits = ('000' + editorial).slice(-3);

  const subgenreSiglas = subgenreAbv.slice(0, 3);

  const paddedNumber = String(newIDcounter).padStart(8, '0');

  // Construir el ID completo
  const newMagEDQid = `EDQM${lastThreeDigits}${subgenreSiglas}${paddedNumber}`;
  return newMagEDQid;
}

export function createMagBarcodeEDQid (magBarcode) {
  const randomThreeDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const newMagBarcodeEDQid = `EDQBAR${randomThreeDigits}${magBarcode}`;
  return newMagBarcodeEDQid;
}
