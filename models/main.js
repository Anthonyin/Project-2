$(document).ready(function() {
  $('#searchForm').on('submit', function(event) {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });
});

function getMovies(searchText) {
  console.log(searchText);
  var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=94facf6fed66c2573cef2d29403f7cda&query=' + searchText;

  $.ajax({
    url: queryURL,
    merhid: 'get'
  }).then(response => {
    console.log(response);
    let movies = response.results;
    let output = '';

    $.each(movies, (index, movie) => {
      output += `
      <div class="col-md-3">
      <div class="well text-center">
        <img src="${'https://image.tmdb.org/t/p/original/' +
          movie.poster_path}">
        <h5>${movie.title || movie.name}</h5>
        <a onclick="movieSelected('${
          movie.id
        }')" class="btn btn-primary" href="#">Movie Details</a>
        
      </div>
      </div>
      `;
    });
    $('#movies').html(output);
  });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  var iDqueryURL =
    'https://api.themoviedb.org/3/movie/' +
    movieId +
    '?api_key=94facf6fed66c2573cef2d29403f7cda&append_to_response=videos,images';

  $.ajax({
    url: iDqueryURL,
    merhid: 'get'
  }).then(response => {
    console.log(response);
    let movie = response;

    let output = `
    <div class="row">
      <div class="col-md-4">
        <img src="${'https://image.tmdb.org/t/p/original/' +
          movie.poster_path}" class="thumbnail">
      </div>

      <div class="col-md-8">
        <h2>${movie.name || movie.title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre: </strony>${
            movie.genres[0].name
          }  </li>

          <li class="list-group-item"><strong>Released Date: </strony>${
            movie.release_date
          }

          <li class="list-group-item"><strong>Popularity: </strony>${
            movie.popularity
          }

          <li class="list-group-item"><strong>Revenue: $</strony>${movie.revenue}

          <li class="list-group-item"><strong>Runtime: </strony>${movie.runtime}
        </ul>
      </div>
    </div>


    <div class="row">
    <div class="well">
    <h3 style="text-align:center">Overview</h3>
    ${movie.overview}
    <hr>

    <h3 style="text-align:center">Watch Trailer</h3>
    <div class="youtube-player">
    <iframe width="800" height="450" src="https://www.youtube.com/embed/${
      movie.videos.results[0].key
    }" frameborder="0" allowfullscreen></iframe>
  </div>
  <hr>
    <a href="http://imdb.com/title/${
      movie.imdb_id
    }" target="_blank" class="btn btn-primary">View IMDB</a>
  <a href="index.html" class="btn btn-info">Go Back</a>
  <a href="#" class="btn btn-success">Add to watchlist</a>
  <a href="#" class="btn btn-secondary">Rate it</a>
    `;
    $('#movie').html(output);
  });

  
}
