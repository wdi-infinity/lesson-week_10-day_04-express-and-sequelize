import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();

router.use(bodyParser.json());

//get all articles
router.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({ articles: articles })
        })
        .catch(e => console.log(e))
})

//get one article by id
router.get('/api/articles/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Article.findByPk(req.params.id)
            .then(articles => {
                if (articles !== null) {
                    res.status(200).json({ articles: articles });
                }
                else {
                    res.status(404).json({
                        error: 'Article not found'
                    });
                }
            })
            .catch(e => console.log(e))
    }
    else {
        res.status(406).json({ error: 'Invalid ID' })
    }
})

//get all articles by person id
router.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ person: person })
        })
        .catch(e => console.log(e))
})

//create new article
router.post('/api/article', (req, res) => {
    models.Article.create(req.body)
        .then(newArticleFromDB => {
            res.status(201).json({ article: newArticleFromDB });
        })
        .catch(e => console.log(e));
})

//Update a article by id
router.put('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.update({
                title: req.body.title,
                content: req.body.content
            })
                .then(article => {
                    res.status(200).json({ article: article });
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
});

//Delete an article
router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.destroy()
                .then(() => {
                    res.status(200).json({
                        result: `Record ID ${req.params.id} Deleted`,
                        success: true
                    })
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
})


export default router;