import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import people from './routes/people';

const app = express();
const port = 3000;

// MiddleWare
app.use(bodyParser.json());
app.use(people);

// Routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI'
    });
});



// http://localhost:3000/api/articles
//get all articles
app.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({ articles: articles })
        })
        .catch(e => console.log(e))
})

//get one article by id
app.get('/api/articles/:id', (req, res) => {
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

// http://localhost:3000/api/person/1/articles
//get all articles bu person id
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ person: person })
        })
        .catch(e => console.log(e))
})

models.sequelize.sync().then(() => {
    console.log('sync complete');

    // models.Article.create({
    //     title: 'test2',
    //     content: 'test content2',
    //     PersonId: 1
    // });


    app.listen(port, () => console.log(`express-api app listeing on port ${port}!`))
})
