'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, { tableName: "articales" });
  Article.associate = function (models) {
    // associations can be defined here
  };
  return Article;
};