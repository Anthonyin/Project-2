module.exports = function(sequelize, DataTypes) {
  var Favourites = sequelize.define("Favourites", {
    username: DataTypes.STRING,
    movie: DataTypes.STRING,
    photo: DataTypes.TEXT
  });
  return Favourites;
};
