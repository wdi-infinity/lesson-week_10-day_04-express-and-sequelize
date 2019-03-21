import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';

const app = express();
const port = 3000;

/* Middleware */

app.use(bodyParser.json());
app.use(peopleRouter);


/** routes **/

//Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    });
});





app.get('/api/articles', (req, res) => {
models.Article.findAll().then(articles => {
res.status(200).json({articles: articles});
}).catch(e => console.log(e))
})

app.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
    .then(article => {
    res.status(200).json({article: article});

    }).catch(e => console.log(e))
})

//http://localhost:3000/api/person/id/articles

// get all articales by person record ID
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article}]})
    .then(person => {
        res.status(200).json({person: person});

    }).catch(e => console.log(e))
})

models.sequelize.sync()
.then(() => {
    console.log('sync complete');
    models.Article.create({
        title: 'text 2',
        content: 'this is a body of 2',
        PersonId: 1
    })
    app.listen(port, () => console.log(`express-api and listening on port ${port}!`));
})

