export function formatPhoneNumber (phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const formatted = cleaned.substring(0, 2) + ' ' + cleaned.substring(2, 6) + ' ' + cleaned.substring(6, 10);
  return formatted;
}
