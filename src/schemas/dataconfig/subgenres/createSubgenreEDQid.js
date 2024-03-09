export function createSubgenreEDQid (newIDcounter) {
  if (newIDcounter !== undefined) {
    const paddedNumber = String(newIDcounter).padStart(6, '0');
    const newSubgenreEDQid = `EDQSUBG${paddedNumber}`;
    return newSubgenreEDQid;
  } else {
    console.error('No se pudo obtener el valor de subgenreIDcounter desde counterDB');
    return null;
  }
}
