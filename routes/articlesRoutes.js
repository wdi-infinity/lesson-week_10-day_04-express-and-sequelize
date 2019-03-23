import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();

//Get all articles
router.get('/api/articles', (req, res) => {
    models.Article.findAll().then(articles => {
    res.status(200).json({articles: articles});
    }).catch(e => console.log(e))
    })

    //Get article by Record ID
    router.get('/api/article/:id', (req, res) => {
        models.Article.findByPk(req.params.id)
        .then(article => {
        res.status(200).json({article: article});
    
        }).catch(e => console.log(e))
    })
    
    //http://localhost:3000/api/person/id/articles
    
    // get all articales by person record ID
    router.get('/api/person/:id/articles', (req, res) => {
        models.Person.findByPk(req.params.id, { include: [{ model: models.Article}]})
        .then(person => {
            res.status(200).json({person: person});
    
        }).catch(e => console.log(e))
    })

    // Create new article
router.post('/api/article', (req, res) =>{
    models.Article.create(req.body)
    .then(articleNewFromDB => {
        res.status(201).json({
            article: articleNewFromDB
        });
    })
    .catch(e => console.log(e))
    
});

// Update an existing Article
// router.put('/api/article/:id', (req, res) => {

//    models.Article.findByPk(req.params.id)
//    .then(article => {
//        article.update({
//            title: req.body.title,
//            content: req.body.content
//     }).then(article => {

//         res.status(200).json({person: article});
//     }).catch(e => console.log(e))
//     })
//        .catch(e => console.log(e))
//    });

//Delete an existing Article
// router.delete('/api/article/:id', (req, res) => {
//     models.Article.findByPk(req.params.id)
//     .then(article => {
//        article.destroy()
//          .then(() => {
//          res.status(200).json({
//          result: `Record ID ${req.params.id} Deleted`,
//          success: true
//         })
//       })
//       .catch(e => console.log(e))
//      })
//      .catch(e => console.log(e))
// })

export default router;