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
