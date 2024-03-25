export function structureGenres (genres) {
  const genresArray = genres.map((genre) => `
  <div class="genre-card">
    <div class="content">
      <div class="item genre-name">${genre.genre_name}</div>
    
      <div class="item genre-abv">${genre.genre_abv}</div>
    
      <div class="item genre-id">${genre.genre_id}</div>
    </div>

    <div class="opt-dots genre-dots">
      <div class="dot"></div>
    </div>
      
    <div class="genreOptions-ask options-ask">
      <div class="genreBtns deleteBtn">
        Eliminar
        <img class="btn-icon" src="/svg/trash-icon.svg"/>
      </div>
    </div>
  </div>
      `);
  const genresHtml = genresArray.join('');
  return genresHtml;
}

export function structureGenresToProducts (genres) {
  const genresArray = genres.map((genre) => `
    <option data-id="${genre.genre_id}" data-name="${genre.genre_name}" data-abv="${genre.genre_abv}">${genre.genre_name} / ${genre.genre_abv}</option>
      `);
  const emptyRule = '<option>-- Selecciona un género --</option>';
  const genresHtml = emptyRule + genresArray.join('');
  return genresHtml;
}
