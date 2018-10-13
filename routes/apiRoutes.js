var db = require("../models");

module.exports = function(app) {
  // Save Favorite Movies to database
  app.post("/api/users/fave", function(req, res) {
    db.Favourites.create({
      username: req.body.user,
      movie: req.body.movie,
      photo: req.body.photo
    }).then(function(data) {
      res.json(data);
    });
  });

  // Save Watch Later Movies to database

  app.post("/api/users/calendar", function(req, res) {
    db.Calendar.create({
      username: req.body.user,
      movie: req.body.movie,
      date: req.body.date
    }).then(function(data) {
      res.json(data);
    });
  });

  // Get Single User's Fave Movies

  app.get("/api/users/fave/:user", function(req, res) {
    db.Favourites.findAll({
      where: {
        username: req.params.user
      }
    }).then(function(result) {
      res.json(result);
      console.log(result);
    });
  });

  // Get Single User's Watch Later Movies and put onto calendar

  app.get("/api/users/calendar/:user", function(req, res) {
    db.Calendar.findAll({
      where: {
        username: req.params.user
      }
    }).then(function(result) {
      res.json(result);
      console.log(result);
    });
  });
};
