export function createPartyEDQid (newIDcounter) {
  const paddedNumber = String(newIDcounter).padStart(8, '0');
  const newPartyEDQid = `EDQPRTY${paddedNumber}`;
  return newPartyEDQid;
}
