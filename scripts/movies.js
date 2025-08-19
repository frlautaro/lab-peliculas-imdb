function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = ''; // Limpiar contenedor
  
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie-card';
    
    const posterPath = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image';
    
    movieDiv.innerHTML = `
      <img class="poster" src="${posterPath}" alt="${movie.original_title}" class="movie-poster">
      <div class="movie-info">
        <h3 class="movie-title">${movie.original_title}</h3>
        <p class="movie-date">Fecha de lanzamiento: ${movie.release_date}</p>
        <p class="movie-popularity">Popularidad: ${movie.popularity.toFixed(1)}</p>
      </div>
    `;
    
    moviesContainer.appendChild(movieDiv);
  });
}
// Exponer para uso global
window.displayMovies = displayMovies;

// Cargar contenido de Home
window.loadHomeMovies = function () {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

