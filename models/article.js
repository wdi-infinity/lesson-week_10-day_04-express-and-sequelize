'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, { tableName: "articles" });
  Article.associate = function (models) {
    Article.belongsTo(models.Person);
  };
  return Article;
};