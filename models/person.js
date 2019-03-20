'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, { tableName: "People" });
  Person.associate = function (models) {
    // associations can be defined here
  };
  return Person;
};