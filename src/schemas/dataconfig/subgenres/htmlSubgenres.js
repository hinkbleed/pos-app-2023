export function structureSubgenres (subgenres) {
  const subgenresArray = subgenres.map((subgenre) => `
    <div class="subgenre-card">
      <div class="content">
        <div class="item subgenre-name">${subgenre.subgenre_name}</div>
        
        <div class="item subgenre-abv">${subgenre.subgenre_abv}</div>
        
        <div class="item subgenre-id">${subgenre.subgenre_id}</div>
      </div>
    </div>
     `);
  const subgenresHtml = subgenresArray.join('');
  return subgenresHtml;
}
