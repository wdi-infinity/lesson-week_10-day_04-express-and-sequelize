import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';

const router = express.Router();




//Delete of Articls
router.delete('/api/articles/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.destroy().then(() => {
                res.status(200).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
})


//Put of Articles
router.put('/api/articles/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
        article.update({
            title: req.body.title,
            content: req.body.content
        }).then(article => {
            res.status(200).json({ article: article });
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
});


// Post of Articles
router.post('/api/articles', (req, res) => {
    models.Article.create(req.body)
        .then(article => {
            res.status(201).json({ article: article });
        })
        .catch(e => console.log(e));
})

// GET of all API Articales
//http://localhost:3000/api/articles
router.get('/api/articles', (req, res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
})

// GET of one  API Articales by ID
//http://localhost:3000/api/articles/1
router.get('/api/articles/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
})

export default router; 