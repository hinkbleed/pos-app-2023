export function structureEditorials (editorials) {
  const editorialsArray = editorials.map((editorial) => `
    <div class="editorial-card">
      <div class="glow"></div>
      <div class="borderglow"></div>
      <div class="editorial-name">${editorial.edit_name}</div>
      <div class="edit-bit id">${editorial.edit_id}</div>
    </div>
    `);
  const editorialsHtml = editorialsArray.join('');
  return editorialsHtml;
}

export function structureEditorialsToProducts (editorials) {
  const editorialsArray = editorials.map((editorial) => `
    <option data-id="${editorial.edit_id}" data-name="${editorial.edit_name}">${editorial.edit_name}</option>
    `);
  const emptyRule = '<option data-id="">-- Selecciona una editorial --</option>';
  const editorialsHtml = emptyRule + editorialsArray.join('');
  return editorialsHtml;
}
