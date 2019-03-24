'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {tableName:'articles'});
  Article.associate = function(models) {
    // associations can be defined here
    Article.belongsTo(models.Person);
  };
  return Article;
};