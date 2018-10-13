$(document).ready(function() {
  // Landing Page Queries
  $.ajax({
    url:
      "https://api.themoviedb.org/3/trending/all/week?api_key=5904337562741cb4c6afb0d383ff59db",
    method: "GET"
  }).then(function(response) {
    let movies = response.results;

    $.each(movies, (index, movie) => {
      // displays the images of trending movies and tv shows
      var posterPath = "http://image.tmdb.org/t/p/w185";
      var movieLink = $("<a>").attr(
        "onclick",
        "movieSelected('" + movie.id + "')"
      );

      var movieImage = $("<img>").attr("src", posterPath + movie.poster_path);
      var movieCard = $("<div>").addClass("movieCard", { id: movie.id });

      movieLink.append(movieCard);
      movieCard.append(movieImage);

      $("#trending-movies-tv-container").append(movieLink);
      $("#mainpage").show();
      $("#movies").hide();
      $("#movie").hide();
    });
  });

  $.ajax({
    url:
      "https://api.themoviedb.org/3/tv/popular?api_key=5904337562741cb4c6afb0d383ff59db&language=en-US&page=1",
    method: "GET"
  }).then(function(response) {
    let movies = response.results;
    $.each(movies, (index, movie) => {
      //Popular TV Shows
      var posterPath = "http://image.tmdb.org/t/p/w185";
      //displays the images of popular tv shows
      var movieLink = $("<a>").attr(
        "onclick",
        "movieSelected('" + movie.id + "')"
      );

      var movieImage = $("<img>").attr("src", posterPath + movie.poster_path);
      var movieCard = $("<div>").addClass("movieCard", {
        id: movie.id
      });

      movieLink.append(movieCard);
      movieCard.append(movieImage);

      $("#popular-tv-container").append(movieLink);
      $("#mainpage").show();
      $("#movies").hide();
      $("#movie").hide();
    });
  });

  $.ajax({
    url:
      "https://api.themoviedb.org/3/movie/popular?api_key=5904337562741cb4c6afb0d383ff59db&language=en-US&page=1",
    method: "GET"
  }).then(function(response) {
    let movies = response.results;
    $.each(movies, (index, movie) => {
      //Popular Movies

      //displays the images of popular movies
      var posterPath = "http://image.tmdb.org/t/p/w185";
      //displays the images of popular tv shows
      var movieLink = $("<a>").attr(
        "onclick",
        "movieSelected('" + movie.id + "')"
      );

      var movieImage = $("<img>").attr("src", posterPath + movie.poster_path);
      var movieCard = $("<div>").addClass("movieCard", {
        id: movie.id
      });

      movieLink.append(movieCard);
      movieCard.append(movieImage);
      $("#popular-movies-container").append(movieLink);
      $("#mainpage").show();
      $("#movies").hide();
      $("#movie").hide();
    });
  });

  // --------------------------------------------------------------------------

  $("#searchForm").on("submit", function(event) {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    event.preventDefault();
  });
});

// Movie Search
function getMovies(searchText) {
  console.log(searchText);
  var queryURL =
    "https://api.themoviedb.org/3/search/movie?api_key=94facf6fed66c2573cef2d29403f7cda&query=" +
    searchText;

  $.ajax({
    url: queryURL,
    method: "get"
  }).then(response => {
    console.log(response);
    let movies = response.results;
    let output = "";

    $.each(movies, (index, movie) => {
      output += `
      <div class="col-md-3">
      <div class="well text-center">
        <img src="${"https://image.tmdb.org/t/p/original/" +
          movie.poster_path}">
        <h5>${movie.title || movie.name}</h5>
        <a onclick="movieSelected('${
          movie.id
        }')" class="btn btn-primary" href="#">Movie Details</a>
        
      </div>
      </div>
      `;
    });

    $("#movies").html(output);
    $("#movies").show();
    $("#mainpage").hide();
    $("#movie").hide();
  });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  getMovie();
  return false;
}

// Single Movie Card

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  var iDqueryURL =
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "?api_key=94facf6fed66c2573cef2d29403f7cda&append_to_response=videos,images";

  $.ajax({
    url: iDqueryURL,
    method: "get"
  }).then(response => {
    let movie = response;

    $("#movieimg").attr(
      "src",
      "https://image.tmdb.org/t/p/original/" + movie.poster_path
    );

    $("#movietitle").text(movie.name || movie.title);
    $("#moviegenre").text(movie.genres[0].name);
    $("#movierelease").text(movie.release_date);
    $("#movierevenue").text(movie.revenue);
    $("#movieruntime").text(movie.runtime);
    $("#imdb").attr("href", "http://imdb.com/title/" + movie.imdb_id);

    $("#movieoverview").text(movie.overview);
    $("#trailer").attr(
      "src",
      "https://www.youtube.com/embed/" + movie.videos.results[0].key
    );

    $("#movie").show();
    $("#mainpage").hide();
    $("#movies").hide();

    var omdbUrl =
      "http://www.omdbapi.com/?t=" +
      " ' " +
      (movie.name || movie.title) +
      " ' " +
      "&y=&plot=short&apikey=trilogy";

    console.log(omdbUrl);

    $.ajax({
      url: omdbUrl,
      method: "get"
    }).then(function(error, response, body) {
      var imdb = body.responseJSON.Ratings[0].Value;
      var rtomatoes = body.responseJSON.Ratings[1].Value;

      $("#rottenrating").text(rtomatoes);
      $("#imdbrating").text(imdb);

      console.log("IMDB rating: " + imdb);
      console.log("Rotten Tomatoes rating: " + rtomatoes);
    });
  });
}
