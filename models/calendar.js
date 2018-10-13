module.exports = function(sequelize, DataTypes) {
  var Calendar = sequelize.define("Calendar", {
    username: DataTypes.STRING,
    movie: DataTypes.STRING,
    date: DataTypes.DATE
  });
  return Calendar;
};
