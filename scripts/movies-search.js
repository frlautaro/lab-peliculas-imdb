let search = ''

// Función para mostrar películas (similar a movies.js)
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
        <p class="movie-popularity">Popularidad: ${movie.popularity.toFixed(1)}
        </p>
        <button type="button" class="button details-button" data-movie-id="${movie.id}">Detalles</button>
        </div>
    `;
    
    moviesContainer.appendChild(movieDiv);
  });
}

// Función para cargar películas populares (página principal)
// Nota: la carga de populares dedicada vive en window.loadPopularMovies (scripts/movies-popular.js)

function searchMovies() {
  const searchInput = document.getElementById('search')
  search = searchInput.value.trim()

  if (search === '') {
    alert('Por favor, ingresa un término de búsqueda')
    return
  }

  // Limpiar el contenido del section movies antes de la búsqueda
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // Mostrar los resultados de búsqueda
      if (data.results && data.results.length > 0) {
        displayMovies(data.results);
      } else {
        // Si no hay resultados, mostrar mensaje
        moviesContainer.innerHTML = '<p class="no-results">No se encontraron películas para tu búsqueda.</p>';
      }
    })
    .catch((error) => {
      console.error('Error en la búsqueda:', error);
      moviesContainer.innerHTML = '<p class="error">Error al realizar la búsqueda. Inténtalo de nuevo.</p>';
    })
}

document.addEventListener('DOMContentLoaded', function () {
  if (typeof window.loadHomeMovies === 'function') {
    window.loadHomeMovies();
  }
  
  const searchButton = document.getElementById('search-button')
  if (searchButton) {
    searchButton.addEventListener('click', searchMovies)
  }

  const searchInput = document.getElementById('search')
  if (searchInput) {
    searchInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        searchMovies()
      }
    })
  }
  const homeButton = document.getElementById('home-button')
  if (homeButton && typeof window.loadHomeMovies === 'function') {
    homeButton.addEventListener('click', function () {
      window.loadHomeMovies()
    })
  }
  // Delegación de eventos para botones "Detalles"
  const moviesContainer = document.getElementById('movies')
  if (moviesContainer) {
    moviesContainer.addEventListener('click', function (event) {
      const detailsBtn = event.target.closest('.details-button')
      if (detailsBtn && detailsBtn.dataset.movieId) {
        const movieId = detailsBtn.dataset.movieId
        window.location.href = `./movie-details.html?id=${movieId}`
      }
    })
  }
  
})
