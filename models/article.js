'use strict';
import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();
app.use(bodyParser.json());

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
//add article
router.post('/api/article', (req, res) => {
  models.article.create(req.body)
    .then(articleNewFromDB => {
      res.status(201).json({ article: articleNewFromDB });
    })
    .catch(e => console.log(e));




});
//update article 
router.put('/api/article/:id', (req, res) => {

  models.article.findByPk(req.params.id).then(article => {

    article.update({
      title: req.body.title,
      content: req.body.content
    }).then(article => {

      res.status(200).json({ article: article });
    }).catch(e => console.log(e));

  }).catch(e => console.log(e));
});

// DELETE article
router.delete('/api/article/:id', (req, res) => {
  models.article.findByPk(req.params.id)
    .then(article => {
      article.destroy().then(() => {
        res.status(201).json({
          result: `article  ${req.params.id} Deleted`,
          success: true
        });
      })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));

});