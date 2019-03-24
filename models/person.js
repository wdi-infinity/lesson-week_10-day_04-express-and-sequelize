'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, { tableName: "people" });
  Person.associate = function (models) {
    // associations can be defined here
    Person.hasMany(models.Article, {
      onDelete: "CASCADE"
    })
  };
  return Person;
};