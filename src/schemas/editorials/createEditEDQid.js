export function createEditEDQid (newIDcounter) {
  if (newIDcounter !== undefined) {
    const paddedNumber = String(newIDcounter).padStart(6, '0');
    const newEditEDQid = `EDQEDIT${paddedNumber}`;
    return newEditEDQid;
  } else {
    console.error('No se pudo obtener el valor de editIDcounter desde counterDB');
    return null;
  }
}
