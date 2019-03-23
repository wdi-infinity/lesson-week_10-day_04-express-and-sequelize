'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    fist_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, { tableName: "people"});
  Person.associate = function(models) {
    // associations can be defined here
    Person.hasMany(models.Article);
    onDelet:"CASCADE"
  };
  return Person;
};