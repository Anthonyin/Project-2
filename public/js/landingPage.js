$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfOFTf4as4yb3kxUSr5gDyjtPbcGH54rU",
    authDomain: "tv-app-ed734.firebaseapp.com",
    databaseURL: "https://tv-app-ed734.firebaseio.com",
    projectId: "tv-app-ed734",
    storageBucket: "tv-app-ed734.appspot.com",
    messagingSenderId: "754759581231"
  };
  firebase.initializeApp(config);

  $("#loginout").click(function() {
    if ($("#loginout").text() === "Log In") {
      window.location.href = "login.html";
    } else {
      firebase.auth().signOut();
      window.location.href = "index.html";
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in

      $("#faves").show();
      $("#calendarnav").show();
      $("#loginout").text("Log Out");
      $("#faves").show();

      // Display User's Calendar
      $("#calendarnav").click(function() {
        var queryURL = "/api/users/calendar/" + user.displayName;
        $.ajax({
          url: queryURL,
          method: "get"
        }).then(response => {
          var events = [];
          $.each(response, function(idx, e) {
            events.push({
              start: e.date,
              end: e.date,
              title: e.movie
            });
          });
          // page is now ready, initialize the calendar...

          $("#calendar").fullCalendar({
            events: events
          });
          $("#movies").hide();
          $("#movie").hide();
          $("#mainpage").hide();
          $("#calendar").show();
        });
      });

      // Display User's Favorite Movies
      $("#faves"|.click(function() {
        var queryURL = "/api/users/fave/" + user.displayName;
        $.ajax({
          url: queryURL,
          method: "get"
        }).then(response => {
          let movies = response;
          let output = "";
          $.each(movies, (index, movie) => {
            output += `
      <div class="col-md-3">
      <div class="well text-center">
        <img src="${movie.photo}">
        <h5>${movie.movie}</h5>
      </div>
      </div>
      `;
          });
          $("#mainpage").hide();
          $("#movie").hide();
          $("#movies").show();
          $("#movies").html(output);
        });
      });

      // User Picked Date for Movie
      $("#save").click(function() {
        var username = user.displayName;
        var moviename = $("#movietitle")
          .text()
          .trim();

        var date = $("#datepicker").val();

        var saveMovie = { user: username, movie: moviename, date: date };

        var finalSave = JSON.stringify(saveMovie);

        $.ajax({
          url: "/api/users/calendar",
          type: "POST",
          data: finalSave,
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            console.log(data);
          },
          error: function(err) {
            console.log("ERROR: ", err);
          }
        });
      });

      // User Favourites Movie
      $("#favorites").click(function() {
        var moviename = $("#movietitle")
          .text()
          .trim();

        var username = user.displayName;

        var path = $("#movieimg")
          .attr("src")
          .trim();

        var faveMovie = { movie: moviename, user: username, photo: path };

        var finalFave = JSON.stringify(faveMovie);

        console.log(finalFave);

        $.ajax({
          url: "/api/users/fave",
          type: "POST",
          data: finalFave,
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            console.log(data);
          },
          error: function(err) {
            console.log("ERROR: ", err);
          }
        });
      });
    } else {
      // No user is signed in.
      $("#faves").hide();
      $("#calendarnav").hide();
      $("#favorites").attr("onclick", "location.href= 'login.html'");
      $("#watchlater").attr("onclick", "location.href= 'login.html'");
      $("#loginout").text("Log In");
    }
  });
});
