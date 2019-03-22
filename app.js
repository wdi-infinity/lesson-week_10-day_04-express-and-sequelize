import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';

const app = express();
const port = 3000;

/****** Middleware  ****/
// run between req and res
app.use(bodyParser.json());
app.use(peopleRouter);
/**** Routes ***/

// Root path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello WDI-Infinity!"
    });
})

// localhost:3000
// localhost:3000/


// http://localhost:3000/api/articles

app.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({ articles: articles });
        })
        .catch(e => console.log(e));

})

// list single Article by record ID
// http://localhost:3000/api/article/1

app.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            res.status(200).json({ article: article });
        }).catch(e => console.log(e));
})

// delete single article by record ID
app.delete('/api/article/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
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


models.sequelize.sync()
    .then(() => {
        console.log('sync complate');
        // models.Article.create({
        //     title: "test",
        //     content: "this is a body",
        //     PersonId: 1
        // })

        app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
    }).catch(e => console.log(e));

