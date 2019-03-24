import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();

router.get('/api/person/:id/articles', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
            .then(person => {
                if (person !== null) {

                    res.status(200).json({ person: person });
                }
                else {
                    res.status(404).json({ error: 'Person Not Found' });
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});
router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.destroy().then(() => {
                res.status(201).json({ result: `Record ID ${req.params.id} deleted` });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

});



router.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({
                articles: articles
            });
        })
        .catch(e => console.log(e));

});



router.get('/api/article/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Article.findByPk(req.params.id)
            .then(article => {
                if (article !== null) {
                    res.status(200).json({ article: article });
                }
                else {
                    res.status(404).json({ error: 'Article Not Found' });
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }

});



export default router;