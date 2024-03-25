export function structureSubgenres (subgenres) {
  const subgenresArray = subgenres.map((subgenre) => `
    <div class="subgenre-card">
      <div class="content">
        <div class="item subgenre-name">${subgenre.subgenre_name}</div>
        
        <div class="item subgenre-abv">${subgenre.subgenre_abv}</div>
        
        <div class="item subgenre-id">${subgenre.subgenre_id}</div>
      </div>

      <div class="opt-dots subgenre-dots">
      <div class="dot"></div>
    </div>
      
    <div class="subgenreOptions-ask options-ask">
      <div class="subgenreBtns deleteBtn">
        Eliminar
        <img class="btn-icon" src="/svg/trash-icon.svg"/>
      </div>
    </div>
    </div>
     `);
  const subgenresHtml = subgenresArray.join('');
  return subgenresHtml;
}

export function structureSubgenresToProducts (subgenres) {
  const subgenresArray = subgenres.map((subgenre) => `
  <option data-id="${subgenre.subgenre_id}" data-name="${subgenre.subgenre_name}" data-abv="${subgenre.subgenre_abv}">${subgenre.subgenre_name} / ${subgenre.subgenre_abv}</option>
     `);
  const emptyRule = '<option>-- Selecciona un subgénero --</option>';
  const subgenresHtml = emptyRule + subgenresArray.join('');
  return subgenresHtml;
}
