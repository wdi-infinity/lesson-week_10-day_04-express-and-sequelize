import express from 'express';
import models from '../models';

const router = express.Router();


// http://localhost:3000/api/articles
// get all Articles.

router.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({ articles: articles });
        })
        .catch(e => console.log(e));

})

// list single Article by record ID
// http://localhost:3000/api/article/1

router.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            res.status(200).json({ article: article });
        }).catch(e => console.log(e));
})

// Create new Article .
router.post('/api/article', (req, res) => {
    models.Article.create(req.body)
        .then(article => {
            res.status(201).json({ article: article });
        })
        .catch(e => console.log(e));
})

// delete single article by record ID
router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.destroy().then(() => {
                res.status(201).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

})


//  Update an existiong article by id , just updated the title and content
router.put('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.update(req.body)
                .then(article => {
                    res.status(200).json({ article: article });
                })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
})


export default router;