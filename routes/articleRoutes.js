import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';

const router = express.Router();
// eslint-disable-next-line no-console
router.get('/api/articles', (req, res) => {
    //res.status(200).json({ msg: 'working' }); this line to test message show in postman
    models.Article.findAll().then(articles => {
        //respon to artical  to be as json
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
    //http://localhost:3000/api/article/1
})

router.get('/api/article/:id', (req, res) => {
    //  res.status(200).json({message: 'working'});
    models.Article.findByPk(req.params.id).then(article => {
        res.status(200).json({ article: article });
    }).catch(e => console.log(e));
})
//http://localhost:3000/api/person/1/articles
//get all articles by person Record ID
router.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ person: person });
        }).catch(e => console.log(e));
});

models.sequelize.sync().then(() => {
    console.log('sync complete');
    //if just server is run create new article
    // models.Article.create({
    // title: 'test 2',
    // content: 'this is a body',
    //  PersonId: 1
    //  });
    // create new person
    router.post('/api/article/', (req, res) => {
        models.Article.create(req.body)
            .then(personNewFromDB => {
                res.status(201).json({ person: personNewFromDB });
            })
            .catch(e => console.log(e))

    });




    export default router;