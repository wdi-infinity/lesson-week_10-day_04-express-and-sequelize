import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';

const router = express.Router();


// localhost: 3000/api/articles get all articles
router.get('/api/articles', (req, res) => {
    // res.status(200).json({message: 'working'});
       models.Article.findAll().then(articles => {
       res.status(200).json({articles: articles});
       }).catch(e => console.log(e));
  })
  
router.get('/api/article/:id', (req, res) => {
    //  res.status(200).json({message: 'working'});
      models.Article.findByPk(req.params.id).then(article => {
      res.status(200).json({article: article});
      }).catch(e => console.log(e));
  })

// create new article
router.post('/api/article/', (req, res) => {
    models.Article.create(req.body)
    .then(articleNewFromDB => {
    res.status(201).json({article: articleNewFromDB});
    })
    .catch(e => console.log(e))
    
  });


  // delete existing article by record id
  router.delete('/api/article/:id', (req, res) => {
        models.Article.findByPk(req.params.id).then(article => {
        article.destroy().then(() => {
        res.status(200).json({
          result: `Record ID ${req.params.id} Deleted`,
        })
      })
      .catch(e => console.log(e)); 
    })
      .catch(e => console.log(e)); 
  });

// update an existing article
router.put('/api/article/:id', (req, res) => {
    // find article by id sent to us by user in the url
    models.Article.findByPk(req.params.id).then(article => {
      // call the update function on the article the database sent us back 
      // only update the fields i care about
      article.update({
          title: req.body.title,
          content: req.body.content
        }).then(article =>{
          // the database was able to update the user
          // and it sent us back an updated record with the new information
          // we can now sent back this new information to the user
          res.status(200).json({article: article});
        }).catch(e => console.log(e)); 
      }).catch(e => console.log(e)); 
  });

  export default router;