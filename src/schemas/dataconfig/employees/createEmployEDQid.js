export function createEmployEDQid (newIDcounter) {
  if (newIDcounter !== undefined) {
    const paddedNumber = String(newIDcounter).padStart(6, '0');
    const newEmployEDQid = `EDQE${paddedNumber}`;
    return newEmployEDQid;
  } else {
    console.error('No se pudo obtener el valor de provIDcounter desde counterDB');
    return null;
  }
}
