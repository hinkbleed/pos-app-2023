export function structureGenres (genres) {
  const genresArray = genres.map((genre) => `
  <div class="genre-card">
  <div class="content">
    <div class="item genre-name">${genre.genre_name}</div>
    
    <div class="item genre-abv">${genre.genre_abv}</div>
    
    <div class="item genre-id">${genre.genre_id}</div>
  </div>
</div>
      `);
  const genresHtml = genresArray.join('');
  return genresHtml;
}
