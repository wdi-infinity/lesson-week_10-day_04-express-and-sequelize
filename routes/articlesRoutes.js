import express from 'express';
import models from '../models';

const router = express.Router();


// Get All Articles
router.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({ articles: articles });
        })
        .catch(e => console.log(e));
});

// Get Article by record id
router.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
        res.status(200).json({ article: article });
    })
        .catch(e => console.log(e));
});

// create new article
router.post("/api/article", (req, res) => {
    const article = req.body
    models.Article.create(article)
        .then(articledb => {
            res.status(200).json({ article: articledb })
        })
        .catch(e => console.log(e))
})
// delete article by id
router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.destroy().then(res.status(200).json("deleted successfully"))
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
})

// update article 
router.put("/api/article/:id", (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
        article.update(req.body).then(res.status(200).json({ article: article }))
            .catch(e => console.log(e))
    })
        .catch(e => console.log(e))
})

export default router;