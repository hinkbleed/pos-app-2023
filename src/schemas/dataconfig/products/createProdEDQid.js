export function createProvEDQid (newIDcounter) {
  if (newIDcounter !== undefined) {
    const paddedNumber = String(newIDcounter).padStart(6, '0');
    const newProvEDQid = `EDQPROV${paddedNumber}`;
    return newProvEDQid;
  } else {
    console.error('No se pudo obtener el valor de provIDcounter desde counterDB');
    return null;
  }
}
