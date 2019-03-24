import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'

const app = express();
const port = 3000;

/*** Middleware ***/

app.use(bodyParser.json());
app.use(peopleRouter);

/*** Routs  ***/

//root path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})

app.post('/api/login'), (req, res) => {
    if (req.body.username && req.body.password) {
        res.status(200).json({ msg: "username & password sent" })

    } else {
        res.status(400).json({ msg: "username & password required" })
    }
}

const people = [
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' }
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
})

// get all articles
app.get('/api/articles', (req, res) => {

    models.Article.findAll()
        .then(articleFromDB => {
            res.status(200).json({
                articles: articleFromDB
            });
        })
        .catch(e => console.log(e));
});

// get article by id
app.get('/api/articles/:id', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Article.findByPk(req.params.id)
            .then(articleFromDB => {

                if (articleFromDB !== null) {
                    res.status(200).json({ article: articleFromDB });
                } else {
                    res.status(404).json({ message: "article NOT found" });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID" });
    }

});

//Get all articles by person
app.get('/api/person/:id/articles', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
            .then(personFromDB => {

                if (personFromDB !== null) {
                    res.status(200).json({ person: personFromDB });
                } else {
                    res.status(404).json({ message: "person NOT found" });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID" });
    }

});

models.sequelize.sync().then(() => {
    console.log('sync complete')
    // models.Article.create({
    //     title: "Test",
    //     content: "bla bla bla",
    //     PersonId: 1
    // });

    app.listen(port, () => console.log(`express-api listening on port ${port}!`))
})

