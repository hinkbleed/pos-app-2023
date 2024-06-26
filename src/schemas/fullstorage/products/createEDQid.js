export function createFullstorageBookEDQid (input) {
  const kindInit = input.bookfs_kind.charAt(0).toUpperCase();
  const fullstorageBookEDQid = input.book_id + kindInit;
  return fullstorageBookEDQid;
}

export function createFullstorageSeparEDQid (input) {
  const fullstorageSeparEDQid = input.separ_id + 'L';
  return fullstorageSeparEDQid;
}

export function createFullstorageMagEDQid (input) {
  const fullstorageMagEDQid = input.mag_id + 'L';
  return fullstorageMagEDQid;
}
