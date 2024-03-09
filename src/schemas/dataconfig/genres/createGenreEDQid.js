export function createGenreEDQid (newIDcounter) {
  if (newIDcounter !== undefined) {
    const paddedNumber = String(newIDcounter).padStart(6, '0');
    const newGenreEDQid = `EDQGENR${paddedNumber}`;
    return newGenreEDQid;
  } else {
    console.error('No se pudo obtener el valor de genreIDcounter desde counterDB');
    return null;
  }
}
