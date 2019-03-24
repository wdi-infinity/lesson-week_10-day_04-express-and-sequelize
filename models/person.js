'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {tableName: "people"});
  Person.associate = function(models) {
    //use the model name wich is start with capital letter
    Person.hasMany(models.Article,{
      onDelete:"CASCADE"
    })
    // associations can be defined here
  };
  return Person;
};