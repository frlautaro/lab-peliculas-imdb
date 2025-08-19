// Lee el id de la URL y renderiza los detalles de la película
(function () {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search)
    return params.get(name)
  }

  function formatGenres(genres) {
    if (!Array.isArray(genres) || genres.length === 0) return '—'
    return genres.map(g => g.name).join(', ')
  }

  function renderMovieDetails(movie) {
    const container = document.getElementById('movie-details')
    const titleEl = document.getElementById('movie-title')
    if (!container) return

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image'

    if (titleEl) titleEl.textContent = movie.title || movie.original_title || 'Detalles'

    container.innerHTML = `
      <section class="details-card">
        <img class="details-poster" src="${posterPath}" alt="${movie.title || movie.original_title}">
        <div class="details-info">
          <h2>${movie.title || movie.original_title}</h2>
          <p class="tagline">${movie.tagline || ''}</p>
          <p><strong>Fecha de estreno:</strong> ${movie.release_date || '—'}</p>
          <p><strong>Duración:</strong> ${movie.runtime ? movie.runtime + ' min' : '—'}</p>
          <p><strong>Idioma original:</strong> ${movie.original_language || '—'}</p>
          <p><strong>Géneros:</strong> ${formatGenres(movie.genres)}</p>
          <p><strong>Popularidad:</strong> ${movie.popularity ? movie.popularity.toFixed(1) : '—'}</p>
          <p><strong>Estado:</strong> ${movie.status || '—'}</p>
          <p class="overview">${movie.overview || 'Sin descripción.'}</p>
          ${movie.homepage ? `<a class="button" target="_blank" rel="noopener noreferrer" href="${movie.homepage}">Sitio oficial</a>` : ''}
        </div>
      </section>
    `
  }

  function loadMovieDetails(movieId) {
    if (!movieId) {
      const container = document.getElementById('movie-details')
      if (container) container.innerHTML = '<p class="error">No se proporcionó un ID de película.</p>'
      return
    }
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.status_code) {
          renderMovieDetails(data)
        } else {
          const container = document.getElementById('movie-details')
          if (container) container.innerHTML = '<p class="error">No se encontraron detalles para esta película.</p>'
        }
      })
      .catch(err => {
        console.error('Error al cargar detalles:', err)
        const container = document.getElementById('movie-details')
        if (container) container.innerHTML = '<p class="error">Error al cargar los detalles. Intenta nuevamente.</p>'
      })
  }

  document.addEventListener('DOMContentLoaded', function () {
    const movieId = getQueryParam('id')
    loadMovieDetails(movieId)
  })
})()