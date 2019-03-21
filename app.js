import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRoutes from './routes/peopleRoutes'

const app = express();
const port = 3000;

/*** Middleware ***/
app.use(bodyParser.json());
app.use(peopleRoutes);


/*** Routse ***/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});






// localhost:3000/people.html 
// localhost:3000/api/people
// localhost:3000/api/person/2
// POST localhost:3000/api/person/2
//localhost:3000/api/articles

app.get('/api/articles', (req, res) => {
    models.Article.findAll().then(article => {
        res.status(200).json({
            articles: article
        });
    }).catch(e => console.log(e));
})

//localhost:3000/api/article
app.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
        res.status(200).json({
            article: article
        });
    }).catch(e => console.log(e));
})

// http://localhost:3000/api/person/1/articles
// Get All Articles by Person Record ID
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, {
        include: [{
            model: models.Article
        }]
    }).then(person => {
        res.status(200).json({
            person: person
        });
    });
});



models.sequelize.sync().then(() => {
    console.log("sync complete");
    models.Article.create({
        title: 'test',
        content: 'this is the body',
        PersonId: 1
    });
    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
})