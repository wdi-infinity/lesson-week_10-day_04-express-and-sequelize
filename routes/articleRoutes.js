import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();


router.get('/api/articles', (req, res) => {
    models.Article.findAll()
    .then(articles => {
        res.status(200).json({ articles: articles });
    })
    .catch(e => console.log(e));
})


router.get('/api/article/:id', (req, res) => {
  models.Article.findByPk(req.params.id).then(article => {
  res.status(200).json({ article: article });
}).catch(e => console.log(e));
})


// http://localhost:3000/api/person/1/articles
// Get All Articles by Person Record ID
router.get('/api/person/:id/articles', (req, res) => {
models.Person.findByPk(req.params.id, {include: [{ model: models.Article }] })
.then(person => {
res.status(200).json({ person: person });
}).catch(e => console.log(e));

});

router.post('/api/articles' , (req, res) => {
    models.Article.create({title: req.body.title , content: req.body.content})
    .then(article => {
        res.status(200).json({article : article})
    })
    .catch( e => console.log(e))
 })
 
 router.put('/api/articles/:id' , (req , res) => {
 
    const id = req.params.id
    models.Article.findByPk(id)
    .then( article => {
        article.update({ title: req.body.title , content: req.body.content })
        res.status(201).json({article: article})
    })
    .catch( e => console.log(e))
 
 })

 router.delete('/api/articles/:id', (req, res) => {
    const id = req.params.id
    models.Article.findByPk(id)
      .then(article => {
        article.destroy().then(() => {
          res.status(200).json({
            result: `Article ${id} Deleted`,
            success: true
          });
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  });




 export default router;