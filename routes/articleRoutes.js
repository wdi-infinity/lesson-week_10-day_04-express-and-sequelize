import express from 'express';
import bodyParser from 'body-parser';
import models from '../models';

const router = express.Router();

router.get('/api/articles', (req, res) => {
    models.Article.findAll().then(oneArticles => {
    res.status(200).json({articles: oneArticles});
    }).catch(e => console.log(e))
    })

    //=> http://localhost:3000/api/article/1  => show single article
    router.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
      res.status(200).json({article: article});
    })
  });

  router.post('/api/article', (req, res) => {
    models.Article.create(req.body)
      .then((article) => {
        res.status(201).json({
            article: article,
        });
      })
      .catch(e => console.log(e));
  });
  
  router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id) // findByPk is find by praymary key 
    .then(article => {
        article.destroy().then(() => {
        res.status(200).json({
          result:`article with ID ${req.params.id} Deleted`, success: true
        });
      })
    })
  })

  http://localhost:3000/api/person/533
router.put('/api/article/:id', (req, res) => {
  // Find Person By ID sent to us by User in the URL
  models.Article.findByPk(req.params.id).then(article => {
    // Call the Update function on the Person the database sent us back.
    // Only update the fields I care about.
    article.update({
      title: req.body.title,
      content: req.body.content
    })
    res.status(200).json({ article: article });
      // The database was able to update the user
      // And it sent us back an updated Record with the new information
      // We can now send back this new information to the user
      
   

  }).catch(e => console.log(e));
});

  
    export default router ;