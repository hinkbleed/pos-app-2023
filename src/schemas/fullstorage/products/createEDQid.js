export function createFullstorageBookEDQid (input) {
  const kindInit = input.bookfs_kind.charAt(0).toUpperCase();
  const fullstorageBookEDQid = input.book_id + kindInit;
  return fullstorageBookEDQid;
}
