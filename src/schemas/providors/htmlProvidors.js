export function structureProvidors (providors) {
  function formatPhoneNumber (phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const formatted = cleaned.substring(0, 2) + ' ' + cleaned.substring(2, 6) + ' ' + cleaned.substring(6, 10);
    return formatted;
  }
  const providorsArray = providors.map((providor) => `
    <div class="providor-card">
      <div class="glow"></div>
      <div class="borderglow"></div>
      <div class="providor-name">${providor.prov_name}</div>
      <div class="prov-bit id">${providor.prov_id}</div>
      <div class="prov-bit resp">${providor.prov_resp}</div>
      <div class="prov-bit numb">${formatPhoneNumber(providor.prov_number)}</div>
    </div>
    `);
  const providorsHtml = providorsArray.join('');
  return providorsHtml;
}
