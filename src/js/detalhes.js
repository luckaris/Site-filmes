const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }

  return (false);
}

function getMovie(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}?${API_KEY}`;
  fetch(url).then(res => res.json()).then(data => {
    showMovieDetail(data)
  })
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return "orange"
  } else {
    return 'red'
  }
}

function showMovieDetail(data) {
  console.log(data);
  const main = document.getElementById('main');
  const { title, release_date, genres, poster_path, backdrop_path, vote_average, overview,homepage, id } = data;
  const movieEl = document.createElement('div');
  movieEl.innerHTML = `
    <div class="movie-container" >
      <img class="bg-image" src="${IMG_URL + backdrop_path}">
      <div class="movie-details">
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div>
          <h1>${title}</h1>
          <div class="metadata">
          <h3>Lançamento: ${release_date}</h3>
          <h3>Nota: ${vote_average}</h3>
          <h3>Gêneros: ${genres.map(genre => genre.name).join('/ ')}</h3>
          </div>
          <p>${overview}</p>
          <a class="btn btn-outline-default" href="${homepage}" target="_blank">Ver no site</a>
        </div>
      </div>
    </div>
  `

  main.appendChild(movieEl);
}

getMovie(getQueryVariable('id'));