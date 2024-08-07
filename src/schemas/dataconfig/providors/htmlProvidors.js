import { formatPhoneNumber } from '../../universal-formats/phoneNumber.js';

export function structureProvidors (providors) {
  const providorsArray = providors.map((providor) => `
    <div class="providor-card">
      <div class="glow"></div>
      <div class="borderglow"></div>
      <div class="providor-name">${providor.prov_name}</div>
      <div class="prov-bit id">${providor.prov_id}</div>
      <div class="prov-bit resp">${providor.prov_resp}</div>
      <div class="prov-bit numb">${formatPhoneNumber(providor.prov_number)}</div>

      <div class="opt-dots" id="${providor.prov_id}">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

      <div class="options-ask">
        <div class="provBtns editBtn">
          Editar
          <img class="btn-icon" src="/svg/edit-icon.svg"/>
          
        </div>
        <div class="provBtns deleteBtn">
          Eliminar
          <img class="btn-icon" src="/svg/trash-icon.svg"/>
        </div>
      </div>
    </div>
    `);
  const providorsHtml = providorsArray.join('');
  return providorsHtml;
}
